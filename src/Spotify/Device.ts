import { DeviceParams } from "./Contracts/DeviceParams"

export class Device {
  public readonly id: string
  private _isActive: boolean
  public readonly name: string
  public readonly type: string
  private volume: number

  constructor({ id, isActive, name, type, volume }: DeviceParams) {
    this.id = id
    this._isActive = isActive
    this.name = name
    this.type = type
    this.volume = volume
  }

  public isActive(): boolean {
    return this._isActive
  }

  public increaseVolume(value: number = 10): void {
    if (this.volume + value >= 100) {
      this.volume = 100

      return
    }

    this.volume += value
  }

  public decreaseVolume(value: number = 10): void {
    if (this.volume - value <= 0) {
      this.volume = 0

      return
    }

    this.volume -= value
  }

  public active(): void {
    this._isActive = true
  }

  public getVolume(): number {
    return this.volume
  }
}
