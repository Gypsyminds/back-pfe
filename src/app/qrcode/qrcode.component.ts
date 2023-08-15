import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TestService } from '../Services/test.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PassageTestComponent } from '../passage-test/passage-test.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
 
})

export class QrcodeComponent {
public instance :PassageTestComponent;
  constructor(private articleService :TestService , private router:Router, private http:HttpClient){
    this.instance = new PassageTestComponent(articleService  ,  router,  http);}
	ngOnInit(): void {
//this.getPdf();
	}



  //componentAInstance : PassageTestComponent = new PassageTestComponent();
  pdfUrl!: string;


  qrCodeUrl:any;
text!: string;
qrcode!: string;
generateQRCode() {
  this.http.get('http://localhost:8086/qcm/qrcode', { responseType: 'blob', params: { text: this.text } })
    .subscribe((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.qrcode = reader.result as string;
      };
    });
}
  getPdfUrl() {
    const apiUrl = 'http://localhost:8086/api/pdf'; // Remplacez l'URL par l'URL de votre API Spring Boot
    const headers = new HttpHeaders({ 'Accept': 'application/pdf' });

    this.http.get(apiUrl, { headers, responseType: 'blob' })
      .subscribe((response: Blob) => {
        this.pdfUrl = URL.createObjectURL(response);
      });
  }

  addReponce(reponce : any ,id_qs_qcm : any){

    this.articleService.addReponces(reponce,id_qs_qcm).subscribe(()=>{
    
   });
 
}

}