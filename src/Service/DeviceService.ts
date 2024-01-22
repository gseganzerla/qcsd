import { Device } from "../Spotify/Device"
import { TransferPlayback } from "../types/TransferPlayback"
import { VolumeSettings } from "../types/VolumeSettings"
import http from "./HttpService"

interface DevicesResponse {
  devices: Device[]
}

export class DeviceService {
  async findAll(): Promise<Device[]> {
    const {
      data: { devices },
    } = await http.get<DevicesResponse>("/me/player/devices")

    return devices
  }

  async transferTo(id: string): Promise<void> {
    http.put("/me/player", <TransferPlayback>{
      device_ids: [id],
      play: true,
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
