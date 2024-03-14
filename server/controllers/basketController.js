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
        const removedDeviceId = await Models.BasketDevice.findOne({ where: { basketId: basket.id, deviceId } })
        const removedDevice = await  Models.BasketDevice.destroy({ where: { id: removedDeviceId.id } })

        return res.json(removedDevice)
    }

    async getAllBasket(req, res) {
        const { userId } = req.params
        const basketArr = []
        const basket = await Models.Basket.findOne({ where: { userId } })
        const basketDevices = await Models.BasketDevice.findAll({ where: { basketId: basket.id }})

        for (const device of basketDevices) {
            const model = await Models.Device.findOne({ where: { id: device.deviceId } })
            basketArr.push(model.dataValues)
            console.log('here data values == ', model.dataValues)
        }

        return res.json(basketArr)
    }
}

export default new BasketController()