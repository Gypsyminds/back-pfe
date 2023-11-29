import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TestService } from '../Services/test.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  content?: string;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  id?:any;
  mail?:any;countrys?:any;
  constructor(private userService: UserService,private articleService :TestService,private tokenStorageService: TokenStorageService, private router:Router) { }

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
      console.log(user)
    }
    //this.getCourbyId(this.id);
    this.getAllcours();this.getCertif();
   
   
}
  
  cours :any;
  getCourbyId(id:any){
  this.articleService.getcour(id).subscribe(res =>{
this.cours = res ;
console.log(this.cours);
this.articleService.sharedValue=this.cours.id_course;
this.articleService.test =this.cours.courstitel;
this.articleService.image =this.cours.imagecour;
this.router.navigate(['/passage']);
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
  @ViewChild('captureElement', { static: false }) captureElement!: ElementRef;

  capture() {
    const element = this.captureElement.nativeElement;

    html2canvas(element).then(canvas => {
      // Convert canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');

      // Trigger download
      FileSaver.saveAs(dataURL, 'html-to-image.png');
    });
  }
  certif:any; download:boolean=false;
  getCertif(){
    this.articleService.getCertif().subscribe(res => {
    this.certif = res;
    console.log(this.certif)
    });
  }
}
