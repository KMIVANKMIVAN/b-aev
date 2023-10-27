import { Injectable } from '@nestjs/common';  
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class DocumentpdfService {
  private readonly pdfsDirectory = '/home/vancc369/Documentos';

  async processUploadedFile(file: Express.Multer.File): Promise<void> {
    try {
      // Define the destination file path
      const destinationPath = join(this.pdfsDirectory, file.originalname);

      // Create a readable stream from the uploaded file
      const readStream = createReadStream(file.path);

      // Create or overwrite the file in the specified directory
      const writeStream = createWriteStream(destinationPath);

      // Pipe the data from the read stream to the write stream
      readStream.pipe(writeStream);

      // Close the streams to release resources
      readStream.close();
      writeStream.close();

      // Optionally, you can save the file path in a database or return some response

      // You may also want to handle errors, perform validation, and return appropriate responses.
    } catch (error) {
      // Handle errors, such as file write errors or validation errors
      // You can throw exceptions or return appropriate responses as needed.
      throw error;
    }
  }
}
