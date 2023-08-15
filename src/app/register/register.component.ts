import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TestService } from '../Services/test.service';

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
    birth_date: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,private articleService :TestService ) { }

  ngOnInit(): void {
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
}
