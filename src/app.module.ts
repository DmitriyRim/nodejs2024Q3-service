import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, TrackModule],
})
export class AppModule {}
