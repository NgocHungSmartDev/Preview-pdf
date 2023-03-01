import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pdf';
  selectedFile!: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post('http://localhost:8080/upload', formData).subscribe(
      () => {
        console.log('Upload success');
      },
      error => {
        console.log('Upload error:', error);
      }
    );
  }
}
