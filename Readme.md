# Simple LeetCode Clone  

This repository contains the code for a **simple LeetCode clone** where users can practice solving DSA (Data Structures and Algorithms) problems.  

## Tech Stack  

### Frontend  
- HTML, CSS, JavaScript  
- React  
- Tailwind CSS  
- Material UI (MUI)  

### Backend  
- Node.js  
- Express.js  
- MongoDB (database)  
- Redis (caching and session management)  

### Code Execution  
- For running code, instead of compiling directly on the backend, we use [Judge0] – an open-source API for online code execution.  
- Judge0 supports multiple languages like **C++, Java, Python, JavaScript**, etc.  
- This ensures safety and scalability since code is executed in isolated environments.  

### Notes  
- We don’t execute raw code files from the frontend directly on our server for security reasons.  
- For local compilation, tools like **MinGW (for C++)** or **JDK (for Java)** may be used, but in production, **Judge0 API** is preferred.  

### Apis
- User authentication - two types of user [User | Admin]
- In user we have register, login, logout, me, email-verify, reset-password, forgot-password, Google-Signup
- To create problems
- Submit problem
- Questions (dsa problems)
- Editorial
- we can integrate ai also

### Schema
- User - firstName, lastName, email, role, password, solvedProblems, images
- Problems - title, testCases, hiddenTestCases, initialCode with language, real solution, acceptedTestCases, videoSolution
- Submit - userSolution, problemId, solution | accept | reject