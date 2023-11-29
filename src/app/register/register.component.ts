import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TestService } from '../Services/test.service';
import { Router } from '@angular/router';
import { Role } from '../Models/role.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    country: null,
    birth_date: null,
 //   role: ["ROLE_USER","ROLE_Prof","ROLE_ADMIN"]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  progress: string = "0";
  user:any;
  errorMessage = '';
  showMessage: boolean = false;
  message= "Your registration is successful!";
  constructor(private authService: AuthService,private articleService :TestService ,private router:Router,private http: HttpClient) { }
role!:Set<any>;
//role!:Role;
  ngOnInit(): void {
 //   this.basculerverhomepage();
 //this.role=["ROLE_USER","ROLE_Prof"]
  }

onSubmit(): void {
    const { username, email, password ,country ,birth_date} = this.form;
    
    this.authService.register(username, email, password ,country ,birth_date).subscribe(
      data => {
        
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
       
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    //this.addimages();
    // this.basculerverhomepage();
    this.trainning();
    this.progress = '75'
}
  addimages(){
    this.articleService.addimage().subscribe(() =>{
  
    });
  
  }

  basculerverhomepage(){
   if(this.isSuccessful=true){

  alert("s'il vous plait restez correctement devant la camera pour prendre une capture de votre visage pour la vérification avant la passage de test de certification");
  setTimeout(() => {
    this.router.navigateByUrl('/home');
    }, 30000);
      
   }
  }
  
  bothfonction(){
  //  this.onSubmit();
    this.addimages();
   // this.basculerverhomepage();
   // this.trainning();
   this.progress = '75'
  
  }
trainning(){
  this.articleService.trainner().subscribe(()=> {

  });
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
 // let reader = new FileReader();
  //reader.readAsDataURL(event.target.files[0]);
  //reader.onload = (event2) => {
   // this.imgURL = reader.result;
}

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

