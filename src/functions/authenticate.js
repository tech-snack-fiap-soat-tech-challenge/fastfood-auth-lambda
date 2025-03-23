import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { AuthenticationService } from '../services/authentication.service.js';
import { MissingCredentialsException } from '../exceptions/missing-credentials.exception.js';

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
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid credentials' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ accessToken: result }),
    };

  } catch (error) {
    if (error.name === 'MissingCredentialsException') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          title: 'Invalid Input',
          message: error.message
        }),
      };
    }

    if (error.name === 'NotAuthorizedException') {
      return {
        statusCode: 401,
        body: JSON.stringify({
          title: 'Authentication Failed',
          message: 'Invalid credentials or user not found'
        }),
      };
    }

    if (error.name === 'InvalidParameterException') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          title: 'Invalid Input',
          message: 'Please provide valid username and password'
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        title: 'Internal Server Error',
        message: error.message,
      }),
    };
  }
};
