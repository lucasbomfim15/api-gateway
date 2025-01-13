import { Module } from '@nestjs/common';
import { CategoriaModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { AwsModule } from './aws/aws.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    CategoriaModule,
    JogadoresModule,
    ProxyrmqModule,
    AwsModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
