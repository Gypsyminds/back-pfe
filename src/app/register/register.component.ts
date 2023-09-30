import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TestService } from '../Services/test.service';
import { Router } from '@angular/router';
import { Role } from '../Models/role.enum';

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
  errorMessage = '';
  showMessage: boolean = false;
  message= "Your registration is successful!";
  constructor(private authService: AuthService,private articleService :TestService ,private router:Router) { }
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
    this.onSubmit();
    this.addimages();
   // this.basculerverhomepage();
    this.trainning();
  }
trainning(){
  this.articleService.trainner().subscribe(()=> {

  });
}
}

