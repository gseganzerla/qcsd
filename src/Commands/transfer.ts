import { DeviceService } from "../Service/DeviceService"
import { DeviceParams } from "../Spotify/Contracts/DeviceParams"
import { Device } from "../Spotify/Device"

export const transfer = async (id: string) => {

    const service = new DeviceService()
    const device = new Device(<DeviceParams>{
        id,
        isActive: false,
        type: 'Computer',
        volume: 70,
        name: "INspiron"
    })

    service.transferTo(device)
}