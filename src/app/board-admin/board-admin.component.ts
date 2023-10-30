import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../Services/token-storage.service';
import { Router } from '@angular/router';
import { TestService } from '../Services/test.service';

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
    this.getAllcours();
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

}
