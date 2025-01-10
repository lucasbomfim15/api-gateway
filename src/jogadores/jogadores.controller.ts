import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import CriarJogadorDTO from './dtos/criarJogadorDTO';
import { firstValueFrom, Observable } from 'rxjs';
import AtualizarJogadorDTO from './dtos/atualizarJogadorDTO';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros-pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  private logger = new Logger(JogadoresController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackEndInstance();

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDTO) {
    this.logger.log(`criarjogadorDto: ${JSON.stringify(criarJogadorDto)}`);
    const categoria = await firstValueFrom(
      this.clientAdminBackend.send(
        'consultar-categorias',
        criarJogadorDto.categoria,
      ),
    );

    if (categoria) {
      await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto);
    } else {
      throw new BadRequestException('Categoria nao cadastrada');
    }
  }

  @Get()
  @UsePipes(ValidationPipe)
  consultarJogadores(@Query('idJogador') _id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-jogadores', _id ? _id : '');
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDTO,
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ) {
    const categoria = await firstValueFrom(
      this.clientAdminBackend.send(
        'consultar-categorias',
        atualizarJogadorDto.categoria,
      ),
    );

    if (categoria) {
      await this.clientAdminBackend.emit('atualizar-jogador', {
        id: _id,
        jogador: atualizarJogadorDto,
      });
    } else {
      throw new BadRequestException('Categoria nao cadastrada');
    }
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string) {
    await this.clientAdminBackend.emit('deletar-jogador', { _id });
  }
}
