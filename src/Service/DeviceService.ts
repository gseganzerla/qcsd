import { Device } from "../Spotify/Device"
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
}
