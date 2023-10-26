import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContratosigeproService } from './contratosigepro.service';
import { CreateContratosigeproDto } from './dto/create-contratosigepro.dto';
import { UpdateContratosigeproDto } from './dto/update-contratosigepro.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('contratosigepro')
export class ContratosigeproController {
  constructor(
    private readonly contratosigeproService: ContratosigeproService,
  ) {}

  /* @Post()
  create(@Body() createContratosigeproDto: CreateContratosigeproDto) {
    return this.contratosigeproService.create(createContratosigeproDto);
  } */

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contratosigeproService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contratosigeproService.findOne(+id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateContratosigeproDto: UpdateContratosigeproDto) {
    return this.contratosigeproService.update(+id, updateContratosigeproDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contratosigeproService.remove(+id);
  } */
}
