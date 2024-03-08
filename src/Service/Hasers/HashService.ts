import { ConfigService } from "../ConfigService";
import { base64encode } from "./Base64Encode";
import { sha256 } from "./Sha256";
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export class HasherService {
    static async getHash(): Promise<string> {
        const {codeVerifier} = new ConfigService().read()
        
        const hashed = await sha256(codeVerifier)
        return base64encode(hashed)

    }
}