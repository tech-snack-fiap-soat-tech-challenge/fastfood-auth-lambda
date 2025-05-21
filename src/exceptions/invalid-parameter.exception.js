export class InvalidParameterException extends Error {
  constructor(message = 'Invalid username and/or password') {
    super(message);
    this.name = 'InvalidParameterException';
  }
}
