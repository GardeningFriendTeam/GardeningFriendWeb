export interface Cultivo{
    id_cultivo: number,
    nombre: string,
    categoria: string,
    descripcion: string,
    imagen: string,
    region: string,
    estacion_de_siembra: string,
    temperatura_recomendada: number,
    favorito: boolean,
    usuario: number,
}