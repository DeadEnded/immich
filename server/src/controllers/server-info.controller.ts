import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/dtos/auth.dto';
import {
  ServerConfigDto,
  ServerFeaturesDto,
  ServerInfoResponseDto,
  ServerMediaTypesResponseDto,
  ServerPingResponse,
  ServerStatsResponseDto,
  ServerThemeDto,
  ServerVersionResponseDto,
} from 'src/dtos/server-info.dto';
import { Authenticated } from 'src/middleware/auth.guard';
import { ServerInfoService } from 'src/services/server-info.service';

@ApiTags('Server Info')
@Controller('server-info')
export class ServerInfoController {
  constructor(private service: ServerInfoService) {}

  @Get()
  @Authenticated(Permission.SERVER_READ)
  getServerInfo(): Promise<ServerInfoResponseDto> {
    return this.service.getInfo();
  }

  @Get('ping')
  pingServer(): ServerPingResponse {
    return this.service.ping();
  }

  @Get('version')
  getServerVersion(): ServerVersionResponseDto {
    return this.service.getVersion();
  }

  @Get('features')
  getServerFeatures(): Promise<ServerFeaturesDto> {
    return this.service.getFeatures();
  }

  @Get('theme')
  getTheme(): Promise<ServerThemeDto> {
    return this.service.getTheme();
  }

  @Get('config')
  getServerConfig(): Promise<ServerConfigDto> {
    return this.service.getConfig();
  }

  @Get('statistics')
  @Authenticated(Permission.SERVER_READ)
  getServerStatistics(): Promise<ServerStatsResponseDto> {
    return this.service.getStatistics();
  }

  @Get('media-types')
  getSupportedMediaTypes(): ServerMediaTypesResponseDto {
    return this.service.getSupportedMediaTypes();
  }

  @Post('admin-onboarding')
  @Authenticated(Permission.SERVER_SETUP)
  @HttpCode(HttpStatus.NO_CONTENT)
  setAdminOnboarding(): Promise<void> {
    return this.service.setAdminOnboarding();
  }
}
