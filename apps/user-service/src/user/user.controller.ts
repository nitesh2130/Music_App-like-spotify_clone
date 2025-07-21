import { UserService } from './user.service';
import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  UserService: any;
  constructor(private readonly PizzaService: UserService) {} //corectly inject pizzaServiews

  @Post()
  crateUser() {
    return this.UserService.createUser();
  }
}
