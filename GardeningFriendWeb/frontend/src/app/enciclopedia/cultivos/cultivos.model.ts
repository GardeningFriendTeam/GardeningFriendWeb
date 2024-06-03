import { CategoriaCultivo } from "src/app/models/categoriaCultivo";

export interface Cultivo{
    id?: number,
    nombre: string,
    categoria: CategoriaCultivo,
    descripcion: string,
    imagen: string,
    region: string,
    estacion: string,
    temperatura: number,
    favorito: boolean,
    // usuario: number,
}