import { base64encode } from "./Base64Encode";
import { sha256 } from "./Sha256";
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export class HasherService {
    static async getHash(): Promise<string> {
        const hashed = await sha256(process.env.CODE_VERIFIER as string)
        return base64encode(hashed)

    }
}