import { Component, Inject, OnInit } from '@angular/core';
import { TokenStorageService } from '../Services/token-storage.service';
import { AuthService } from '../Services/auth.service';
import { TestService } from '../Services/test.service';
import { CourseModule } from '../course/course.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  //cour!:CourseModule;
  
 
  
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private test:TestService,private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
  
  
  basculerversadmin(){
    if(this.form.email='laajili.khouloud@esprit.tn'){
      this.router.navigateByUrl('/user');
    }
      }
      bothfunction(){
        this.basculerversadmin();
        this.onSubmit();
      }
}
  



