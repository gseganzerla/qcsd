import { DeviceParams } from "../../../src/Spotify/Contracts/DeviceParams"
import { Device } from "../../../src/Spotify/Device"

const createDevice = ({
  id = "hash",
  name = "Echo Dot",
  type = "speaker",
  volume = 100,
  isActive = false,
}: DeviceParams): Device => {
  return new Device({ id, name, type, volume, isActive })
}

describe("DeviceTest", () => {
  test("Active Device", () => {
    const device = createDevice(<DeviceParams>{})

    device.active()

    expect(device.isActive()).toBe(true)
  })

  test("Increase Volume", () => {
    const device = createDevice(<DeviceParams>{ volume: 50 })

    device.increaseVolume(5)

    expect(device.getVolume()).toBe(55)
  })

  test("Cannot Increase Volume Greater Than 100%", () => {
    const device = createDevice(<DeviceParams>{ volume: 100 })

    device.increaseVolume(5)

    expect(device.getVolume()).toBe(100)
  })

  test("Degrease Volume", () => {
    const device = createDevice(<DeviceParams>{ volume: 50 })

    device.decreaseVolume(5)

    expect(device.getVolume()).toBe(45)
  })

  test("Cannot Degrease Volume Lower Than 100%", () => {
    const device = createDevice(<DeviceParams>{ volume: 4 })

    device.decreaseVolume(5)

    expect(device.getVolume()).toBe(0)
  })
})
