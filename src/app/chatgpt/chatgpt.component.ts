import { Component } from '@angular/core';
import { ChatgptService } from './chatgpt-service/chatgpt.service';
import {  ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.css'],
})
export class ChatgptComponent {
    messageHistory:any = [];
    Message:string='';
    @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public chatgpt:ChatgptService){}

    SendMessage() {

      this.chatgpt.GetMessages(this.Message).subscribe(
        (response) => {
          this.messageHistory.push({key:"user",value:this.Message})
          this.messageHistory.push({key:"system",value:response.message})
          this.Message='';
        }   
      );
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.readFileContent(file);
      this.chatgpt.uploadFile(file).subscribe(
        response => {
          this.messageHistory.push({key:"system",value:response.message});
          this.fileInput.nativeElement.value = '';
        }
      );
    }

    readFileContent(file: File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = reader.result as string;
        this.messageHistory.push({key:"user",value:fileContent});
      };
      reader.readAsText(file);
    }

}

