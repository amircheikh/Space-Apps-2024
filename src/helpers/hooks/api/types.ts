export class HTTPError extends Error {
  public statusCode: number;
  public responseText: string;

  constructor(statusCode: number, responseText: string) {
    super(`HTTP Error: ${statusCode}`);
    this.statusCode = statusCode;
    this.responseText = responseText;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }
}