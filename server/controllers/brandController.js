import Models from "../models.js"

class BrandController {
    async create(req, res, next) {
        const { name } = req.body
        const brand = await Models.Brand.create({ name })
        res.json(brand)
    }

    async getAll(req, res, next) {
        const brands = await Models.Brand.findAll()
        res.json(brands)
    }
}

export default new BrandController()