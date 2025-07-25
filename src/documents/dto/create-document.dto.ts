import { IsString, MinLength } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;
}
