/**
 * Handles various error types and returns appropriate HTTP responses
 * @param {Error} error - The error object to be handled
 * @returns {Object} - A formatted HTTP response object
 */
export const handleError = (error) => {
  const errorResponses = {
    MissingCredentialsException: {
      statusCode: 400,
      body: {
        title: 'Invalid Input',
        message: error.message
      }
    },
    InvalidParameterException: {
      statusCode: 400,
      body: {
        title: 'Invalid Input',
        message: error.message
      }
    },
    NotAuthorizedException: {
      statusCode: 401,
      body: {
        title: 'Authentication Failed',
        message: error.message
      }
    },
    default: {
      statusCode: 500,
      body: {
        title: 'Internal Server Error',
        message: error.message
      }
    }
  };

  const response = errorResponses[error.name] || errorResponses.default;
  
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body)
  };
};
