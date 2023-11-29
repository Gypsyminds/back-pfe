import { Component, OnInit } from '@angular/core';
import { TestService } from '../Services/test.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showcour:boolean = false;
  constructor(private articleService :TestService , private router:Router, private http:HttpClient) { }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

affichercourses(){
  
}
getAllcours(){
 // this.router.navigate(['/courses']);
 this.showcour=true;
  this.articleService.getAllcours().subscribe(res => {
    this.listcour = res 
  });
 
 }
  listcour:any;
  affichercour(){
    this.router.navigate(['/courses']);
  }
}

