import { ConfigService } from "../Service/ConfigService";
import { Config } from "../types/Config";

export const config = (options: Config) => {
    new ConfigService().write(options)
}