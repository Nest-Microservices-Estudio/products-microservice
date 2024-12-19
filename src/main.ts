import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // TODO: LOGGER EN MAIN
  const logger = new Logger('Main');

  console.log('NATS SERVERS DESDE PRODUCT MS',envs.natsServers);

  

  // TODO: MICROSERVICIO INIT
  // CAMBIAREMOS ESTO
  // const app = await NestFactory.create(AppModule);

  // POR ESTO

  const app = await NestFactory.createMicroservice(AppModule, {
  //  TODO: CAMBIANDO A NATS
   
    // transport: Transport.TCP,
    transport: Transport.NATS,

    options: {
      // port: envs.port,
      servers: envs.natsServers ,
    },
  });

  // TODO: ESTO ES PARA QUE LOS PARAMETROS QUE SE RECIBAN EN LOS ENDPOINTS SEAN VALIDADOS
  // Y ASI FINCIONARA CLASS VALIDATOR Y CLAS TRANSFORER
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // AQUI QUITAREMOS EL envs.PORT
  // await app.listen(envs.port);
  // lo definimos arriba en las opciones de configuracion

  await app.listen();

  // TODO: ESTO ES PARA QUE LOS MICROSERVICIOS SE INICIEN SI TENGO MICROSERVICIOS EN MI APP
  // PUEDE SE RUNA APP HIBRIDA
  // await app.startAllMicroservices()

  logger.log(`Products microservices is running on: ${envs.port}`);
}
bootstrap();
