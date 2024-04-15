import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartamentobusaService } from './departamentobusa.service';
import { CreateDepartamentobusaDto } from './dto/create-departamentobusa.dto';
import { UpdateDepartamentobusaDto } from './dto/update-departamentobusa.dto';

@Controller('departamentobusa')
export class DepartamentobusaController {
  constructor(
    private readonly departamentobusaService: DepartamentobusaService,
  ) {}

  @Post()
  create(@Body() createDepartamentobusaDto: CreateDepartamentobusaDto) {
    return this.departamentobusaService.create(createDepartamentobusaDto);
  }

  @Get()
  findAll() {
    return this.departamentobusaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departamentobusaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDepartamentobusaDto: UpdateDepartamentobusaDto,
  ) {
    return this.departamentobusaService.update(+id, updateDepartamentobusaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departamentobusaService.remove(+id);
  }
}
