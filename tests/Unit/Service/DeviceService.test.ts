import { DeviceService } from "../../../src/Service/DeviceService"
import { Device } from "../../../src/Spotify/Device"
import devicesData from "../../data/devices.json"
import http from "../../../src/Service/HttpService"
import { TransferPlayback } from "../../../src/types/TransferPlayback"
import { createDevice } from "../Spotify/Device.test"
import { DeviceParams } from "../../../src/Spotify/Contracts/DeviceParams"
import { VolumeSettings } from "../../../src/types/VolumeSettings"

jest.mock("../../../src/Service/HttpService", () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: devicesData.devices,
      })
    ),
    put: jest.fn(),
  }
})

describe("DeviceServiceTest", () => {
  test("test find all devices", async () => {
    const devices = await new DeviceService().findAll()

    expect(devicesData.devices).toEqual(devices)
  })

  test("test transfer to ", () => {
    const service = new DeviceService()
    const device = createDevice(<DeviceParams>{})
    service.transferTo(device)

    expect(http.put).toHaveBeenCalledWith("/me/player", <TransferPlayback>{
      device_ids: [device.id],
      play: true,
    })
  })

  test("test increase volume by 10", async () => {
    const service = new DeviceService()
    const device = createDevice(<DeviceParams>{})
    service.increaseVolume(device, 10)

    expect(http.put).toHaveBeenCalledWith("/me/player/volume", <VolumeSettings>{
      device_id: device.id,
      volume_percent: device.getVolume(),
    })
  })

  test("test degrease volume by 10", async () => {
    const service = new DeviceService()
    const device = createDevice(<DeviceParams>{})
    service.degreaseVolume(device, 10)

    expect(http.put).toHaveBeenCalledWith("/me/player/volume", <VolumeSettings>{
      device_id: device.id,
      volume_percent: device.getVolume(),
    })
  })
})
