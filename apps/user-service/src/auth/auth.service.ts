import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  userModel: any;
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // **** This is login logic those i will be handle in the login servise.

  // async validateUser(email: string, id) {
  //   // const user = await this.userModel.findOne({email: email});
  //   // if (user && user.password === password) {
  //   //   const { password, ...rest } = user;  //this is the return the user (variable is rest) and without password
  //   //   return rest;
  //   // }  //  * now don't neet this because i will be do check this in the login service

  //   const user = { email, id };

  //   return user;

  //   // return null;
  // }

  async jwtlogin(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
