class AppError {
  constructor(readonly message: string, readonly statusCode: number) {}
}

export default AppError;
