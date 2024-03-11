import Models from "../models.js";

class BasketController {
    async addToBasket(req, res, next) {
        const {userId, deviceId} = req.body
        const basket = await Models.Basket.findOne({where: { userId }})
        const basketDevice = await  Models.BasketDevice.create({ basketId: basket.id, deviceId: deviceId })

        return res.json(basketDevice)
    }

    async removeFromBasket(req, res, next) {
        const { userId, deviceId } = req.body
        const basket = await Models.Basket.findOne({where: { userId }})
        const removedDevice = await  Models.BasketDevice.destroy({ where: { basketId: basket.id, deviceId } })

        return res.json(removedDevice)
    }

    async getAll(req, res, next) {
        const { userId } = req.params
        const basket = await Models.Basket.findOne({ where: { userId } })
        const basketDevices = await Models.BasketDevice.findAll({ where: { basketId: basket.id }})

        return res.json(basketDevices)
    }
}

export default new BasketController()