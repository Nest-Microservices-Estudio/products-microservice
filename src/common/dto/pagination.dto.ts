// TODO: PAGINACION CON PRISMA

import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

// CREAMOS ELD TO PRIMERO EN ESTA CARPETA
// VALORES POR DEFECTO 1 Y 10 SI VAMOS A POSTMAN Y NO MANDAMOS NADA SERAN POR DEFECTO ESOS
export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
