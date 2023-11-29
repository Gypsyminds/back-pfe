import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CourseModule } from '../course/course.module';
import { TestService } from '../Services/test.service';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { TokenStorageService } from '../Services/token-storage.service';
import jsPDF from 'jspdf';
//import * as html2pdf from 'html2pdf.js';
//import * as  QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { Certification } from '../Models/cerification';
import { Observable } from 'rxjs';
import { FileModule } from '../Models/file.module';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  affform :Boolean=false ;
  affcours:boolean= false;
certification!:Certification;
  cour !:CourseModule ;
  imgfile: any; username?: string;
  id?:any;
  mail?:any; 
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;imageData:any;
  ajcertif:boolean = false;
  constructor(private test:TestService,private http: HttpClient,private router:Router,private tokenStorageService: TokenStorageService,private userService: UserService) { 
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.id = user.id ;
      this.mail = user.email;
      console.log(user)

     this.http.get('http://localhost:8086/cour/imgs/' + this.id, { responseType: 'arraybuffer' }).subscribe((data) => {
      const reader = new FileReader();
       reader.onload = () => {
         this.imageData = 'data:image/jpeg;base64,' + btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        };
       reader.readAsArrayBuffer(new Blob([data]));
      });
    }
   this.affnubcours();
   this.affuser();this.affprof();this.affcertif();this.afftests();
   this.cour={
    id_course : null ,
    courstitel :null ,
    description: null,
    prix: null,
    duree: null,
    niveaux : null,
    module : null,
    langue : null ,
    lien_youtube :null,
    filepdf :null ,
    imagecour :null,
   };
   this.certification={
    id_certif : null,
    certif_title :null,
   description :null,
   score :null,
   nomuser :null,
   }
   this.getAllcours();this.getusers();

   
  }
 getpagecertif(){
  this.router.navigate(['/pp']);
 }
  affcertifs(){
    this.ajcertif = true;
this.interprof= false;
this.afuer = false;
this.affcours = false;
this.ajoutcour = false;

  }
  ajoutcour:boolean=false;
  ajoutercour(c :any){
    this.test.addcour(this.cour).subscribe(()=>{
   // this.affform = false;
   // this.ajoutcour= true;
    });
  
  }
  ajoutercertif( cd:any){
    this.test.addCertif(this.certification).subscribe(() =>{

    });
  }
  afficherform(){
    this.affform =true; 
  }
  listusers:any ;
  getusers(){
    this.test.getallusers().subscribe(res =>{
      this.listusers =res 
    });
  }
  profs:any ;
  getprofs(){
    this.test.getAllprof().subscribe(res => {
    this.profs = res;
    this.interprof = true;
    this.ajoutcour=false; 
    this.affcours=false
    this.afuer=false;
    this.ajcertif= false;

    });
  }
  getAllcours(){
    this.test.getAllcours().subscribe(res => {
      this.listcour = res 
    });
   
   }
   certif:any; download:boolean=false;
  getCertif(){
    this.test.getCertif().subscribe(res => {
    this.certif = res;
    this.download = true;
    this.ajcertif = false;
    this.interprof= false;
    this.afuer = false;
    this.affcours = false;
    this.ajoutcour = false;
    });
  }
   nbrcour!:number;
    listcour:any;
    affnubcours():void{
      this.http.get<number>('http://localhost:8086/cour/nubrcour').subscribe(data=>{
      this.nbrcour = data ;
      });
    }

    nbruser!:number;
    affuser():void{
      this.http.get<number>('http://localhost:8086/cour/nbrusers').subscribe(data => {
        this.nbruser = data ;
      });
    }
    nbrprof!:number;
    affprof():void{
this.http.get<number>('http://localhost:8086/cour/nbrprof').subscribe(data => {
  this.nbrprof = data ;
});
    }
    nbrcertif!:number ;
    affcertif():void{
      this.http.get<number>('http://localhost:8086/cour/nbrcertif').subscribe(data => {
this.nbrcertif = data ;
      })
    }
    nbrtest!:number ;
    afftests():void{
      this.http.get<number>('http://localhost:8086/cour/nbrtest').subscribe(data => {
this.nbrtest = data ;
      })
    
    }
    uploadfile(){
      this.test.addfile().subscribe(()=>{
       });
    }
    affichercours(){
      this.affcours =true;
      this.ajoutcour= false;
      this.afuer=false;
      this.interprof = false;
    }
    bothaffiche(){
      this.affichercours();
      this.getAllcours();
      this.ajcertif = false;
    }
    exitlist(){
      this.affcours=false;
    }
    exitform(){
      this.affform=false;
    
    }
    iconcours:boolean=false;
    iconcour(){
      this.ajoutcour=true; 
      this.affcours=false
      this.afuer=false;
      this.interprof = false;
    }
    interprof:boolean=false;
    affprofs(){
      this.interprof=false;

    }
    exitcour(){
      this.iconcours = false;
    }
    afuer:boolean=false;
    afficheruser(){
    this.afuer=true;
    this.affcours =false;
    this.ajoutcour= false;
    this.interprof = false;
    }
    bothex(){
      this.getusers();
      this.afficheruser();
      this.ajcertif= false;
    }
    exitusr(){
      this.afuer=false;
      this.affcours=false;

    }
    affhome(){
      this.router.navigate(['/home']);
    }
    public selectedFile:any;
    public event1:any;
    imgURL: any;
    receivedImageData: any;
    base64Data: any;
    convertedImage: any;
  
    public  onFileChanged(event:any) {
      console.log(event);
      this.selectedFile = event.target.files[0];
  
      // Below part is used to display the selected image
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.imgURL = reader.result;
    };
  
   }
    onUpload() {


      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    
    
      this.http.post('http://localhost:8086/qcm/uploads', uploadData)
      .subscribe(
                   res => {console.log(res);
                           this.receivedImageData = res;
                           this.base64Data = this.receivedImageData.pic;
                           this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                   err => console.log('Error Occured duringng saving: ' + err)
                );
  
     }
     pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const data: FormData = new FormData();
  
      data.append('file', file);
  
      const newRequest = new HttpRequest('POST', 'http://localhost:8086/qcm/upload', data, {
        reportProgress: true,
        responseType: 'text'
      });
  
      return this.http.request(newRequest);
    }
    file!:FileModule;
    up(){
      this.http.post('http://localhost:8086/api/pdf/uploads',this.file).subscribe(res=>{

      })
    }
    uploadFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile as Blob);
    
      this.http.post('http://localhost:8086/api/pdf/uploads', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
     generatePDF() {
      //   let doc = new jsPDF('p', 'pt', 'letter');
     //let innerHTML = document.getElementById('id-card');
     //doc.html(document.body.innerHTML, {
     //callback: function (doc) {
     //doc.save("khouloud.pdf");
     //}
     //});
     let DATA: any = document.getElementById('id-card');
     html2canvas(DATA).then((canvas) => {
       let fileWidth = 208;
       let fileHeight = (canvas.height * fileWidth) / canvas.width;
       const FILEURI = canvas.toDataURL('image/png');
       let PDF = new jsPDF('p', 'mm', 'a4');
       let position = 0;
       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
       PDF.save('resultat.pdf');
     
     });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  message:any;
  onUploadimg() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:8086/api/pdf/uploaduser', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  
  
  }
}
