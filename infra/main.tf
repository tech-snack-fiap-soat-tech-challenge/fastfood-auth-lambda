# provider "aws" {
#   region = "us-east-1"
# }

# resource "aws_lambda_function" "test_lambda" {
#   function_name = "FastfoodAuthenticateLambda"
  
#   runtime = "nodejs22.x"  # Defina o runtime conforme sua necessidade
#   handler = "authenticate.handler"  # Nome do arquivo e do método exportado
  
#   # Caminho para o arquivo zip da função
#   filename = "authenticate.zip" 

#   source_code_hash = filebase64sha256("../authenticate.zip")

#   role = aws_iam_role.lambda_execution_role.arn  # IAM Role que a função Lambda vai usar
# }

# resource "aws_iam_role" "lambda_execution_role" {
#   name = "lambda_execution_role"  
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action    = "sts:AssumeRole"
#         Effect    = "Allow"
#         Principal = {
#           Service = "lambda.amazonaws.com"
#         }
#       }
#     ]
#   })
# }

# resource "aws_iam_policy_attachment" "lambda_policy" {
#   name       = "lambda-policy-attachment"
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
#   roles      = [aws_iam_role.lambda_execution_role.name]
# }