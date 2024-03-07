import { Config } from "../types/Config";
import fs from 'fs'

export class ConfigService {
    path: string = 'config/config.json'

    write({clientId}: Config) {
        
        let config = JSON.parse(
            fs.readFileSync(this.path, 'utf8')
        )

        config = { ...config, clientId }

        fs.writeFileSync(this.path, JSON.stringify(config, null, 2))
    }

    read(): Config {
        return JSON.parse(fs.readFileSync(this.path, 'utf8')) as Config
    }
}