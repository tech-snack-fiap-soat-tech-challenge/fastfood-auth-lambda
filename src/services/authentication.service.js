import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

export class AuthenticationService {
    constructor(cognitoClient, clientId) {
        this.cognitoClient = cognitoClient;
        this.clientId = clientId;
    }

    async authenticate(username, password) {
        const command = new InitiateAuthCommand({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.clientId,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        });

        const authResponse = await this.cognitoClient.send(command);
        return authResponse?.AuthenticationResult?.AccessToken;
    }
}