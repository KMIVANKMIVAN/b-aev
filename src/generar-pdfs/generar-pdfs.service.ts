import { Injectable, NotFoundException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { join } from 'path';
import { readFile } from 'fs/promises';

import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class GenerarPdfsService {
  constructor(

    private configService: ConfigService,
  ) { }

  namePc = this.configService.get<string>('NAMEPC');

  async generarPDF(): Promise<string> {
    // Ruta al archivo HTML (ajusta según la ubicación real de tu archivo)
    const pathToHtmlFile = join(__dirname, '..', '..', 'src', 'generar-pdfs', 'pag', 'index.html');
    // Leer el contenido HTML desde el archivo

    const datosParaPdf = {
      titulo: "INSTRUCCIÓN DE DESEMBOLSO",
      encabezado: "IDE: AEV-PTS-0070/2024",
      lugar: "Potosi, 05 de marzo de 2024"
    };


    /* const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${datosParaPdf.titulo}</title>
    <!-- Estilos omitidos por brevedad -->
  </head>
  <body>
    <div class="pagina-a4">
      <div class="contenido">
        <!-- Contenido con datos dinámicos -->
        <h1>${datosParaPdf.encabezado}</h1>
        <p>${datosParaPdf.mensaje}</p>
        <!-- Más contenido HTML aquí -->
      </div>
    </div>
  </body>
  </html>
  `; */
    const htmlContent = `
  <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Documento PDF</title>
<style>
  /* Estilos para simular una página A4 */
  body {
    font-family: Times New Roman, Times, serif; /* Especifica la fuente */
    margin: 0;
    padding: 0;
  }
  .pagina-a4 {
    width: 21cm; /* Ancho de una página A4 */
    /* width: 21cm; Ancho de una página A4 */
    height: 29.7cm; /* Altura de una página A4 */
    /* height: 29.7cm; Altura de una página A4 */
    margin: auto; /* Centrar la página horizontalmente */
    /* border: 1px solid black; Borde para simular los límites de la página */
    /* padding: 2cm; Margen interior para simular el margen de impresión */
    padding: 2cm; 
  }
  /* Estilos adicionales para el contenido */
  .contenido {
    /* Estilos para el contenido, puedes personalizar según tus necesidades */
  }
  .titulos {
  text-align: center; /* Centrar el h2 */
}
.titulos h3 {
            margin-bottom: 0; /* Eliminar el margen inferior del h2 */
        }
        .titulos p {
            margin-top: 0; /* Eliminar el margen superior del párrafo */
        }
        .lugarfecha{
          text-align: right;
        }
        .presentacion p{
          margin-bottom: 0;
          margin-top: 0;
        }
        .presentacion h4{
          margin-bottom: 0;
          margin-top: 0;
        }
        .referencia {
  text-align: right; /* Centrar el h2 */
}
.justificado {
            text-align: justify;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            /* background-color: #f2f2f2; */
        }
        .wcd p{
          margin-bottom: 0;
          margin-top: 0;
          font-size: 10px;
          
        }
        .tabulado p{
          margin-left: 30px;
        }
        .ultimapalabra p{
          margin-bottom: 0;
          margin-top: 0;
          font-size: 12px;
        }
        .titulostabla{
          margin-bottom: 0;
          margin-top: 0;
          font-weight: bold;
          font-size: 14px;
text-align: center;
        }
        .contenidotabla{
          margin-bottom: 0;
          margin-top: 0;
          font-size: 12px;
text-align: center;
        }
        .saltodelinea p{
          margin-bottom: 6.5px;
          margin-top: 6.5px;
        }
</style>
</head>
<body>
  <div class="pagina-a4">
    <div class="contenido">
      <div class="titulos">
        <h3>"${datosParaPdf.titulo}"</h3>
        <p>${datosParaPdf.encabezado}</p>
      </div>
      <p class="lugarfecha">${datosParaPdf.lugar}</p>
      <!-- <br> -->
      <div class="presentacion">
        <p>Señor:</p>
        <p>Lic. Marcelo Renzo Jimenez Cordova</p>
        <h4>GERENTE GENERAL</h4>
        <h4>BANCO UNIÓN S.A.</h4>
        <p><u>Presente.</u></p>
      </div>
      <div class="referencia">
        <p><u>Ref.- Contrato de "Fideicomiso AEVIVIENDA - Decreto Supremo No 0986 del 21 de Septiembre de 2011"</u></p>
      </div>
      <div class="justificado">
        <p >Se hace referencia al contrato de "Fideicomiso AEVIVIENDA" celebrado entre el Banco Unión S.A. (Fiduciario) y la Agencia Estatal de
          Vivienda (AEVIVIENDA) (Fideicomitente - Beneficiario), de conformidad con la Cláusula SEXTA del contrato de Fideicomiso, por
          medio de la presente y de manera expresa e irrevocable, les instruimos realizar el siguiente desembolso dirigido al:</p>
      </div>
      <div>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">DESCRIPCIÓN:</div></td>
          <td><div class="contenidotabla">PAGO DE PROGRAMAS Y/O PROYECTOS</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">UBICACIÓN:</div></td>
          <td><div class="contenidotabla">POTOSI</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">No PROCESO DE CONTRATACIÓN:</div></td>
          <td style="width: 24%;"><div class="contenidotabla">AEV-PT-PVN-08/23</div></td>
          <td style="width: 28%;"><div class="titulostabla">No UNIDADES A CONSTRUIR DEL PROYECTO</div></td>
          <td style="width: 28%;"><div class="contenidotabla">20</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">OBJETO DEL DESEMBOLSO:</div></td>
          <td><div class="contenidotabla">CONSTRUCCION - PAGO DE ANTICIPO - PROYECTO DE VIVIENDA NUEVA EN EL MUNICIPIO DE TACOBAMBA -FASE(V) 2023- POTOSI</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">MONTO DE CONTRATO EN Bs.</div></td>
          <td><div class="contenidotabla">Bs2.296.755,32</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">REPRESENTANTE LEGAL Y/O BENEFICIARIO</div></td>
          <td><div class="contenidotabla">JULIO VARGAS SANCHEZ</div></td>
        </tr>
      </table>
      <table border="1">
        <tr>
          <td style="width: 20%;" rowspan="2"><div class="titulostabla">MONTO (MONEDA NACIONAL):</div></td>
          <td style="width: 16%;"><div class="contenidotabla">NUMERAL</div></td>
          <td ><div class="contenidotabla">LITERAL</div></td>
        </tr>
        <tr>
          <td style="width: 16%;"><div class="contenidotabla">Bs321.545,75</div></td>
          <td ><div class="contenidotabla">(TRESCIENTOS VEINTIUN MIL QUINIENTOS CUARENTA Y CINCO 75/100 BOLIVIANOS)</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">RECEPTOR</div></td>
          <td style="width: 16%;"><div class="titulostabla">BANCO</div></td>
          <td style="width: 32%;"><div class="titulostabla">TITULAR</div></td>
          <td style="width: 32%;"><div class="titulostabla">No DE CUENTA</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla"></div></td>
          <td style="width: 16%;"><div class="contenidotabla">BANCO UNIÓN S.A.</div></td>
          <td style="width: 32%;"><div class="contenidotabla">CLAUDIA TORRES HURTADO</div></td>
          <td style="width: 32%;"><div class="contenidotabla">1-46419285</div></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="width: 20%;"><div class="titulostabla">MODALIDAD DE PROGRAMA Y/O PROYECTO:</div></td>
          <td><div class="titulostabla">SUBSIDIO</div></td>
        </tr>
      </table>
      
      </div>
      <div class="justificado saltodelinea">
        <p>Estos recursos deberán ser debitados de la cuenta corriente No 1-0000010347173 denominada Fideicomiso AEVIVIENDA PROYECTOS.</p>
        <p>La Agencia Estatal de Vivienda, en su calidad de Fideicomitente - Beneficiario, acepta que el monto desembolsado por efecto de la
          presente instrucción, ha sido otorgado contra el Patrimonio Autónomo construido en el Fideicomiso.</p>
        <p>Esta instrucción de desembolso es realizada y será efectuada en sujeción a la responsabilidad asumida por el Fideicomitente - Beneficiario
          prevista en el parágrafo II del artículo 12 del Decreto Supremo No.0986 y asumida en el contrato de Fideicomiso.</p>
        <p>Sin otro particular, me despido de Uds. atentamente.</p>
      </div>
      <div class="wcd">
        <p>WCD/</p>
        <div class="tabulado">

          <p>: 1 Dirección General Ejecutiva/Dirección Departamental</p>
          <p>1 Fideicomiso</p>
          <p>1 Banco Unión S.A.</p>
        </div>
      </div>
      <div class="ultimapalabra">
        <p>Borrador Generado</p>
      </div>
    </div>
  </div>
</body>
</html>

  `;

    // const htmlContent = await readFile(pathToHtmlFile, 'utf8');

    // Iniciar Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Establecer el contenido de la página con el HTML leído
    await page.setContent(htmlContent);

    // Ruta y nombre del PDF a generar
    const pdfPath = join(__dirname, '..', 'output.pdf');
    // Generar el PDF
    await page.pdf({ path: pdfPath, format: 'A4' });

    // Cerrar el navegador
    await browser.close();

    // Devolver la ruta al PDF generado
    return pdfPath;
  }

  /* async enviarInstructivo(nombrePDF: string): Promise<string> {
    const destinationPath = `/home/${this.namePc}/Documentos/`;
    const sourcePath = join(__dirname, '..', '..', 'output', nombrePDF); // Ajusta según dónde se guardan los PDFs

    try {
      // Verificar si el archivo existe
      await fs.access(sourcePath);

      // Aquí puedes agregar la lógica para "enviar" el archivo. Por ejemplo, copiarlo a una nueva ubicación:
      const newPath = join(destinationPath, nombrePDF);
      await fs.copyFile(sourcePath, newPath);

      return `Archivo enviado con éxito a: ${newPath}`;
    } catch (error) {
      throw new NotFoundException(`El archivo ${nombrePDF} no fue encontrado.`);
    }
  } */

  async downloadFile(fileName: string, res: Response): Promise<void> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;
    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(fileName),
      );

      if (matchingFiles.length === 0) {
        res.status(404).send('Error ¿Estas seguro de que se Subio el Archivo?');
        return;
      }

      const fileToDownload = matchingFiles[0];
      const filePath = `${filesDirectory}${fileToDownload}`;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${fileToDownload}`,
      );

      const fileStream = fs.createReadStream(filePath);

      fileStream.pipe(res);

      fileStream.on('end', () => {
        res.end();
      });

      fileStream.on('error', (error) => {
        console.error('Error durante la descarga del archivo:', error);
        res.status(404).send('Error durante la descarga del archivo');
      });
    } catch (error) {
      console.error('Error durante la descarga del archivo:', error);
      res.status(404).send('Error durante la descarga del archivo');
    }
  }
}
