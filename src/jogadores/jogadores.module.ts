import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Module({
  imports: [],
  controllers: [JogadoresController],
  providers: [ClientProxySmartRanking],
})
export class JogadoresModule {}
