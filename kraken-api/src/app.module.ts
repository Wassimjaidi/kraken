import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './stores/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/stores'), // Connexion à MongoDB
    StoreModule, // Import du module des chats
  ],
})
export class AppModule {}
