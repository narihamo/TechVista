import Models from "../models.js"
import ApiError from "../ApiError.js";

class BrandController {
    async create(req, res, next) {
        const { name } = req.body

        const candidate = await Models.Brand.findOne({ where: { name } })
        if (candidate) {
            throw ApiError.badRequest('Такой бренд уже есть')
        }

        const brand = await Models.Brand.create({ name })

        res.json(brand)
    }

    async getAll(req, res, next) {
        const brands = await Models.Brand.findAll()
        res.json(brands)
    }
}

export default new BrandController()