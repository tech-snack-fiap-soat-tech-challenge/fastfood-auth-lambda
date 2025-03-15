import { CognitoIdentityProvider, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { AuthenticationService } from '../services/authentication.service.js';


export const handler = async (event) => {
    console.log('Event:', event);
    const cognitoClient = new CognitoIdentityProvider();
    const authService = new AuthenticationService(cognitoClient, process.env.COGNITO_CLIENT_ID);

    const { userName, passowrd } = event;

    try {
        if (!userName || !passowrd) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Username and password are required' }),
            };
        }

        const result = await authService.authenticate(userName, passowrd);

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
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
}
