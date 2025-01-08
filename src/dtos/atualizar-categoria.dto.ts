import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export default class AtualizarCategoriaDTO {
  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}

interface Evento {
  nome: string;
  operacao: string;
  valur: number;
}
