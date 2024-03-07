import ApiError from '../ApiError.js'
import Models from '../models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '7d'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }

        let user = await Models.User.findOne({ where: { email }})
        
        if (user) {
            return next(ApiError.badRequest('Пользователь с таким email уже зарегестрирован'))
        }

        const hash = await bcrypt.hash(password, 5)
        user = await Models.User.create({ email, password: hash })
        const basket = await Models.Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }
    
    async login(req, res, next) {
        const { email, password } = req.body

        const user = await Models.User.findOne({ where: { email }})

        if (!user) {
            return next(ApiError.badRequest('Пользователя с таким email не существует'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

export default new UserController()