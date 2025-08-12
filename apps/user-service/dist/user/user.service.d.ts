import { User } from './user.model';
import { CreateUserDto } from './DTO/createUsere.dto';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private configService;
    private jwtService;
    findone(username: string): void;
    constructor(userModel: Model<User>, configService: ConfigService, jwtService: JwtService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    loginUser(loginUserDto: any): Promise<{
        access_token: string;
        user: string;
        messege: string;
    }>;
}
