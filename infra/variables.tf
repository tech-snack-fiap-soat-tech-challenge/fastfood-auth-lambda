variable "aws_region" {
  description = "Região"
  type        = string
  default     = "us-east-1"
}

variable "lab_role_arn" {
  description = "ARN da role LabRole utilizada na Lambda"
  type        = string
  default     = "arn:aws:iam::314000960063:role/LabRole"
}

variable "lambda_function_name" {
  description = "Função Lambda"
  type        = string
  default     = "fastfood-auth-lambda"
}
