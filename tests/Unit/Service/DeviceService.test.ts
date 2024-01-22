import { DeviceService } from "../../../src/Service/DeviceService"
import { Device } from "../../../src/Spotify/Device"
import devicesData from "../../data/devices.json"
import http from "../../../src/Service/HttpService"
import { TransferPlayback } from "../../../src/types/TransferPlayback"

jest.mock("../../../src/Service/HttpService", () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: devicesData,
      })
    ),
    put: jest.fn()
  }
})

describe("DeviceServiceTest", () => {
  test("test find all devices", async () => {
    const devices = await new DeviceService().findAll()

    expect(devicesData.devices).toEqual(devices)
  })

  test("test transfer to ", () => {
    const service = new DeviceService()
    service.transferTo("fake-id")

    expect(http.put).toHaveBeenCalledWith("/me/player", <TransferPlayback>{
      device_ids: ["fake-id"],
      play: true,
    })
  })
})
