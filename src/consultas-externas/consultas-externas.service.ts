import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class ConsultasExternasService {
  async enviarSITAHU(ci: string): Promise<any> {
    try {
      // Configurar el encabezado de autorización
      const headers = {
        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9rZXkiOjEsImluc3RpdHV0aW9uIjoiQWdlbmNpYSBFc3RhdGFsIGRlIFZpdmllbmRhIiwic3lzdGVtIjoiVmlcdTAwZTF0aWNvcyIsImRhdGFjcmVhdGVkIjoxNjY4MTg1OTI2LCJkYXRlZmluaXNoZWQiOjAsIkFQSV9USU1FIjoxNjY4MTg1OTI2fQ.iMvwfyzUolxC_fpRjY606ZHNkWU0WlX4jyykCgv-Xus',
      };

      // Configurar la solicitud con los encabezados de autorización
      const config: AxiosRequestConfig = {
        headers,
      };

      const response = await axios.post(`http://sitahu.aevivienda.gob.bo/ServicioWeb/vigente/${ci}`, null, config);

      return response.data;
    } catch (error) {
      throw new HttpException('Error al enviar solicitud a SITAHU', HttpStatus.BAD_GATEWAY);
    }
  }
}
