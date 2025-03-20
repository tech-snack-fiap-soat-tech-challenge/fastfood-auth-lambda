variable "lambda_function_name" {
  description = "Nome da função Lambda"
  type        = string
}

variable "lab_role_arn" {
  description = "Role utilizada na lambda"
  type        = string
}

variable "cognito_client_id" {
  description = "Client ID do Cognito"
  type        = string
}