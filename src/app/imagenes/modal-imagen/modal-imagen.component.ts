import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  cameraOn = false;
  photoTaken = false;
  photoData: string = '';
  videoStream: MediaStream | undefined;


  @Output()
  public imagenSubir!: File;

  public imgTemp: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService,
  ) { }

  
  ngOnDestroy(): void {
    // Asegúrate de apagar la cámara cuando el componente se destruye (modal se cierra).
    if (this.cameraOn && this.videoStream) {
      this.cameraOn = false;
      this.photoTaken = false;
      this.photoData = '';
      const tracks = this.videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }

  cerrarModal(){
    // Verifica si la cámara está encendida y la apaga si es necesario
    if (this.cameraOn && this.videoStream) {
      this.cameraOn = false;
      this.photoTaken = false;
      this.photoData = '';
      const tracks = this.videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
  
    if (!file) {
      this.imgTemp = null;
      return;
    }
  

    // Crear una nueva imagen para obtener sus dimensiones
    const image = new Image();
    image.src = URL.createObjectURL(file);
  
    image.onload = () => {
      if (image.width === image.height) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onloadend = () => {
          this.imgTemp = reader.result;
        }
      } else {
        Swal.fire('Error', 'La imagen debe ser de un formato cuadrado', 'error');
        this.cerrarModal();
      }
    };
  }

  cambiarImagenCamara() {
    // Verifica si hay datos de foto disponibles
    if (this.photoData) {
      // Asigna los datos de la foto a imgTemp
      this.imgTemp = this.photoData;
    } else {
      this.imgTemp = null;
    }
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
        .actualizarFoto( this.imagenSubir, tipo , id )
            .then( img =>{

              if(img){
              this.modalImagenService.nuevaImagen.emit(img);

              Swal.fire('Guardado', 'Imagen actualizada', 'success');
              }
              else{


                Swal.fire('Error', 'No es una extension permitida' , 'error');

              }
              this.cerrarModal();
            }).catch( err => {
              Swal.fire('Error', err.error.msg , 'error');
            });

  }

  async startCamera() {
    try {
      this.cameraOn = true;
      this.photoTaken = false;
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.videoStream;

    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  takePhoto() {
    if (this.cameraOn && this.videoStream) {
      const video = this.videoElement.nativeElement;
      const canvas = document.createElement('canvas');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        this.photoData = canvas.toDataURL('image/png');
        this.photoTaken = true;
        this.cambiarImagenCamara();
        const blob = this.dataURItoBlob(this.photoData);
         // Genera un nombre de archivo único basado en la marca de tiempo y un valor aleatorio
        const uniqueFileName:string = `photo_${Date.now()}_${Math.floor(Math.random() * 100000)}.png`;
        const file = new File([blob], uniqueFileName);
        this.imagenSubir = file;

        // Detener la cámara
        const tracks = this.videoStream.getTracks();
        tracks.forEach((track) => track.stop());
        this.cameraOn= false;
        
      }
    }
  }
  
  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: 'image/png' });
  }


}
