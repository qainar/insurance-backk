import UserSchema from "../models/user-model.js";
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import {TokenService} from "./token-service.js";
import {MailService} from "./mail-service.js";
import {UserDto} from "../dtos/user-dto.js";
import {ApiError} from "../exceptions/api-error.js";


const tokenService = new TokenService()
const mailService = new MailService()
const apiError = new ApiError()

export class UserService{
    async registration(email, name, password, number){
        const candidate = await UserSchema.findOne({email})
        if (candidate){
            throw ApiError.BadRequest('Пользователь с таким email-ом' + email + 'уже существует. Выберите другую почту')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = v4()
        const user = await UserSchema.create({email, name, number, password: hashPassword, activationLink})
        await mailService.sendActivationLink(email,`${process.env.API_URL}/api/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{...tokens, user: userDto}
    }

    async activate(activationLink){
        const user = await UserSchema.findOne({activationLink})
        if (!user){
            throw ApiError.BadRequest('Неправильная ссылка')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password){
        const user = await UserSchema.findOne({email})
        if (!user){
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals){
            throw ApiError.BadRequest('Неправильный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{...tokens, user: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if (!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }
        const user = await UserSchema.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return{...tokens, user: userDto}
    }

    async getUser(){
        const users = await UserSchema.find()
        return users
    }
}