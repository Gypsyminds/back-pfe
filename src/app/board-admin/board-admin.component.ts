import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../Services/token-storage.service';
import { Router } from '@angular/router';
import { TestService } from '../Services/test.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  id?:any;
  mail?:any;countrys?:any;
  imageData: any;image:any;

  constructor(private userService: UserService, private http:HttpClient,private articleService :TestService,private tokenStorageService: TokenStorageService, private router:Router) { }

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
      this.countrys = user.country;
      
      //console.log(imageData)
      this.getImage();
    }
    //this.getCourbyId(this.id);
    this.getAllcours();
  //  this.loadPdf(this.id);
  // Remplacez par l'ID de l'image que vous souhaitez afficher
    this.http.get('http://localhost:8086/cour/imgs/' + this.id, { responseType: 'arraybuffer' }).subscribe((data) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = 'data:image/jpeg;base64,' + btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      };
      reader.readAsArrayBuffer(new Blob([data]));
    });
    this.trainning();
  }
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.http.get('http://localhost:8086/cour/get/' + this.id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  cours :any;
  getCourbyId(id:any){
  this.articleService.getcour(id).subscribe(res =>{
this.cours = res ;
console.log(this.cours);
this.articleService.sharedValue=this.cours.id_course;
this.articleService.test =this.cours.courstitel;
this.articleService.image =this.cours.imagecour;
this.router.navigate(['/refaice']);
    });
  }
  listcours:any;
  getAllcours(){
    
    this.articleService.couradmin(this.id).subscribe(res => {
    
    this.listcours = res;
//    res = this.articleService.sharedValue;
    });
   
   }
   setValue() {
    this.articleService.sharedValue = this.listcours.id_cour;
  }
  basculer(){
  //  this.setValue();
  this.getCourbyId(this.cours.id_cour);
    this.router.navigate(['/passage']);
  }
 //Make a call to Sprinf Boot to get the Image Bytes.
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  loadPdf(id:any) {
    // const pdfId = 2; // Remplacez par l'ID du PDF que vous souhaitez afficher
     this.http.get('http://localhost:8086/cour/img/' + id)
       .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64' + this.base64Data;
     
        }
      );
   }
   trainning(){
    this.articleService.trainner().subscribe(()=>{

  });
  }
}

