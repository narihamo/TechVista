import Models from "../models.js"

class TypeController {
    async create(req, res, next) {
        const { name } = req.body
        const type = await Models.Type.create({name})
        return res.json(type)
    }

    async getAll(req, res, next) {
        const types = await Models.Type.findAll()
        res.json(types)
    }
}

export default new TypeController()