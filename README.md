# 🍔 FastFood - Auth Lambda

Welcome to the Auth Lambda function for the FastFood App!

Built with **Node.js**, **AWS Lambda**, **AWS API Gateway**, **AWS Cognito** — this function integrates with the 
FastFood ordering system providing authenticated access as needed.


## 📋 Overview

This Lambda function is responsible for:
- Validating user's credentials through **WS Cognito**
- Returns the JWT token to be used in the request headers through **AWS API Gateway**

## 🛠️ Project Structure

```
fastfood-auth-lambda/ 
├── src/ 
│   ├── exceptions/ 
│   │   └── invalid-parameter.exception.js  
│   │   └── missing-credentials.exception.js  
│   │   └── not-authorized.exception.js  
│   ├── functions/ 
│   │   └── authenticate.js 
│   ├── helpers/ 
│   │   └── error-handler.helper.js 
│   └── services/ 
│       └── authentication.service.js
├── .env.example 
├── package.json 
└── README.md
````

## ⚙️ Setup and Configuration

### Clone the repository:

```bash
   git clone https://github.com/tech-snack-fiap-soat-tech-challenge/fastfood-auth-lambda.git
````

### Install dependencies:

```bash
npm install
```

### Configure environment variables:
  - `COGNITO_REGION`: AWS region where the Cognito user pool is located
  - `COGNITO_CLIENT_ID`: The client ID for the Cognito user pool

## 📝 Usage
The Lambda function accepts HTTP POST requests with a JSON body containing:

```json
{
  "userName": "user@example.com",
  "password": "userPassword"
}
```

Successful authentication will return a 200 response with a JWT token:
```json
{
  "accessToken": "eyJraWQiOiJ..."
}
```


---

Made with ❤️ by TechSnack — The FastFood App
