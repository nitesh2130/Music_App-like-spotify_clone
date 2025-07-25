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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // ✅ This is the correct way
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    console.log('this is serice');
    const { name, email, phoneNumber, password } = createUserDto;
    if (!name || !email || !phoneNumber || !password) {
      throw new NotFoundException(' User data not found');
    }

    console.log('this is name inner the dto');

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

  loginUser() {
    return { messege: 'user can be login now ' };
  }
}
