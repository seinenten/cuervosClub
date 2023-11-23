import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'cursos',
    id: string
  ) {


    try {

      const url = `${baseUrl}/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }


    } catch (error) {
      console.error(error);
      return false;
    }

  }




}
