import { Device } from "../../../src/Spotify/Device"

const createDevice = ({
  id = "hash",
  name = "Echo Dot",
  type = "Speaker",
  volume = 100,
  supportsVolume = true,
  isActive = true,
} = {}): Device => {
  return new Device(id, isActive, name, supportsVolume, type, volume)
}

describe("DeviceTest", () => {
  test("Active Device", () => {
    const device = createDevice()

    device.active()

    expect(device.isActive()).toBe(true)
  })

  test("Increase Volume", () => {
    const device = createDevice({volume: 50})

    device.increaseVolume(5)

    expect(device.getVolume()).toBe(55)
  })

  test("Cannot Increase Volume Greater Than 100%", () => {
    const device = createDevice({volume: 100})

    device.increaseVolume(5)

    expect(device.getVolume()).toBe(100)
  })

  test("Degrease Volume", () => {
    const device = createDevice({volume: 50})

    device.decreaseVolume(5)

    expect(device.getVolume()).toBe(45)
  })

  test("Cannot Degrease Volume Lower Than 100%", () => {
    const device = createDevice({volume: 5})

    device.decreaseVolume(5)
    device.decreaseVolume(5)

    expect(device.getVolume()).toBe(0)
  })

  
})
