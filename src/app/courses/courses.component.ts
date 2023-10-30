import { Component, OnInit } from '@angular/core';
import { TestService } from '../Services/test.service';
import { CourseModule } from '../course/course.module';
import { HttpClient } from '@angular/common/http';
import { InscriptionComponent } from '../inscription/inscription.component';
import { InscritcourModule } from '../inscritcour/inscritcour.module';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../Services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Condidat } from '../Models/condidat.module';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  listArticle : any;
list !:CourseModule;
user!:Condidat;
affdescription:boolean=false;
desaffcour:boolean =false;
listcour:any;
cours :any;
courss!:InscritcourModule;
affforminscri:boolean=false ;
url="assets/1223.pdf";
allUsers: number = 0;
pagination: number = 0;
p: number = 1;

content?: string;
private roles: string[] = [];
isLoggedIn = false;
showAdminBoard = false;
showModeratorBoard = false;
username?: string;
id?:any;
  constructor(private articleService :TestService, private http:HttpClient,private sanitizer: DomSanitizer, private userService: UserService,private tokenStorageService: TokenStorageService, private router:Router) { }
 

  ngOnInit(): void {
    this.getAllcours();
   // this.getCourbyId(this.list.id_course);
 this.getAllfiles();
 // this.loadPdf(list.id_course);
 this.courss = {
 idinscri :null,
 email :null,
 nom :null,
 phone :null,
 user :null,
 };
  
 //
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
  this.id = user.id;
}
}
telInputOptions = {
  initialCountry: 'us', // Pays par défaut
  separateDialCode: true, // Afficher le code de pays séparément
};
 getsafurl(url:any){
  return  this.sanitizer.bypassSecurityTrustResourceUrl(url);
 }
  getAllArticles(){
    this.articleService.getAllcours().subscribe(res => this.listArticle= res);
   console.log(this.listArticle.prix);
  }
  getAllcours(){
    
    this.articleService.getAllcours().subscribe(res => {
      this.listcour = res ;
      this.desaffcour = true ;
    
    });
    console.log(this.listcour)
   }
  files:any;
   getAllfiles(){
    this.articleService.getfiles().subscribe(res => {
      this.files = res ;
    // this.desaffcour = true ;
    });
 //   console.log(this.listcour)
   }
  
   
    getCourbyId(id:any){
      this.articleService.getcour(id).subscribe(res =>{
this.cours = res;
this.affdescription =true ;
this.desaffcour = false;
      });
    }
   
    onclick(){
      this.affforminscri = true ;
      this.affdescription = false;
     // this.desaffcour = false;
    }
    
  loadPdf(id:any) {
   // const pdfId = 2; // Remplacez par l'ID du PDF que vous souhaitez afficher
    this.http.get('http://localhost:8086/api/pdf/' + id, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
 
  addCour(cour : any ,id_cour : any, id_user:any){

    this.articleService.addinscrit(this.courss,id_cour,this.id).subscribe(()=>{
    
   });
   this.router.navigate(['/home']);
  
   }
 //id="https://www.youtube.com/embed/UjHfABPKLcc?si=fNX6kvxVCl-NKyM5";
addmail(){
this.articleService.addmailinscrit().subscribe(()=>{

})
}
bothfunction(){
  //this.addmail(this.courss.idinscri);
  this.addCour(this.courss,this.list.id_course,this.id);
}
///formulaire: FormGroup;
emailFormControl = new FormControl('', [
  Validators.required,
  Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
]);
}
