import { Command } from 'commander'
import { DeviceService } from './Service/DeviceService'
import { Device } from './Spotify/Device'
import { DeviceParams } from './Spotify/Contracts/DeviceParams'


const qcsd = new Command
const service = new DeviceService()


qcsd
    .version('0.0.1')
    .description("A simple cli to manage your spotify devices")


qcsd.command('list')
    .action(async () => {
        console.log(await service.findAll())
    })
    .description('list all devices available')

qcsd.command('transfer <string>')
    .action(async (id: string) => {

        const device = new Device(<DeviceParams>{
            id,
            isActive: false,
            type: 'Computer',
            volume: 70,
            name: "INspiron"
        })

        service.transferTo(device)
    }).description('name of the device')

qcsd.parse(process.argv)