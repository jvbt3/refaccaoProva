import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private usuarioService : UsuarioService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findName(username);
    const isMath = await bcrypt.compare(pass, user.password)
    if (!isMath) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}