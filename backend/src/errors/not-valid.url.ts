import { HttpException, HttpStatus } from "@nestjs/common";

export class NotValidCloudProvider extends HttpException {
    constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(
            {
                success: false,
                message,
                errorCode: statusCode,
                timestamp: new Date().toISOString(),
            },
            statusCode,
        );
    }
}