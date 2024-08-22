import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
    private serverUrl = process.env.SERVER_URL || 'http://localhost:8001'; // Variável de ambiente para a URL do servidor

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const uploadPath = path.join(__dirname, '..', '..', 'public', 'uploads');
        const fileName = `${uuidv4()}-${file.originalname}`;
        const filePath = path.join(uploadPath, fileName);

        // Cria o diretório se não existir
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Salva o arquivo
        fs.writeFileSync(filePath, file.buffer);

        // Retorna a URL pública para acessar o arquivo
        const fileUrl = `${this.serverUrl}/public/uploads/${fileName}`;
        return fileUrl;
    }

    async deleteImage(imagePath: string): Promise<void> {
        const fullPath = path.join(__dirname, '..', '..', 'public', 'uploads', path.basename(imagePath));
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
}
