import { Component } from '@angular/core';
import * as  QRCode from 'qrcode';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-certif-html',
  templateUrl: './certif-html.component.html',
  styleUrls: ['./certif-html.component.css']
})
export class CertifHtmlComponent {
  qrCodeData!: string;
  
generateQRCodes(): void {
  const url = 'file:///C:/Users/Guide%20Info/Downloads/resultat%20(7).pdf'; // Remplacez par l'URL de la page que vous souhaitez encoder dans le QR code

  QRCode.toDataURL(url, (err, dataURL) => {
    if (err) {
      console.error(err);
      return;
    }

    this.qrCodeData = dataURL;
  });
}
}
