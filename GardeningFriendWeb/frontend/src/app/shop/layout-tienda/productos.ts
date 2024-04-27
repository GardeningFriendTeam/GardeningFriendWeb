export interface Productos {
    // main info
    name: string,
    id:string,
    default_price: string,
    description: string,
    images: Array<string>,
    visibilidad: boolean,
    precio: number,
    stock: number,
    categoria: string,
    peso: string,
    dimensiones: string,
}