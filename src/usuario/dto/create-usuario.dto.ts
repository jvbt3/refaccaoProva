import { IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    nome: string

    @IsString()
    sobrenome: string

    @IsString()
    email: string

    @IsString()
    password: string
}
