from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from crewai import Crew, Agent, Task, LLM
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from crewai_tools import ScrapeWebsiteTool
from litellm import completion
from fastapi.middleware.cors import CORSMiddleware
import json




load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:3000","http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    api_key=os.getenv("GEMINI_API_KEY"),
    # verbose = True,
    # temperature = 0.6
)



class ScoreCode(BaseModel):
    code: str


@app.post("/score")
async def scoreCode(request: ScoreCode):
    try:
        tool = ScrapeWebsiteTool(website_url=request.url)
    
        web_scrapping = Agent(
            role = "Price extractor from Daraz",
            goal = f"Extract the details and price of the {request.title} from the site {request.url}",
            verboe = True,
            memory = True,
            backstory = (
                f"""
                You are expert web scraper, your job is to scrape all the data for efficient
                price tracking in the e-commerce sector. With the rapid expansion of online marketplaces
                like Daraz, businesses and consumers alike found it challenging to monitor dynamic pricing.
                Find the details for {request.title}
                """),
            tools = [tool],
            llm = llm, 
            allow_delegation = False,     
        )       
        scrapping_task = Task(
            description = (
                    """Provide the output in the string format: Create a detailed and structured display for any product,
                    showcasing its key features, specifications, and unique selling points in an organized format.
                    Include sections like Performance, Design, Key Features, Compatibility, Connectivity, and Price. Ensure the details are clear
                    , concise, and visually appealing, using bullet points or subheadings where necessary. Tailor the tone to emphasize the product's
                    strengths and practicality, while providing a brief note for additional details or disclaimers.  The output should be in the format:

                    For Technology Products:
Technical Specifications:
    • Processor/Performance details
    • Memory/Storage
    • Display specifications
    • Battery life
    • Operating system

Physical Attributes:
    • Dimensions & weight
    • Build materials
    • Color options
    • Port configuration

Core Features:
    • Key functionalities
    • Special technologies
    • Performance capabilities
    • Security features

Connectivity & Compatibility:
    • Wireless capabilities
    • Device compatibility
    • Supported formats/standards
    • Integration options

Package Contents:
    • What's in the box
    • Included accessories
    • Optional add-ons

Support & Warranty:
    • Warranty duration
    • Technical support
    • Software updates
    • Service options

For Clothing:
Material & Care:
    • Fabric composition
    • Care instructions
    • Washing guidelines
    • Material properties

Fit & Sizing:
    • Size chart
    • Fit type (Regular/Slim/Loose)
    • Body measurements
    • Model's size reference

Design Details:
    • Style features
    • Color/pattern description
    • Closure type
    • Special embellishments

Comfort & Functionality:
    • Comfort features
    • Season suitability
    • Activity recommendations
    • Special technologies (if any)

Quality Assurance:
    • Manufacturing standards
    • Quality certifications
    • Color fastness
    • Durability features

For Jewelry:
Material Specifications:
    • Metal type/purity
    • Gemstone details
    • Certification information
    • Weight specifications

Design Elements:
    • Style description
    • Setting type
    • Design inspiration
    • Craftsmanship details

Dimensions:
    • Size measurements
    • Chain length (if applicable)
    • Width/thickness
    • Adjustability options

Care & Maintenance:
    • Cleaning instructions
    • Storage recommendations
    • Maintenance tips
    • Warranty information

Authentication:
    • Hallmark details
    • Authenticity certificate
    • Quality assurance
    • Origin information

For Furniture:
Construction Details:
    • Materials used
    • Build quality
    • Assembly requirements
    • Weight capacity

Dimensions:
    • Product dimensions
    • Recommended room size
    • Package dimensions
    • Weight information

Design & Aesthetics:
    • Style description
    • Color options
    • Finish details
    • Design features

Functionality:
    • Usage scenarios
    • Storage capacity
    • Special features
    • Ergonomic benefits

Maintenance:
    • Care instructions
    • Cleaning guidelines
    • Durability factors
    • Warranty coverage

For Home Appliances:
Performance Specifications:
    • Power consumption
    • Capacity
    • Energy efficiency rating
    • Operating modes

Technical Features:
    • Control system
    • Program options
    • Smart capabilities
    • Special functions

Installation Requirements:
    • Space requirements
    • Electrical specifications
    • Plumbing needs (if applicable)
    • Ventilation requirements

Convenience Features:
    • Ease of use
    • Safety features
    • Noise levels
    • Additional functions

Support & Maintenance:
    • Warranty terms
    • Service network
    • Spare parts availability
    • Maintenance schedule
                    """
            ),
                
            tools = [tool],
            expected_output= (f"""Details of {request.title} and its price
                                in the format,
                                Details of {request.title}:
                                
                                
                                Price:
                                price of the product
                                """),
            agent = web_scrapping,
            # output_file = 'output.txt'
        )
        crew = Crew(
                agents = [web_scrapping],
                tasks = [scrapping_task],
                # memory = True,
                # cache = True,
                embedder={
                    "provider": "huggingface",
                    "config": {"model": "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"},
                },
                verbose = True
            )
        result = crew.kickoff()


        return result.raw
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


    
