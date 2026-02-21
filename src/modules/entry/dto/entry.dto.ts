import { IsString, MinLength, MaxLength, IsUrl, IsInt } from 'class-validator';

export class EntryDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @IsString()
  author?: string;

  @IsInt()
  rating: number;

  @IsInt()
  userId: number;

  @IsInt()
  genreId: number;

  @IsInt()
  typeId: number;

  @IsInt()
  statusId: number;
}
