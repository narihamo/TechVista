import Models from "../models.js";

class BasketController {
    async addToBasket(req, res) {
        const {userId, deviceId} = req.body
        const basket = await Models.Basket.findOne({where: { userId }})

        let basketDevice = await Models.BasketDevice.findOne({ where: { basketId: basket.id, deviceId: deviceId } })
        if (basketDevice) {
            basketDevice.count += 1
            await basketDevice.save()
        } else {
            basketDevice = await Models.BasketDevice.create({ basketId: basket.id, deviceId: deviceId })
        }

        return res.json(basketDevice)
    }

    async countIncrement(req, res) {
        const { deviceId, userId } = req.body
        const basket = await Models.Basket.findOne({where: { userId }})
        const basketDevice = await Models.BasketDevice.findOne({ where: { basketId: basket.id, deviceId: deviceId } })

        basketDevice.count += 1
        await basketDevice.save()
        console.log(basketDevice.dataValues)
        return res.json(basketDevice)
    }

    async countDecrement(req, res) {
        const { deviceId, userId } = req.body
        const basket = await Models.Basket.findOne({where: { userId }})
        const basketDevice = await Models.BasketDevice.findOne({ where: { basketId: basket.id, deviceId: deviceId } })

        basketDevice.count -= 1
        await basketDevice.save()

        if (basketDevice.count === 0) {
            await Models.BasketDevice.destroy({ where: { id: basketDevice.id } })
        }

        console.log(basketDevice.dataValues)
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
            model.dataValues.count = device.count
            // console.log('here model ', model.dataValues)
            basketArr.push(model.dataValues)
        }

        return res.json(basketArr)
    }
}

export default new BasketController()