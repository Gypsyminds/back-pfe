import {Component, ElementRef,OnInit ,HostListener, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../Models/question-qcm';
import { TestService } from '../Services/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
	listQcms: Test[]=[];
	isChecked  = false;
	isChecked2 = false;
	isChecked3 = false;
	currentEntity!:Test;
   reponce!: String[];

	form : boolean = false;
	currentIndex = 0;
	displayedUser = this.listQcms[this.currentIndex];
	closeResult! : string;
	checkboxChecked = false;
	//reponces : ReponseQcm = new ReponseQcm();


	constructor(private articleService :TestService , private modalService: NgbModal,private elementRef: ElementRef, private router:Router,public authService: AuthService) {}
	ngOnInit(): void {
		this.reponce = ["a","b","c","aucune réponce"] ;
	}
	onButtonClicked() {
		// Code à ajouter ici pour effectuer une action avant la navigation
		this.router.navigateByUrl('/passagedestest');
	  }



}



