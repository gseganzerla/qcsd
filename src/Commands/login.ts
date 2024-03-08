import readline from 'readline'
import { LoginService } from "../Service/Auth/Login"

export const login = async () => {
    const service = new LoginService

    console.log('Open the url below into the broser and follow the instructions. \n')
    console.log(await service.getCode())


    getInput(service)
}

function getInput(service: LoginService): void {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('Put the code from the web page: \n', (code: string): void => {

        service.login(code)
        
        rl.close()
    })
}