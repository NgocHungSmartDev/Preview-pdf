# install lib ngx-extended-pdf-viewer
  * npm install ngx-extended-pdf-viewer --save

# import AppModule
  * import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
  * imports: [ NgxExtendedPdfViewerModule ],

# apply source code
  * <ngx-extended-pdf-viewer [src]="pdfUrl" useBrowserLocale="true" height="800px"></ngx-extended-pdf-viewer>

# Note: move folder assets inside module "node_modules/ngx-extended-pdf-viewer/assets" to folder assets of app
