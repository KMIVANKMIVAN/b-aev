import { Controller, Post } from '@nestjs/common';
import { SemillabusaService } from './semillabusa.service';

@Controller('semillabusa')
export class SemillabusaController {
  constructor(private readonly semillabusaService: SemillabusaService) {}
  @Post('ejecutarsemilla')
  ejecutarSemilla() {
    return this.semillabusaService.ejecutarSemilla();
  }
}
