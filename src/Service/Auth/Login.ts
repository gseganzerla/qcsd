import axios from "axios";
import { HasherService } from "../Hasers/HashService.js";
import dotenv from 'dotenv'
import fs from 'fs'
import { log } from "console";
import { ConfigService } from "../ConfigService.js";




export class LoginService {

    async login(code: string): Promise<void> {
        const {clientId, redirectUrl, codeVerifier} = new ConfigService().read()

        const response = await axios.post("https://accounts.spotify.com/api/token", {
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUrl,
            code_verifier: codeVerifier,

        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        fs.writeFileSync('token', response.data.access_token)
        
    }


    async getCode(): Promise<string> {
        const scope = 'user-read-playback-state user-modify-playback-state app-remote-control streaming';
        const {clientId, redirectUrl} = new ConfigService().read()

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: await HasherService.getHash(),
            redirect_uri: redirectUrl,
        }


        const authUrl = new URL(
            `https://accounts.spotify.com/authorize?response_type=${params.response_type}&client_id=${params.client_id}&scope=${scope}&code_challenge_method=${params.code_challenge_method}&code_challenge=${params.code_challenge}&redirect_uri=${params.redirect_uri}`);

        return authUrl.toString()
    }


}
