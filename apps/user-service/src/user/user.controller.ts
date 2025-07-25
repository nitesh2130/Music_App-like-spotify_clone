import { CreateUserDto } from 'src/user/DTO/createUsere.dto';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './DTO/loginUser.dto';
import { register } from 'module';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {} //corectly inject pizzaServiews

  @Post('register')
  async crateUser(@Body() createUserDto: CreateUserDto) {
    console.log('this is controller');
    return this.UserService.registerUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.UserService.loginUser();
  }
}
