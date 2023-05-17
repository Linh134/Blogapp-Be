class apiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static internalSever(msg) {
    return new apiError(500, msg);
  }

  static badRequest(msg) {
    return new apiError(400, msg);
  }

  static unAuthorized(msg) {
    return new apiError(401, msg);
  }
}

module.exports = apiError;
