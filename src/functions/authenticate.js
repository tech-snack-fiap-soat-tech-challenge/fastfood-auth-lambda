import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { AuthenticationService } from '../services/authentication.service.js';
import { MissingCredentialsException } from '../exceptions/missing-credentials.exception.js';
import { NotAuthorizedException } from '../exceptions/not-authorized.exception.js';
import { handleError } from '../helpers/error-handler.helper.js';

/**
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
export const handler = async (event) => {
  const { userName, password } = JSON.parse(event.body);

  try {
    if (!userName || !password) {
      throw new MissingCredentialsException();
    }

    const cognitoClient = new CognitoIdentityProvider({ region: process.env.COGNITO_REGION });
    const authService = new AuthenticationService(cognitoClient, process.env.COGNITO_CLIENT_ID);
    const result = await authService.authenticate(userName, password);

    if (!result) {
      throw new NotAuthorizedException();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ accessToken: result }),
    };

  } catch (error) {
    return handleError(error);
  }
};
