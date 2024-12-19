import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;

  // TODO: NATS ENVS
  NATS_SERVERS: string[]
}
const envsSchema: joi.ObjectSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
  // ASI DEVINIMOS UNA ENV QUE SERA ARRAY
  NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true);

console.log('NATS_SERVERS DEDES PRODUCTS-MS', process.env.NATS_SERVERS);


// TODO: NATS MODIFICAMOS VARIABLES PARA PODER TOMAR LOS ELEMENTOS DE LA VARAIBLE DE ENTORNO
const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;
export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    natsServers: envVars.NATS_SERVERS
}