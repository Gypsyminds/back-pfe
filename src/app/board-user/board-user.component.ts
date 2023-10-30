import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CourseModule } from '../course/course.module';
import { TestService } from '../Services/test.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { TokenStorageService } from '../Services/token-storage.service';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  affform :Boolean=false ;
  affcours:boolean= false;

 cour !:CourseModule ;
  imgfile: any; username?: string;
  id?:any;
  mail?:any; 
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
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
   this.getAllcours();this.getusers();

   
  }
  ajoutcour:boolean=false;
  ajoutercour(c :any){
    this.test.addcour(this.cour).subscribe(()=>{
   // this.affform = false;
   // this.ajoutcour= true;
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
    });
  }
  getAllcours(){
    this.test.getAllcours().subscribe(res => {
      this.listcour = res 
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
    
    
      this.http.post('http://localhost:8086/api/pdf/upload', uploadData)
      .subscribe(
                   res => {console.log(res);
                           this.receivedImageData = res;
                           this.base64Data = this.receivedImageData.pic;
                           this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                   err => console.log('Error Occured duringng saving: ' + err)
                );
    
    
     }

   
}
