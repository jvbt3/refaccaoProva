import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schema/usuario.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsuarioService {

  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.password = await this.userHash(createUsuarioDto.password)
    return this.usuarioModel.create(createUsuarioDto);
  }

  findAll() {
    return this.usuarioModel.find().select('-password');
  }

  findOne(id: string) {
    return this.usuarioModel.findOne({_id: id}).select('-password');;
  }

  findName(nome: string) {
    return this.usuarioModel.findOne({nome: nome});
  }

  update(id: string, createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioModel.updateOne({_id: id}, createUsuarioDto);
  }

  remove(id: string) {
    return this.usuarioModel.deleteOne({_id: id})
  }

  private async userHash(pass) {
    const saltOrRound = 10
    const passHashed = bcrypt.hash(pass, saltOrRound)
    return passHashed
  }

}
