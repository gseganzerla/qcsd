import axios from "axios";
import { HasherService } from "../Hasers/HashService.js";
import dotenv from 'dotenv'
import fs from 'fs'
import { log } from "console";

dotenv.config({ path: '.env' })



export class LoginService {

    async login(code: string): Promise<void> {


        const response = await axios.post("https://accounts.spotify.com/api/token", {
            client_id: process.env.CLIENT_ID,
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.REDIRECT_URI,
            code_verifier: '7KYsbXdINp4aeobAsSIjsfRQRoL2Pm8U7GglXpRrcElIBUxZQMlsBXTEyrHaQM2r',

        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        fs.writeFileSync('token', response.data.access_token)
        
    }


    async getCode(): Promise<void> {
        const scope = 'user-read-playback-state user-modify-playback-state app-remote-control streaming';


        const params = {
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope,
            code_challenge_method: 'S256',
            code_challenge: await HasherService.getHash(),
            redirect_uri: process.env.REDIRECT_URI,
        }


        const authUrl = new URL(
            `https://accounts.spotify.com/authorize?response_type=${params.response_type}&client_id=${params.client_id}&scope=${scope}&code_challenge_method=${params.code_challenge_method}&code_challenge=${params.code_challenge}&redirect_uri=${params.redirect_uri}`);

        console.log(authUrl.toString())
    }


}
