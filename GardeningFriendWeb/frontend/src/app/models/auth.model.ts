export interface AuthResData {
    user_id?: string;
    email?: string;
    nombre?: string;
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
        public token?: string,
        public is_admin?: boolean
    ) {}
}