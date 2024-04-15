import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NivelbusaService } from './nivelbusa.service';
import { CreateNivelbusaDto } from './dto/create-nivelbusa.dto';
import { UpdateNivelbusaDto } from './dto/update-nivelbusa.dto';

@Controller('nivelbusa')
export class NivelbusaController {
  constructor(private readonly nivelbusaService: NivelbusaService) {}

  @Post()
  create(@Body() createNivelbusaDto: CreateNivelbusaDto) {
    return this.nivelbusaService.create(createNivelbusaDto);
  }

  @Get()
  findAll() {
    return this.nivelbusaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nivelbusaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateNivelbusaDto: UpdateNivelbusaDto,
  ) {
    return this.nivelbusaService.update(+id, updateNivelbusaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.nivelbusaService.remove(+id);
  }
}
