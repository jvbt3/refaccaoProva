import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { ForbiddenException } from 'src/exception/forbidden.exception';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body( new ValidationPipe()) createCursoDto: CreateCursoDto) {
    try {
      return this.cursosService.create(createCursoDto);
    } catch (error) {
      throw new ForbiddenException() //Exception criada
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    try {
      return this.cursosService.findAll();
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
      return this.cursosService.findOne(id);
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
  @Patch(':id')
  update(@Param('id') id: string, @Body() createCursoDto: CreateCursoDto) { 
      return this.cursosService.update(id, createCursoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.cursosService.remove(id);
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
