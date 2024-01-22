import { DeviceService } from "../../../src/Service/DeviceService"
import devicesData from "../../data/devices.json"

jest.mock("../../../src/Service/DeviceService")
const MockedService = DeviceService as jest.MockedClass<typeof DeviceService>

describe("DeviceServiceTest", () => {
  test("test find all", () => {
    MockedService.mockImplementation(() => {
      return {
        findAll: jest.fn().mockReturnValue(devicesData.devices),
      }
    })

    const devices = new DeviceService().findAll()

    expect(devices).toEqual(devicesData.devices)
  })
})
