class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super();
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.status = status;
    this.message = message;
  }
}

export const createError = (status: number, message: string) => {
  const error = new CustomError(status, message);
  error.status = status;
  error.message = message;

  return error;
};
