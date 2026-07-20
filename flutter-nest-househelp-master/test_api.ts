import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { JwtService } from '@nestjs/jwt';
import { WorkersService } from './src/workers/workers.service';
import { UsersService } from './src/users/users.service';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const jwtService = app.get(JwtService);
  
  // Create token for worker 16
  const payload = { userId: "635092a6-e1f1-4b6f-b727-261b2fc703c6", role: "WORKER" };
  const token = jwtService.sign(payload);
  
  // Make HTTP request
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/workers/me/bookings',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  
  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      console.log('API Response:', JSON.stringify(JSON.parse(data), null, 2));
      app.close();
    });
  });
  
  req.on('error', error => {
    console.error(error);
    app.close();
  });
  
  req.end();
}
bootstrap();
