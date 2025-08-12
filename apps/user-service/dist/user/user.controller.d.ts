import { CreateUserDto } from 'src/user/DTO/createUsere.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './DTO/loginUser.dto';
export declare class UserController {
    private readonly UserService;
    constructor(UserService: UserService);
    crateUser(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
        user: string;
        messege: string;
    }>;
}
