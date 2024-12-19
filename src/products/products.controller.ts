import {
 
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // ParseIntPipe,
  // Delete,
  // Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // TODO: MICROSERVICIO

  // USAMOS MessagePattern EN LUGAR DE POST
  // @Post()
  // Y USAMOS PAYLOAD EN VEZ DE BODY
  @MessagePattern('create_product')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // TODO: MICROSERVICIO

  // LO MISMO ACA SACAMOS EL GET Y USAMOS MessagePattern

  // @Get()
  //  TODO: QUERY PARAMETERS

  @MessagePattern('find_all_products')
  // LOS OBJTENSMO CON EL DECORADOR QUERY
  // y asi se le manda en el postman http://localhost:3001/products?page=1&limit=2
   findAll(@Payload() paginationDto: PaginationDto) {

    console.log('FIND ALLLL DESDE MS');
    
    return  this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern( 'find_one_product' )
  findOne(@Payload('id') id: number) {

   
  
    // { id: 1
    return this.productsService.findOne(id);
  }


  // @Patch(':id')
  // TODO: MODIFICMAOS EL DTO DE UPDATE PARA RECIBIR UN ID
  @MessagePattern( 'update_product' )

  // AGREGAMOS EL ID QUE MNECESOTAMOS POR PARAMETRO 
  // AL DTO DEL UPDATE PARA ASI RECIBIR UN UNICO PAYLOAD 
  // POR LO QUE ENVIARE EL ID QUE QUIERO ACTUALIZAR MAS LA DATA A ACTUALIZAR 
  // EMN EL SERVICIO TOMARE ESE ID PARA HJACER LAS CONSULTAS
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern('delete_product')
  remove(@Payload('id') id: string) {

 
    
    console.log('id desde controller product', id);
    
    return this.productsService.remove(+id);
  }

  // TODO: CREAR NUEVO METODO DE VALIDACION DE PRODUCTO

  @MessagePattern('validate_products')
  // 1. RECIBIMOS UNA COLECCION DE ID
  validateProduct(@Payload() ids: number[]) {
    return this.productsService.validateProduct(ids);
  }
}
