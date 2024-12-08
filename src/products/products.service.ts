import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  // TODO: CREACION DE LOGGER
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    // LLAAMADO DE LOGGER EN VEZ DED CONSOLE LOG
    this.logger.log('Connected to the database');
  }
  create(createProductDto: CreateProductDto) {
    // TODO: PODEMOS USAR THIS PRODUCT POR QUE EXTENDEMOS DE PRISMA CLIENT
    const product = this.product.create({
      data: createProductDto,
    });

    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    // TODO: UISO DE CAMPO AVAILABLE EN VEZ DE ELIMINAR LE CAMBIAMOS ELE STADO DE DEISPONIBLE A NFALSE
    // dice page pero son products
    const totalPages = await this.product.count({
      where: {
        available: true,
      },
    });

    console.log(totalPages);

    // divido el total por el limite y redondeo hacia arriba
    const lastPage = Math.ceil(totalPages / limit);

    if (page > lastPage) {
      throw new NotFoundException('Page not found');
    }

    return {
      data: await this.product.findMany({
        // TODO: PAGINACION EXPLICADA
        // salta el valor que de la pagina - 1 * el limite
        // por lo que si es 2 - 1 = 1  * 10 es 10 osea que salta 10
        // y abajo muestra 10

        // lo mismo si es 4 - 1 = 3 * 10 = 30 salta 30 y muestra 10
        // y sigue mostrando 10
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true,
        },
      }),
      meta: {
        total: totalPages,
        page: page,
      },
      lastpage: lastPage,
    };
  }

  async findOne(id: number) {
    if (!/^\d+$/.test(id.toString())) {
      const error = new ConflictException('Id no válido'); // Lanza un error si no es solo números
      return error.message; // Retorna el mensaje de error
    }
    // console.log(id);

    const product = await this.product.findFirst({
      where: {
        id: +id,
      },
    });

    if (!product || !product.available) {
      // TODO: USO DE RPC EXCEPTION
      // TUVE QUE CAMBIAR LOS OTROE RROERES POR ESTE
      throw new ConflictException('Producto no encontrado');
    }

    console.log(product);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (!updateProductDto.name || updateProductDto.name === '') {
      throw new NotFoundException('Faltan datos para actualizar');
    }

    if (isNaN(id)) {
      throw new ConflictException('Id no válido');
    }

    const product = await this.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new ConflictException('Producto no encontrado');
    }

    // TODO: DESTRUCTURACION DE OBJETO PARA NO ENVIAR EL ID QUE PUSIMOS EN EL DTO A RAIZ
    // DEL MESSAGEPATTERN PARA MICROSERVICIO
    const { id: idDto, ...data } = updateProductDto;

    console.log(idDto);

    const productEdit = await this.product.update({
      where: {
        id: id,
      },
      data: data,
    });

    return productEdit;

    try {
    } catch (error) {
      throw new ConflictException('Hubo un error');
    }
  }

  async remove(id: number) {
    if (isNaN(+id)) {
      throw new NotFoundException('Id no válido');
    }

    const product = await this.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    try {
      await this.product.update({
        where: {
          id: id,
        },
        data: {
          available: false,
        },
      });

      return 'Producto deshabilitado';
    } catch (error) {
      throw new Error('Hubo un error');
    }
  }
}
