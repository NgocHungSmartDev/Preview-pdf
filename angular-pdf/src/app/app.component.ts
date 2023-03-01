import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FileUploadService } from './service/FileUploadService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pdf';
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;
  
  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }

  }
}

  // onUpload(): void {
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);
  //   this.http.post('http://localhost:8080/upload', formData).subscribe(
  //     () => {
  //       console.log('Upload success');
  //     },
  //     error => {
  //       console.log('Upload error:', error);
  //     }
  //   );
  // }
// }
