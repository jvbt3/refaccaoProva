import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Usuario } from 'src/usuario/schema/usuario.schema';

export type CursosDocument = HydratedDocument<Cursos>;

@Schema()
export class Cursos {
  @Prop()
  nome: string;

  @Prop()
  valor: number;

  @Prop()
  duracao: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
  alunos: string

}

export const CursosSchema = SchemaFactory.createForClass(Cursos);