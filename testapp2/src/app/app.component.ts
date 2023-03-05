import { Component, OnInit } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testapp2';
  labelContent = 'Ngoc Hung';

  pdfDoc: any;
  pdfSrc = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
  currentPage = 1;
  numPages = 0;

  constructor() {}

  ngOnInit() {
    this.loadPdf();
  }

  loadPdf() {
    pdfjs.getDocument(this.pdfSrc).promise.then(pdf => {
      this.pdfDoc = pdf;
      this.numPages = pdf.numPages;
      this.renderPage(this.currentPage);
    });
  }

  renderPage(pageNumber: number) {
    this.pdfDoc.getPage(pageNumber).then((page: any) => {
      const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      const viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;


      // Render PDF page on canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      page.render({
        canvasContext: context,
        viewport: viewport
      });
      // comment doan nay lai render la duoc

      // page.render(renderContext).promise.then(() => {
      //   // Draw label on canvas
      //   this.drawLabel('This is a label');
      // });
      // Add label
      const labelCanvas = document.createElement('canvas') as HTMLCanvasElement;
      labelCanvas.width = canvas.width;
      labelCanvas.height = 50;
      const labelContext = labelCanvas.getContext('2d') as CanvasRenderingContext2D;
      labelContext.font = '20px Arial';
      labelContext.fillText(this.labelContent, 10, 30);
      context.drawImage(labelCanvas, 0, 0);


      this.currentPage = pageNumber;
      
    });
  }

  // drawLabel(label: string) {
  //   const ctx = this.canvas.getContext('2d');
  //   ctx.font = '20px Arial';
  //   ctx.fillStyle = 'red';
  //   ctx.fillText(label, 10, 50);
  // }

  nextPage() {
    if (this.currentPage < this.numPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  // loadPdf(url: string) {
  //   // Sử dụng phương thức PDFJS.getDocument để tải tài liệu PDF từ URL.
  //   pdfjs.getDocument(url).promise.then(pdf => {
  //     this.pdf = pdf;
  //     this.numPages = pdf.numPages;
  //     this.currentPage = 1;
  //     this.loadPage(this.currentPage);
  //   });
  // }

  // loadPage(pageNumber: number) {
  //   this.pdf.getPage(pageNumber).then(page => {
  //     const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
  //     const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  //     const viewport = page.getViewport({ scale: 1 });
  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;
  //     page.render({
  //       canvasContext: context,
  //       viewport: viewport
  //     });
  //   });
  // }

  // nextPage() {
  //   if (this.currentPage < this.numPages) {
  //     this.currentPage++;
  //     this.loadPage(this.currentPage);
  //   }
  // }
  
  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.loadPage(this.currentPage);
  //   }
  // }
  
}
