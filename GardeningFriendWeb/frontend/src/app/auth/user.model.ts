export interface User {
    id: number;
    username:string;
    name: string;
    email: string;
    birth_date:string;
    password:string;
    is_admin: boolean;
    token?: string;
    // // Agregar las propiedades necesarias
}  