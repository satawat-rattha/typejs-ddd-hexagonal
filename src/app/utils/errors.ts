export class AppError {
    constructor(public code: number, public message: string) { }
}

export class InternalError extends AppError {
    constructor(message: string) {
        super(500, message)
    }
}

export class BadRequest extends AppError {
    constructor(message: string) {
        super(400, message)
    }
}