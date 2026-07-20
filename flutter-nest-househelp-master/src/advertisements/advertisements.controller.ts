import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
const multer = require('multer');
const path = require('path');
const diskStorage = multer.diskStorage;
const extname = path.extname;
import * as fs from 'fs';
import { AdvertisementsService } from './advertisements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Get('active')
  async getActive() {
    const ad = await this.advertisementsService.getActive();
    return { status: 'success', data: ad };
  }

  @Get('settings')
  @UseGuards(JwtAuthGuard)
  async getSettings() {
    const isEnabled = await this.advertisementsService.getAdsEnabled();
    return { status: 'success', data: { adsEnabled: isEnabled } };
  }

  @Post('settings')
  @UseGuards(JwtAuthGuard)
  async updateSettings(@Body('adsEnabled') adsEnabled: boolean) {
    await this.advertisementsService.setAdsEnabled(adsEnabled);
    return { status: 'success', message: 'Settings updated successfully' };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const ads = await this.advertisementsService.getAll();
    return { status: 'success', data: ads };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: any) {
    const ad = await this.advertisementsService.create(body);
    return { status: 'success', data: ad };
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './uploads';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req: any, file: any, cb: any) => {
        if (!file.mimetype.match(/\/(mp4|mpeg|quicktime|webm)$/)) {
          return cb(new Error('Only video files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
      },
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new Error('File upload failed');
    }
    const url = `/uploads/${file.filename}`;
    return { status: 'success', data: { url } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const ad = await this.advertisementsService.update(id, body);
    return { status: 'success', data: ad };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.advertisementsService.delete(id);
    return { status: 'success', message: 'Advertisement deleted successfully' };
  }
}
