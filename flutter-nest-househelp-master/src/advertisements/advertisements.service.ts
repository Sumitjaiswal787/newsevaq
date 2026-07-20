import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
  ) {}

  private getSettingsPath(): string {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return path.join(dir, 'ad_settings.json');
  }

  async getAdsEnabled(): Promise<boolean> {
    try {
      const filePath = this.getSettingsPath();
      if (!fs.existsSync(filePath)) {
        return true; // Default to true
      }
      const data = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.adsEnabled !== false;
    } catch {
      return true;
    }
  }

  async setAdsEnabled(enabled: boolean): Promise<void> {
    const filePath = this.getSettingsPath();
    fs.writeFileSync(filePath, JSON.stringify({ adsEnabled: enabled }, null, 2));
  }

  async getActive(): Promise<Advertisement | null> {
    const isEnabled = await this.getAdsEnabled();
    if (!isEnabled) {
      return null;
    }
    return this.advertisementsRepository.findOne({
      where: { isActive: true },
      order: { id: 'DESC' }, // Return the newest active ad
    });
  }

  async getAll(): Promise<Advertisement[]> {
    return this.advertisementsRepository.find({
      order: { id: 'DESC' },
    });
  }

  async create(data: Partial<Advertisement>): Promise<Advertisement> {
    const ad = this.advertisementsRepository.create(data);
    return this.advertisementsRepository.save(ad);
  }

  async update(id: number, data: Partial<Advertisement>): Promise<Advertisement> {
    const ad = await this.advertisementsRepository.findOne({ where: { id } });
    if (!ad) {
      throw new NotFoundException(`Advertisement with ID ${id} not found`);
    }
    Object.assign(ad, data);
    return this.advertisementsRepository.save(ad);
  }

  async delete(id: number): Promise<void> {
    const result = await this.advertisementsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Advertisement with ID ${id} not found`);
    }
  }
}
