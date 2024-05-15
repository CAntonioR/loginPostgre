import { IsAlphanumeric, IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,50}$/;
const emailRegex = /\S+@\S+\.\S+/;
export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric('es-ES', {
        message: 'Username does not allow other than alpha numeric chars.',
    })
    username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 50 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
    })
    password: string;
}
