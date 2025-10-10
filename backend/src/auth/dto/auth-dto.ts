// register-response.dto.ts
export class RegisterResponseDto {
    name: string;
    email: string;
    id : string;
    success: boolean;
    message: string;
  }
  export class LoginUserDto {
    email: string;
    password: string;
  }
  