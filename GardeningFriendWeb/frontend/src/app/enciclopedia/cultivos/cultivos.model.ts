export interface Cultivo{
    id: number;
    nombre: string;
    imagen: string;
    tipo: string; 
    germina: number;
    cosecha: number;
    temporada: string;
    temperaturaMax: number;
    temperaturaMin: number;
    riego:string;
    luz: string;
    profundidadSembrado: number;
    espacioPlantas: number;
}