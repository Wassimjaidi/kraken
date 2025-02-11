import { StoreService } from './store.service';
import { Controller, Post, Get,UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('kraken')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }


  @Post('push')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createStoreDto: any) {  
    return this.storeService.create(createStoreDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.storeService.findAll();
  }
}
