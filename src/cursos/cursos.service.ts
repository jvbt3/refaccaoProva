import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cursos } from './schema/curso.schema';
import { Model } from 'mongoose';

@Injectable()
export class CursosService {

  constructor(@InjectModel(Cursos.name) private cursosModel: Model<Cursos>) {}

  create(createCursoDto: CreateCursoDto) {
    return this.cursosModel.create(createCursoDto);
  }

  findAll() {
    return this.cursosModel.find()
  }

  findOne(id: string) {
    return this.cursosModel.findOne({_id: id})
  }

  update(id: string, createCursoDto: CreateCursoDto) {
    return this.cursosModel.updateOne({_id: id}, createCursoDto);
  }

  remove(id: string) {
    return this.cursosModel.deleteOne({_id: id});
  }
}
