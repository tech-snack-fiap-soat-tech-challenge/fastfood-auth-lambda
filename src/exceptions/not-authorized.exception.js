export class NotAuthorizedException extends Error {
  constructor(message = 'Wrong credentials or user not found') {
    super(message);
    this.name = 'NotAuthorizedException';
  }
}
