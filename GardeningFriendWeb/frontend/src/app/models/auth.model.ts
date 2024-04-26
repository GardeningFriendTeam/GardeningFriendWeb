export interface registroModel {
    email: string;
    username: string;
    name: string;
    confirmPassword: string;
    password: string;
    birth_date: string;
}

export interface AuthResData {
    user_id?: string;
    email?: string;
    nombre?: string;
    nombreusuario?: string,
    token?:string;
    is_admin?:boolean;
}

export interface loginModel {
    email: string;
    password: string;
}

export class User {
    constructor(
        public id?: string,
        public email?: string,
        public nombre?: string,
        public nombreusuario?: string,
        public token?: string,
        public is_admin?: boolean
    ) {}
}