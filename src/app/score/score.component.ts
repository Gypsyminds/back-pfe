import { Component } from '@angular/core';
import { TestService } from '../Services/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Certification } from '../Models/cerification';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  client!: Certification;
  data:any;
  datas:any;
  constructor(private articleService :TestService , private http:HttpClient, private router:Router) {
    
  }

	ngOnInit(): void {

   
	}
  getscores(){
    this.http.get('http://localhost:8086/qcm/score/1').subscribe(res => this.data = res)
  }
  getscore(){
    this.http.get('http://localhost:8086/feed/showal/1').subscribe(res =>
      //res => this.datas = res)
      console.log(res)
 ) }
  execute (){
    this.getscore();
    this.getscores();
  }
}
