import Models from "../models.js"
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import ApiError from "../ApiError.js"

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, info, brandId, typeId } = req.body
            const { img } = req.files
            const filename = uuidv4() + '.jpg'
            img.mv(path.resolve(process.cwd(), 'static', filename))
    
            const device = await Models.Device.create({ name, price, brandId, typeId, img: filename })
    
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    Models.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
    
            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        
        let offset = page * limit - limit
        let devices

        if (!brandId && !typeId) {
            devices = await Models.Device.findAndCountAll({limit, offset})
        }

        if (brandId && !typeId) {
            devices = await Models.Device.findAndCountAll({where:{brandId}, limit, offset})
        }

        if (!brandId && typeId) {
            devices = await Models.Device.findAndCountAll({where:{typeId}, limit, offset})
        }

        if (brandId && typeId) {
            devices = await Models.Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }

        return res.json(devices)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const device = await Models.Device.findOne({ where: { id }, include: [{model: Models.DeviceInfo, as: 'info'}] })
            return res.json(device)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new DeviceController()