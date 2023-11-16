import { environment } from "src/environments/environment"
import { Pregunta } from "./preguntas.models";


const baseUrl = environment.base_url;

export class Usuario {

    constructor(
        public nombre:  string ,
        public apellidoP:  string ,
        public apellidoM:  string ,
        public email:  string ,
        public password?: string,
        public img?: string,
        public google?:  boolean ,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE' ,
        public status?: boolean  ,
        public respuesta?: string,
        public pregunta?: Pregunta,
        public uid?: string  ,


    ) {}

    get imagenUrl(){
        ///upload/equipos/no-image
        if( !this.img ){
            return `${baseUrl}/upload/usuarios/no-img-usuario`;
        } else if( this.img?.includes('https') ){
            return this.img;
        } else if( this.img ){
            return `${baseUrl}/upload/usuarios/${ this.img }`;
        }else{
            //Checar si la extension de la imagen esta bien puesta en el backend
            return `${baseUrl}/upload/usuarios/no-img-usuario`;
        }
    }

}
