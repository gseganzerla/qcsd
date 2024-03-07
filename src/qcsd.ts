#! /usr/bin/env node
import { Command } from 'commander'
import { DeviceService } from './Service/DeviceService'
import { Device } from './Spotify/Device'
import { DeviceParams } from './Spotify/Contracts/DeviceParams'
import { list } from './Commands/list'
import { transfer } from './Commands/transfer'
import { login } from './Commands/login'
import { config } from './Commands/config'


const qcsd = new Command



qcsd
    .version('0.0.1')
    .description("A simple cli to manage your spotify devices")


qcsd.command('list')
    .action(() => {
        console.log(process.env.SNAP);
        
    })
    .description('list all devices available')

qcsd.command('transfer <string>')
    .action((id: string) => transfer(id))
    .description('name of the device')

qcsd.command('login')
    .action(login)
    .description('Sing in into the spotify api')

qcsd.command('config')
    .option('--client-id <clientId>', 'Set your client ID')
    .action((options) => config(options))

qcsd.parse(process.argv)
