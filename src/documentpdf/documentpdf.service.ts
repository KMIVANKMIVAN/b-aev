import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DocumentpdfService {
  async guardarPdf(file: Express.Multer.File) {
    if (file) {
      if (file.mimetype !== 'application/pdf') {
        throw new BadRequestException('El archivo no es un PDF válido');
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB en bytes
        throw new BadRequestException(
          'El archivo excede el tamaño máximo de 10MB',
        );
      }

      const dateTime = this.obtenerFechaYHoraActual();
      const uniqueName = await this.concatenarNombreConFechaHora(dateTime);
      const destinationPath = '/home/vancc369/Documentos/' + uniqueName;

      try {
        fs.writeFileSync(destinationPath, file.buffer);
        console.log(`PDF guardado en: ${destinationPath}`);
        return { success: true, message: 'PDF guardado exitosamente' };
      } catch (error) {
        console.error('Error al guardar el PDF:', error);
        return { success: false, message: 'Error al guardar el PDF' };
      }
    } else {
      console.log('No se recibió ningún archivo.');
      return { success: false, message: 'No se recibió ningún archivo' };
    }
  }

  obtenerFechaYHoraActual(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  }

  async concatenarNombreConFechaHora(dateTime: string) {
    return `haciendopruebas-${dateTime}.pdf`;
  }
}
