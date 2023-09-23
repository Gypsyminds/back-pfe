import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CourseModule } from '../course/course.module';
import { TestService } from '../Services/test.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  imgfile: any;
  constructor(private userService: UserService,private test:TestService,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
   this.affnubcours();
   this.affuser();this.affprof();this.affcertif();this.afftests();
  }
  ajoutercour(c :any){
    this.test.addcour(this.cour).subscribe(()=>{
     this.affform = false;
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
      this.iconcours=true; 
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

    }
    bothex(){
      this.getusers();
      this.afficheruser();
    }
    exitusr(){
      this.afuer=false;
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
