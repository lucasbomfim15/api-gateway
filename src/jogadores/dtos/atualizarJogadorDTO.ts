import { IsNotEmpty, IsOptional } from 'class-validator';

export default class AtualizarJogadorDTO {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;

  @IsOptional()
  readonly categoria: string;
}
