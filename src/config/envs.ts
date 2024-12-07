import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}
const envsSchema: joi.ObjectSchema = joi.object({
  PORT: joi.number().required(),
}).unknown(true);
const { error, value } = envsSchema.validate(process.env);
if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;
export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
}