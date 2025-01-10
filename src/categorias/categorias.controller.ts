import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CriarCategoriaDTO from './dtos/criar-categoria.dto';
import { Observable } from 'rxjs';
import AtualizarCategoriaDTO from './dtos/atualizar-categoria.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Controller('api/v1/categorias')
export class CategoriasController {
  private logger = new Logger(CategoriasController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  // private clientAdminBackend: ClientProxy;

  // // constructor() {
  // //   this.clientAdminBackend = ClientProxyFactory.create({
  // //     transport: Transport.RMQ,
  // //     options: {
  // //       urls: ['amqp://admin:admin123@localhost:5672/smartranking'],
  // //       queue: 'admin-backend',
  // //     },
  // //   });
  // // }

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackEndInstance();

  @Post()
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDTO) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  @Get()
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
    const id = _id && _id.trim() !== '' ? _id : null; // Evitar strings vazias
    return this.clientAdminBackend.send('consultar-categorias', id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDTO,
    @Param('_id') _id: string,
  ) {
    this.clientAdminBackend.emit('atualizar-categoria', {
      _id,
      categoria: atualizarCategoriaDto,
    });
  }
}
