import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { CreateUserDto } from './DTO/createUsere.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // ✅ This is the correct way
    private configService: ConfigService,
  ) {}

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    console.log('this is serice');
    const { name, email, phoneNumber, password } = createUserDto;
    if (!name || !email || !phoneNumber || !password) {
      throw new NotFoundException(' User data not found');
    }

    const token = this.configService.get<string>('ACCESS_TOKEN_SECRET'); // this is access .env file data
    console.log(`this is env data  ${token}`);

    const emailExist = await this.userModel.findOne({ email: email });
    if (emailExist) {
      throw new BadGatewayException('email is allready have is the database ');
    }

    const phoneNumberExist = await this.userModel.findOne({
      phoneNumber: phoneNumber,
    });
    console.log(`this  is the response for the ${phoneNumberExist}`);
    if (phoneNumberExist) {
      throw new BadGatewayException(
        'phoneNumber is allready have is the database ',
      );
    }

    console.log(password, 'this is simple password');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword, 'this is hashed password');

    const newUser = await this.userModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    } as User);
    console.log(`this user from user service ${newUser}`);
    return { message: 'User created successfully' };
  }

  async loginUser(loginUserDto) {
    const { email, password } = loginUserDto;
    if (!email || !password) {
      throw new NotFoundException('email and password are not found');
    }

    console.log(
      `email is this--  ${email}   password is this ---    ${password}    ---`,
    );

    const emailUser = await this.userModel.findOne({ email: email });

    if (!emailUser) {
      throw new BadGatewayException('Email are not availble in our database');
    }

    const passwordMatch = await bcrypt.compare(password, emailUser.password);
    if (!passwordMatch) {
      throw new BadGatewayException('Sorry, password are not match');
    }

    const ACCESS_TOKEN_EXPIRE = this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRE', // access the data of .env file
    );
    const ACCESS_TOKEN_SECRET = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );

    return { messege: 'user can be login now ' };
  }
}
