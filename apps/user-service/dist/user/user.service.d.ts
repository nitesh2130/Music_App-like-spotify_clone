import { User } from './user.model';
import { CreateUserDto } from './DTO/createUsere.dto';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    registerUser(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    loginUser(): {
        messege: string;
    };
}
