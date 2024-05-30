export interface Productos {
    // main info
    name: string,
    id:string,
    default_price: string,
    description: string,
    images: Array<string>,
    //metadata
    metadata: medatadata,
    visibilidad: boolean
}

export interface medatadata{
    categoria: string,
    stock: number,
    peso: string,
    dimensiones : string,
    precio: number,
}