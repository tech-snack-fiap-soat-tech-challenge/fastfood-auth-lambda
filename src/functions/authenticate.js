import { CognitoIdentityProvider, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { AuthenticationService } from '../services/authentication.service.js';
import { MissingCredentialsException } from '../exceptions/missing-credentials.exception.js';


export const handler = async (event) => {
    const { userName, password } = event;

    try {
       //Teste Deploy

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
}
