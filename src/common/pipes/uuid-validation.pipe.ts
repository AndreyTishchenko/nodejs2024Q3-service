import { IsUUID } from 'class-validator';

export class CheckUUID {
  @IsUUID()
  id: string;
}
