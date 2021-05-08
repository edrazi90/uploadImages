import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export  interface ApiImage{
  _id:String;
  name:String;
  createdAt:Date;
  url:String;

}

@Injectable({
  providedIn: 'root' 
})
export class ApiService {

  
  url='http://10.25.11.20:8030/upload';

  constructor(private http:HttpClient) { }

  getImages(){
    return this.http.get<ApiImage[]>(`${this.url}/files`);
  }

  uploadImage(blobData,name,ext){
    const formData =new FormData();
    formData.append('file',blobData,`myimage.${ext}`);
    formData.append('name',name);
    
    return this.http.post(`${this.url}/uploader`,FormData);
  }

  uploadImageFile(file:File){
  const ext=file.name.split('.').pop();
  const formData=new FormData();
  formData.append('file',file,`myimage.${ext}`);
  formData.append('name',file.name);
  console.log('success');
  return this.http.post(`${this.url}/uploader`,FormData);


  }

  deleteImage(id){
  return this.http.delete(`${this.url}/files/${id}`);
  }


}
