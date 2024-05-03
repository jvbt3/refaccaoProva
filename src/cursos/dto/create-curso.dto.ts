import { IsString, IsNumber, IsArray } from "class-validator";

export class CreateCursoDto {

    @IsString()
    nome: string

    @IsNumber()
    valor: number

    @IsNumber()
    duracao: number

    @IsArray()
    alunos: string
}
