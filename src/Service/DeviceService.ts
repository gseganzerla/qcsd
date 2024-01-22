import { Device } from "../Spotify/Device"
import { TransferPlayback } from "../types/TransferPlayback"
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
}
