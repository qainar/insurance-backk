import {Router} from "express";
import {UserController} from '../controller/user-controller.js'
import {body} from "express-validator";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import {PropertyController} from "../controller/property-controller.js";
import {CarController} from "../controller/car-controller.js";
import {LifeService} from "../service/lifeService.js";
import {LifeController} from "../controller/life-controller.js";

const router = new Router()

const userController = new UserController()
const propertyController = new PropertyController()
const carController = new CarController()
const lifeController = new LifeController()
//auth
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:4, max: 20}),
    body('name').isLength({min:1, max: 100}),
    body('number').isLength({min:11, max:11})
    ,userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/profile', AuthMiddleware ,userController.profile)

//property
router.post('/property', AuthMiddleware, propertyController.create)
router.get('/property/:id', AuthMiddleware, propertyController.getOne)

//car
router.post('/car', AuthMiddleware, carController.create)
router.get('/car/:id', AuthMiddleware, carController.getOne)

//life
router.post('/life', AuthMiddleware, lifeController.create)
router.get('/life/:id', AuthMiddleware, lifeController.getOne)

export default router