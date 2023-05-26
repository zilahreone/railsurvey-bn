import { applyDecorators, HttpException, HttpStatus, UnsupportedMediaTypeException, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

export function UploadFiles(
  fieldName: string = 'file',
  maxCount: number = 3,
  localOptions: MulterOptions = {
    limits: {
      fileSize: 5 * 1024 * 2014
    },
    fileFilter: (req: any, file: any, cb: any) => {
      // console.log(file.mimetype);
      if (file.mimetype.split('\/')[0] === 'image' && ['png', 'jpeg'].includes(file.mimetype.split('\/')[1])) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new UnsupportedMediaTypeException(`Unsupported file type ${extname(file.originalname)}`))
        // cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    },
    storage: diskStorage({
      // destination: './uploads_file',
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = `./${process.env.UPLOAD_DIR}`;
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      filename: (req: any, file: any, cb: any) => {
        // const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + extname(file.originalname)
        // console.log(file);
        // console.log(randomName);
        // console.log(extname(file.originalname));
        cb(null, file.originalname)
      },
    })
  }
  // size: number = 5 * 1024 * 2014,
  // dir: string = './uploads'
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions))
  )
}