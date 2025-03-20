resource "aws_cognito_user_pool" "user_pool" {
  name                     = "fastfood-auth-user-pool"
  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
  }

  schema {
    name                = "username"
    attribute_data_type = "String"
    required            = true
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name                                 = "fastfood-auth-client"
  user_pool_id                         = aws_cognito_user_pool.user_pool.id
  generate_secret                      = false
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["openid", "email"]
  explicit_auth_flows                  = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]
  callback_urls                        = ["https://fiap-fastfood.com.br/callback"]
  logout_urls                          = ["https://fiap-fastfood.com.br/logout"]
  supported_identity_providers         = ["COGNITO"]
  prevent_user_existence_errors        = "ENABLED"
}

resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain       = "fiap-fastfood-auth"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
