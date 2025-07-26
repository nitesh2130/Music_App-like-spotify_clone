import { User } from './user.model';
import { CreateUserDto } from './DTO/createUsere.dto';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private userModel;
    private configService;
    constructor(userModel: Model<User>, configService: ConfigService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    loginUser(loginUserDto: any): Promise<{
        messege: string;
    }>;
}
