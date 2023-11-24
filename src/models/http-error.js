// this class is used for handling http error
class HttpError extends Error {
  code;

  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

export default HttpError;
