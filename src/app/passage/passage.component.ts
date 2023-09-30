import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from '../Services/test.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Test } from '../Models/question-qcm';
import { NgModule } from '@angular/compiler/src/core';
import jsPDF from 'jspdf';
//import * as html2pdf from 'html2pdf.js';
//import * as  QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { CourseModule } from '../course/course.module';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css']
})
export class PassageComponent implements OnInit {
  qrdata!:String ;
  isQuizCompleted : boolean = false;
  listQcms: Test[]=[];
  currentEntity!:Test;
  datas :any ;
  messages!: String;
  pourcentage = 100 ;
  quitter = false ;
  isChecked  = false;
  isChecked2 = false;
  isChecked3 = false;
  isChecked4 = false;
  temps:number  =0 ;
list:number [] =[];
  listtest:any ;
  reponce!: String[];
  width!:any [];
  numqcm:number[]=[];
  form : boolean = false;
  currentIndex = 0;
  index = 1;
  
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  
  questions! : string;
  checkboxChecked = false;
  remainingTime: number = 0;
  interval$: any;
  counter = 30;
  public points: number = 0;
  url = 'http://localhost:4200/passagedestest';
  
  progress: string = "0";
    isFullScreen: boolean = false;
  constructor(private articleService :TestService , private http:HttpClient, private router:Router ,private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {
    this.reponce = ["a","b","c","d","aucune réponse"] ;
  //  document.addEventListener("keydown", this.fermerSiEchap);
  this.width=["25%","50%","75%","100%"];
  }
  openFullscreen() {

    var elem = document.documentElement;

    if (elem.requestFullscreen) {

    elem.requestFullscreen();
    } else if (elem.requestFullscreen) { /* Safari */
    elem.requestFullscreen();
    } else if (elem.requestFullscreen) { /* IE11 */
    elem.requestFullscreen();
    }
    this.isFullScreen = true;
  }
  exitFullScreen() {
   
     if (document.exitFullscreen) {
  
      this.isFullScreen = false;
    this.router.navigate(['/home']);
    document.exitFullscreen();
    }
    
  }
 getAllcours(){
  this.articleService.getAllcours().subscribe(res => {
    this.listcour = res 
  });
  console.log(this.listcour)
 }
  listcour:any;
  getAllQcms() {
    this.articleService.getAllQcms().subscribe(listQcms => {
      
   
    setInterval(() => {
    
        this.counter--;
        
        if (this.counter == 0){
          this.counter = 30;
         this.testrep1();
          this.testrep2();
         this.testrep3();
         this.testrep4();        
          this.currentEntity = this.listQcms[this.currentIndex];
          this.currentIndex++;
            this.onButtonClick();
            this.getProgressPercent();
         //   this.generatePDF()
           }
          
           if((this.counter ==1) && (this.currentIndex == this.listQcms.length-1)){
            this.showresultat2 =true;
          
           // this.router.navigateByUrl('/home');
         //  this.generatePDF();
           }
           
   }, 1000);
   
      for (let i = 0; i < listQcms.length; i++) {
 
      
     if  (this.currentIndex <= this.listQcms.length){
     
   setTimeout(() => {
  
  this.listQcms = listQcms ;
  this.currentEntity = listQcms[i];
 
  this.currentEntity = this.listQcms[this.currentIndex];
  this.questions = this.listQcms[this.currentIndex].question;
 this.currentIndex++;
 
  this.index++;
  this.getProgressPercent();
  if( (!this.isChecked && !this.isChecked2 && !this.isChecked3 && !this.isChecked4 )) {
    // alert("Aucune case à cocher n'a été cochée!");
  this.addReponce(this.reponce[4],this.listQcms[this.currentIndex-1].id_qs_qcm);
    // this.currentEntity = this.listQcms[this.currentIndex];
  
    }

  
  
 // 
    

   
 }, i * 30000);
  
     }

}

});
  }
  addReponce(reponce : any ,id_qs_qcm : any){

    this.articleService.addReponces(reponce,id_qs_qcm).subscribe(()=>{
    
   });
 
  
   }
   executeBothFunctions() {
    this.getAllQcms();
    this.openFullscreen();
    this.onClick();
    this.hideText();
    this.trainning();
   // this.getAllcours();
   // this.getstart();
  
    // this.onEscapeKey();
    }
    showButton = true;
  showText: boolean = true;
 showresultat = true ;
 showresultat2 = false ;
 hideresult(){
  this.showresultat =false ;
 }
  hideText() {
    this.showText = false;
  }

  onButtonClick() {
    this.isChecked = false;
    this.isChecked2 = false;
    this.isChecked3 = false;
    this.isChecked4 = false;
  }
  point:number = 0 ;
  getNextQcm() {
    this.testrep1();
    this.testrep2();
    this.testrep3();
    this.testrep4();
  if (this.currentIndex <= this.listQcms.length) {
   this.currentEntity = this.listQcms[this.currentIndex];
   this.currentIndex++;
    this.temps= 30-this.counter;
   this.list.push(this.temps);
   this.counter = 30;
//this.onButtonPress();
    this.getProgressPercent() ;
    this.onButtonClick();
  }
}
  getProgressPercent() {
    this.progress = ((this.currentIndex / this.listQcms.length) * 100).toString();
  
    return this.progress;
  
  }
testrep1(){
  if (this.currentEntity.rep1.iscorrect && this.isChecked){
    this.point++;
}
if (this.currentEntity.rep1.iscorrect && !this.isChecked){
  this.point+=0;
}
if (!this.currentEntity.rep1.iscorrect && !this.isChecked){
  this.point++;
}
if (!this.currentEntity.rep1.iscorrect && this.isChecked){
  this.point+=0;
}
}
testrep2(){
  if (this.currentEntity.rep2.iscorrect && this.isChecked2){
    this.point++;
}
if (this.currentEntity.rep2.iscorrect && !this.isChecked2){
  this.point+=0;
}
if (!this.currentEntity.rep2.iscorrect && !this.isChecked2){
  this.point++;
}
if (!this.currentEntity.rep2.iscorrect && this.isChecked2){
  this.point+=0;
}
}
testrep3(){
  if (this.currentEntity.rep3.iscorrect && this.isChecked3){
    this.point++;
}
if (this.currentEntity.rep3.iscorrect && !this.isChecked3){
  this.point+=0;
}
if (!this.currentEntity.rep3.iscorrect && !this.isChecked3){
  this.point++;
}
if (!this.currentEntity.rep3.iscorrect && this.isChecked3){
  this.point+=0;
}
}
testrep4(){
  if (this.currentEntity.rep4.iscorrect && this.isChecked4){
    this.point++;
}
if (this.currentEntity.rep4.iscorrect && !this.isChecked4){
  this.point+=0;
}
if (!this.currentEntity.rep4.iscorrect && !this.isChecked4){
  this.point++;
}
if (!this.currentEntity.rep4.iscorrect && this.isChecked4){
  this.point+=0;
}
}
quitterletest(){
  if (this.listQcms.length){
    this.testrep1();
    this.testrep2();
    this.testrep3();
    this.testrep4();
   this.hideresult();
   this.showresultat2 =true;
   this.getscore();
   this.temps= 30-this.counter;
 this.list.push(this.temps);
  // this.onButtonClicked();
  // this.score;
 //   this.router.navigateByUrl('/home');
 // this.generateQRCodes(this.url);
  }
}



score : number =0;
bewbew =false ;
getscore(){

  this.score =(( this.point /16)* 100 );
  if (this.score > 40){
    this.bewbew = true ;
  //  this.router.navigate(['/certif']);
  }
}
generatePDF() {
  //   let doc = new jsPDF('p', 'pt', 'letter');
 //let innerHTML = document.getElementById('id-card');
 //doc.html(document.body.innerHTML, {
 //callback: function (doc) {
 //doc.save("khouloud.pdf");
 //}
 //});
 let DATA: any = document.getElementById('id-card');
 html2canvas(DATA).then((canvas) => {
   let fileWidth = 208;
   let fileHeight = (canvas.height * fileWidth) / canvas.width;
   const FILEURI = canvas.toDataURL('image/png');
   let PDF = new jsPDF('p', 'mm', 'a4');
   let position = 0;
   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
   PDF.save('resultat.pdf');
   this.showqrcode =true ;
 
   ////this.generateQRCodes();
   
   this.showresultat=false;
   this.showresultat2=false;
   this.showButton = false;
   this.showText =false ;
 });
   }
   showqrcode : boolean= false ;
   onClick() {
    this.showButton = false;

  }
  updateChecked() {
    // Vérifiez si au moins un checkbox est coché
    this.checkboxChecked = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
  
  
    }
    trainning(){
      this.articleService.trainner().subscribe(()=>{
  
    });
    }
    ids:any;
    detec(){
      this.articleService.detectface().subscribe(res => {
        this.ids = res;
      console.log(this.ids);
      const user = this.tokenStorageService.getUser();
      console.log(user.id);
      if( this.ids !== user.id){
        alert("passer le test ")
      }
          });
    }
}
