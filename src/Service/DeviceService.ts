
import { Device } from "../Spotify/Device"
import { DeviceResponseData } from "../types/Services/DeviceApiResponse"
import { TransferPlayback } from "../types/TransferPlayback"
import { VolumeSettings } from "../types/VolumeSettings"
import http from "./HttpService"

interface DevicesResponse {
  devices: DeviceResponseData[]
}

export class DeviceService {
  async findAll(): Promise<DevicesResponse[]> {
    const {data: devices} = await http.get<DevicesResponse[]>("/me/player/devices")

    return devices
  }

  async transferTo(device: Device): Promise<void> {
    device.active()
    
    http.put("/me/player", <TransferPlayback>{
      device_ids: [device.id],
      play: device.isActive(),
    })
  }

  async increaseVolume(device: Device, volume?: number): Promise<void> {
    device.increaseVolume(volume)

    http.put("/me/player/volume", <VolumeSettings>{
      device_id: device.id,
      volume_percent: device.getVolume(),
    })
  }

  async degreaseVolume(device: Device, volume?: number): Promise<void> {
    device.decreaseVolume(volume)

    http.put("/me/player/volume", <VolumeSettings>{
      device_id: device.id,
      volume_percent: device.getVolume(),
    })
  }
}

