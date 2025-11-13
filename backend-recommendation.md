# Configuración recomendada para tu backend NestJS

## 1. Habilitar CORS

En tu archivo `main.ts`, agrega la configuración de CORS:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });

  // Habilitar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
```

## 2. Variables de entorno (.env)

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## 3. Verificar endpoint de login

Tu endpoint `/auth/login` debe:
- Aceptar `{ email: string, password: string }`
- Retornar:
```typescript
{
  accessToken: string;
  refreshToken: string;
  user: {
    userId: string;
    email: string;
    name: string;
    lastname: string;
    role: {
      roleId: string;
      roleName: string;
    }
  }
}
```

## 4. Endpoint de refresh

Tu endpoint `/auth/refresh` debe:
- Aceptar `{ refreshToken: string }`
- Retornar `{ accessToken: string }`
