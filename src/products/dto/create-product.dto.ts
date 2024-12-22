import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Type(() => Number)
  public price: number;

  @IsString()
  @IsOptional()
  public currency_id?: string 

  
  @IsString()
  @IsOptional()
  public picture_url?: string

  
  @IsString()
  @IsOptional()
  public description?: string
  
  @IsString()
  @IsOptional()
  public category_id?: string

}
