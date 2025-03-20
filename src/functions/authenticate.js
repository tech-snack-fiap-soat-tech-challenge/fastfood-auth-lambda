import { CognitoIdentityProvider, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { AuthenticationService } from '../services/authentication.service.js';
import { MissingCredentialsException } from '../exceptions/missing-credentials.exception.js';


export const handler = async (event) => {
    console.log('Event:', event);
    console.log(process.env.COGNITO_CLIENT_ID);
    const { userName, password } = event;

    try {
        if (!userName || !password) {
            throw new MissingCredentialsException();
        }

        const cognitoClient = new CognitoIdentityProvider({region:process.env.COGNITO_REGION});
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
        // Logando o erro para análise
        console.error('Authentication Error:', error);

        if (error.name === 'MissingCredentialsException') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    title: 'Invalid Input',
                    message: error.message
                }),
            };
        }

        // Tratamento específico de erro do Cognito
        if (error.name === 'NotAuthorizedException') {
            return {
                statusCode: 401,
                body: JSON.stringify({
                    title: 'Authentication Failed',
                    message: 'Invalid credentials or user not found'
                }),
            };
        }

        // Verifica se o erro é do tipo "InvalidParameterException" ou outro erro específico de parâmetros
        if (error.name === 'InvalidParameterException') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    title: 'Invalid Input',
                    message: 'Please provide valid username and password'
                }),
            };
        }

        // Caso o erro seja desconhecido, retornamos erro genérico do servidor
        return {
            statusCode: 500,
            body: JSON.stringify({
                title: 'Internal Server Error',
                message: error.message,
                // Em produção, pode-se ocultar detalhes técnicos do erro
                // stack: error.stack, // Apenas para ambientes de desenvolvimento
            }),
        };
    }
}
