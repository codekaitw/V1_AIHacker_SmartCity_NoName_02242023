# Project Name
- NoName

## Description
- This project is a web application that utilizes React for the frontend and Python Flask for the backend.
- For the best practice for React and Flask, please go to the official document. (I just want to challenge myself, because I'm not familiar with both framework.) 
- For the AI code. It is not in this file, the source was referenced from this kaggle source which on the ppt reference. (Visali. (2020, June 23). Non/Emergency using EfficientNet. Kaggle. https://www.kaggle.com/code/visali/non-emergency-using-efficientnet/notebook).

## Prerequisites
- Node.js and npm installed on your system
- Python installed on your system

### cd project-directory

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies and set up virtual environment:
```bash
cd backend
```
# Create and activate a virtual environment (optional but recommended)
```bash
python3 -m venv venv
source venv/bin/activate
```
# Install dependencies
```bash
pip install -r requirements.txt
```

## USAGE
1. Start the backend server:
```bash
cd backend
python app.py
```
### The backend server runs on http://localhost:5000 by default.

2. In a separate terminal, start the frontend development server:
```bash
cd frontend
npm start
```
### Open your browser and navigate to http://localhost:3000 to view the application.

# Additional Notes
* You may need to configure CORS settings if the frontend and backend are hosted on different domains in a production environment.
* If you can not install the python dependency, try to use pip install (dependency in the requirements.txt).
* If you can not run the python, if need to check the version of python, you can try python3 or python.

## Directory Structure
* frontend/: Contains the React frontend code.
* backend/: Contains the Python Flask backend code.
* backend/output.txt the AI prediction result.
* README.md: Documentation file.
* requirements.txt: List of Python dependencies for the backend.

