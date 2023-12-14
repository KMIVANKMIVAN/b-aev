import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiscalesService } from './fiscales.service';
import { CreateFiscaleDto } from './dto/create-fiscale.dto';
import { UpdateFiscaleDto } from './dto/update-fiscale.dto';

@Controller('fiscales')
export class FiscalesController {
  constructor(private readonly fiscalesService: FiscalesService) {}

  @Post()
  create(@Body() createFiscaleDto: CreateFiscaleDto) {
    return this.fiscalesService.create(createFiscaleDto);
  }

  @Get()
  findAll() {
    return this.fiscalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiscalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiscaleDto: UpdateFiscaleDto) {
    return this.fiscalesService.update(+id, updateFiscaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fiscalesService.remove(+id);
  }
}
