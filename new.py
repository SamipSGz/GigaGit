from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from crewai import Crew, Agent, Task, LLM, Process
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM
token = os.getenv("GEMINI_API_KEY")
if not token:
    raise EnvironmentError("GEMINI_API_KEY not found in environment variables.")

llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    api_key=token,
)

class CodeSubmission(BaseModel):
    code: str


@app.post("/grade-code")
async def grade_code(data: CodeSubmission):
    code = data.code
    
    scoring_agent = Agent(
    role="Code Scorer",
    goal=f"Evaluate the submitted {code} based on clarity, efficiency, readability, and adherence to best practices.",
    backstory =(
        "You are a highly experienced software reviewer with decades of expertise in analyzing code. "
        "Your backstory involves working on critical systems where clarity, efficiency, and adherence to "
        "best practices were essential to success. Use your vast knowledge to evaluate the submitted code."
    ),
    llm=llm,)

    scoring_task = Task(
        description=f"Analyze the submitted {code} and provide a score out of 10. Highlight its good practices and areas for improvement.",
        agent=scoring_agent,
        expected_output=(
            """
            Output format:
            Score: <score>/10
            Good Points:
            - <bullet points>
            Issues:
            - <bullet points>
            Suggestions:
            - <bullet points>
            """
        ),
        allow_delegation = True,  
    )

        # Agent to improve the code
    improvement_agent = Agent(
        role="Code Improver",
        goal=f"Provide an optimized and improved version of the submitted {code}, ensuring better performance, readability, and maintainability.",
        backstory = (
            "You are a renowned software engineer with a reputation for transforming suboptimal code into "
            "masterpieces. Your backstory includes leading high-profile projects that demanded excellence in "
            "code quality, performance, and maintainability. Use this expertise to refactor and optimize the code."
        ),
        llm=llm,
    )

    improvement_task = Task(
        description=f"Refactor the submitted {code} to address issues and implement improvements while preserving its functionality.",
        agent=improvement_agent,
        expected_output="""
        Information of submitted code 
            <score>/10
            Good Points:
            - <bullet points>
            Issues:
            - <bullet points>
            Suggestions:
            - <bullet points>
            
            
        Improved Code:
        ```<language>
        <code>
        
        Changes made on Improved code:
        <changes>
        ```""",
    )

    # Crew orchestrates the agents
    crew = Crew(
        agents=[scoring_agent, improvement_agent],
        tasks=[scoring_task, improvement_task],
        verbose=True,
        embedder={
                        "provider": "huggingface",
                        "config": {"model": "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"},
                    },
        process=Process.sequential
    
    )

    # Execute the tasks
    results = crew.kickoff()

    return results.raw
