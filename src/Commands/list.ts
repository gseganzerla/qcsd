import { DeviceService } from "../Service/DeviceService"

export const list = async () => {
    const service = new DeviceService()
    console.log(await service.findAll())
}