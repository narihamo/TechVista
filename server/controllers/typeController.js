import Models from "../models.js"
import ApiError from "../ApiError.js";

class TypeController {
    async create(req, res, next) {
        const { name } = req.body

        const candidate = await Models.Type.findOne({ where: { name }})
        if (candidate) {
            throw ApiError.badRequest('Такой тип уже есть')
        }

        const type = await Models.Type.create({name})

        return res.json(type)
    }

    async getAll(req, res, next) {
        const types = await Models.Type.findAll()
        res.json(types)
    }
}

export default new TypeController()