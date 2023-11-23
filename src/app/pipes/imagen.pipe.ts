import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'cursos' ): string {
    
    ///upload/usuarios/no-image

    // trejo arreglar el pipe de imagenes por el tipo de usuario
    // if(tipo == 'usuarios'){

    // }else if(tipo == 'ligas'){

    // }else if(tipo == 'equipos'){

    // }else{

    // }



    if( !img ){
      return `${ baseUrl }/upload/usuarios/no-image`;
    } else if( img?.includes('https') ){
        return img;
    } else if( img ){
        return `${baseUrl}/upload/${ tipo }/${ img }`;
    }else{
        //Checar si la extension de la imagen esta bien puesta en el backend 
        return `${baseUrl}/upload/usuarios/no-image`;
    }


  }

}
