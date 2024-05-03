import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cursos, CursosSchema } from './schema/curso.schema';
import { Usuario, UsuarioSchema } from 'src/usuario/schema/usuario.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cursos.name, schema: CursosSchema }, { name: Usuario.name, schema: UsuarioSchema }])],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule { }
