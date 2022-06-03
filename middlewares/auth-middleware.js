import {ApiError} from "../exceptions/api-error.js";
import {TokenService} from "../service/token-service.js";

const tokenService = new TokenService()

export default function AuthMiddleware(req, res, next){
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken){
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData){
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()
    }catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}