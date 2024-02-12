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
            code_verifier: process.env.CODE_VERIFIER,

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

const l = new LoginService()

// l.getCode()
l.login('AQAn9dE_dGlv3R3edFPwXu9PgqwzOqDbt_gCgNGvUDqYPAtLSlCr_yOl6dCpfWfIZ4MsZ3hBMdMPMIH7LIoERGSu-GIA4epNUXqVqGVN6DlL9Vk0dIfHnkVbpsyycDwg9tcBkpTT8mBnqOmP5jUopopnHYEf-OCAfMS5-4q-1pR1Ac_IfD9NECkNzzaoWdAMbLXTCo72XxzJK-hoq7UuKIBkrWu32Kanp_YLDYariqiFXwtEfEGOS1wgTwmgrMEGJqf5hHz7Yuj8DHDbDePZbOcf5I3xrjuxBDwayrQqtaVEUUZo_N_QA_kGzUjM_DpdcZMb6cVJHTDh6c7JFmdIJ2M')
// l.login('AQAAKJ2GjWyX4ia5mKgWeivyolkGH0E8Jqdp9CTCV_EAsZFXoS1-X2knpkCRRKyGwxgaWVHcClR2_9HwJFiw41cdqupMD6jdtyzR2vUQTcS3Ybaj79hAC-l9_NyJ-yw8OvoWh0gIlGXVzsc-cIYGQQLA-oECuLFd6J75jWw34mckFbhp9nsW5DLviN8J1EfEOqIbEt1Rv__PBwk_YZeqggnlr-L_F5v_zviIbeUEefmCVLMzRZQMLvyuAXi0OpqNqH6-t_PIlmFeUCymy-PAuWwcHTpNtxdoEbGGw9PRm6caxFx6hLHVq1tsCFvi4cu2JZk173FUvQFYzFIL4dMHS74')
// l.login('AQBpv08EhkNDi0EI16kMAof2t0imPWQtyYK_Gb7Ju4GTPuLZdMn2kBFmZ-Tdasf3MNVojPX9BETcRQlKtyB_oGxSSoykTvc8Wbqd8JjBp29FPg07462FHU7otxmCnHMmNBDl_s46Kv5cDRPcdmB8leexLqIYDUachnjMnx4Kqcc56-gQMRCoygBqfVOrDSyDZn884k9wbHYEUCj5_K6K3nix920XAAf1HID-RlaP3co5XKrCEb2eepZLPvMaILcw-eUs2-tqDxcgtJikR0F9hGd5uYnNrceHRA6MxctT5feEqiCvzvq3yfIZG67h7bEPUIpFd03pdcDOEBdfXid9pOM')