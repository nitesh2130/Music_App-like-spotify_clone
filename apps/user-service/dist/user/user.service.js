"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./user.model");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    userModel;
    configService;
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
    }
    async registerUser(createUserDto) {
        console.log('this is serice');
        const { name, email, phoneNumber, password } = createUserDto;
        if (!name || !email || !phoneNumber || !password) {
            throw new common_1.NotFoundException(' User data not found');
        }
        const token = this.configService.get('ACCESS_TOKEN_SECRET');
        console.log(`this is env data  ${token}`);
        const emailExist = await this.userModel.findOne({ email: email });
        if (emailExist) {
            throw new common_1.BadGatewayException('email is allready have is the database ');
        }
        const phoneNumberExist = await this.userModel.findOne({
            phoneNumber: phoneNumber,
        });
        console.log(`this  is the response for the ${phoneNumberExist}`);
        if (phoneNumberExist) {
            throw new common_1.BadGatewayException('phoneNumber is allready have is the database ');
        }
        console.log(password, 'this is simple password');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, 'this is hashed password');
        const newUser = await this.userModel.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
        });
        console.log(`this user from user service ${newUser}`);
        return { message: 'User created successfully' };
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        if (!email || !password) {
            throw new common_1.NotFoundException('email and password are not found');
        }
        console.log(`email is this--  ${email}   password is this ---    ${password}    ---`);
        const emailUser = await this.userModel.findOne({ email: email });
        if (!emailUser) {
            throw new common_1.BadGatewayException('Email are not availble in our database');
        }
        const passwordMatch = await bcrypt.compare(password, emailUser.password);
        if (!passwordMatch) {
            throw new common_1.BadGatewayException('Sorry, password are not match');
        }
        const ACCESS_TOKEN_EXPIRE = this.configService.get('ACCESS_TOKEN_EXPIRE');
        const ACCESS_TOKEN_SECRET = this.configService.get('ACCESS_TOKEN_SECRET');
        return { messege: 'user can be login now ' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map