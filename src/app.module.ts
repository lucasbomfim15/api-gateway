import { Module } from '@nestjs/common';
import { CategoriaModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';

@Module({
  imports: [CategoriaModule, JogadoresModule, ProxyrmqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
