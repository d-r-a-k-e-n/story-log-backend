import {
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class EntryDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @IsString()
  image?: string;

  @IsNumber()
  rating?: number;

  @IsInt()
  userId?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  genreIds: number[];

  @IsInt()
  typeId: number;

  @IsInt()
  statusId: number;
}
