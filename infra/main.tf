module "cognito" {
  source = "./modules/cognito"
}

module "lambda" {
  source             = "./modules/lambda"
  lambda_function_name = var.lambda_function_name
  lab_role_arn       = var.lab_role_arn
  cognito_client_id  = module.cognito.user_pool_client_id
}