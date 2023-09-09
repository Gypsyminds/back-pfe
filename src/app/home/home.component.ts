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
  constructor(private articleService :TestService , private router:Router, private http:HttpClient) { }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

affichercourses(){
  this.router.navigate(['/course']);
}
   
}

