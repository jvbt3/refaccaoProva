import { Controller, 
  Get, Post, Body, Patch, Param, Delete,
  UseGuards, 
  HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ValidationPipe } from 'src/pipe/pipe.validation';
import { AuthGuard } from 'src/auth/auth.guards';
import { ForbiddenException } from 'src/exception/forbidden.exception';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  
  @Post()
  create(@Body( new ValidationPipe()) createUsuarioDto: CreateUsuarioDto) {
    try {
      return this.usuarioService.create(createUsuarioDto);
    } catch (error) {
      throw new ForbiddenException() //Exception Criada
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    try {
      return this.usuarioService.findAll();
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not found',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
    
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usuarioService.findOne(id);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not found',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
    
  }

  @Get('/nome/:nome')
  findName(@Param('nome') nome: string) {
    return this.usuarioService.findName(nome);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return this.usuarioService.update(id, createUsuarioDto);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not found',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
      
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usuarioService.remove(id);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not found',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
    
  }
}
