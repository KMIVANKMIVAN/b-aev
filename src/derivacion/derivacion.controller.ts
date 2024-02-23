import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DerivacionService } from './derivacion.service';
import { CreateDerivacionDto } from './dto/create-derivacion.dto';
import { UpdateDerivacionDto } from './dto/update-derivacion.dto';

@Controller('derivacion')
export class DerivacionController {
  constructor(private readonly derivacionService: DerivacionService) { }

  @Post()
  async create(@Body() createDerivacionDto: CreateDerivacionDto) {
    return await this.derivacionService.create(createDerivacionDto);
  }

  @Get()
  async findAll() {
    return await this.derivacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.derivacionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDerivacionDto: UpdateDerivacionDto,
  ) {
    return await this.derivacionService.update(+id, updateDerivacionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.derivacionService.remove(+id);
  }
}
