export interface Usuarios {
    id: string;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    password: string;
    email: string;
    fecha?:Date;
    hora?:string;
    accion?:string;
}
