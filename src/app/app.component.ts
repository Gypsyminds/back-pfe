import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  email :any;
  nom: boolean = false;
  constructor(private tokenStorageService: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
       this.email = user.email ;
       
      if(this.email ==="khouloud.laajili@esprit.tn"){
       this.router.navigateByUrl('/home');
       this.nom = true
      }
      
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  navigatesignup(){
    this.router.navigate(['/register']);
  }
  basculerversadmin(){
    
      }
}
