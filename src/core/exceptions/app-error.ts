export class AppError extends Error {
  code: string;

  messageCode?: string;

  messageData?: {[field: string]: unknown};

  constructor(code: string, messageCode?: string, messageData?: {[field: string]: unknown}) {
    super(code);
    this.code = code;
    this.messageCode = messageCode;
    this.messageData = messageData;
    this.name = 'AppError';
  }
}
