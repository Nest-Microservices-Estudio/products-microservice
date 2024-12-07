import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

// TODO: PARTIALTYPE EXPLICADO

// ESTO HACE TODAS LAS PROPIEDADES DEL CREATEPRODUCT OPCIONALES
export class UpdateProductDto extends PartialType(CreateProductDto) {
    
    @IsNumber()
    @IsPositive()
    id: number;
}
