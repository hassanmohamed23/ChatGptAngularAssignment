import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor(private http: HttpClient) { }



  GetMessages(message:string): Observable<any> {
    const url = 'https://localhost:44310/api/ChatGpt?message=' +message;
    return this.http.get(url);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post('https://localhost:44310/api/ChatGpt/upload', formData);
  }



}
