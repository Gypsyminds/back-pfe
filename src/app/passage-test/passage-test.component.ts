import {Component, ElementRef,OnInit ,HostListener, ViewChild ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../Models/question-qcm';
import { TestService } from '../Services/test.service';
import { Certification } from '../Models/cerification';
import { HttpClient } from '@angular/common/http';
//import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';
//import * as html2pdf from 'html2pdf.js';
//import * as  QRCode from 'qrcode';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-passage-test',
  templateUrl: './passage-test.component.html',
  styleUrls: ['./passage-test.component.scss']
})
export class PassageTestComponent implements OnInit{
  qrdata!:String ;
isQuizCompleted : boolean = false;
listQcms: Test[]=[];
datas :any ;
messages!: String;
pourcentage = 100 ;
quitter = false ;
isChecked  = false;
isChecked2 = false;
isChecked3 = false;
isChecked4 = false;
currentEntity!:Test;
certification: Certification[]=[];
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

@ViewChild('myDiv') myDiv!: ElementRef ;
progress: string = "0";
  isFullScreen: boolean = false;
  constructor(private articleService :TestService , private router:Router, private http:HttpClient) {
  
  }

	ngOnInit(): void {
		this.reponce = ["a","b","c","d","aucune réponse"] ;
  //  document.addEventListener("keydown", this.fermerSiEchap);
  this.width=["25%","50%","75%","100%"];
 // this.startCounter();
 //this.generateQRCode(this.url);
	}
  point:number = 0 ;
  POINTPDF = this.point.toString();

  //generatePDF() {
  //  const documentDefinition = {
    //  content: [
      //  {
          // Votre code HTML ici
          // Utilisez des balises HTML prises en charge par pdfmake
          // (par exemple, <h1>, <p>, <table>, etc.)
          // Vous pouvez également utiliser des styles CSS en utilisant l'attribut 'style'
          // Exemple : { text: '<h1>Titre</h1>', style: 'header' }
          // Consultez la documentation de pdfmake pour plus d'exemples et d'options.
        //}
      //]
    //};
  
 //   pdfMake.createPdf(documentDefinition).download('votre_fichier.pdf');
  //}
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
  onButtonClicked() {
    let currentPath = this.router.url; // Obtenir le chemin actuel de la page
    let newPath = currentPath + "/1"; // Ajouter 1 au chemin
    
    this.router.navigateByUrl(newPath); // Naviguer vers la nouvelle page avec le chemin modifié
  } 
  showqrcode:boolean= false;
qrCodeData!: string;
//generateQRCodes(): void {
 // const url = 'http://localhost:4200/passagedestest'; // Remplacez par l'URL de la page que vous souhaitez encoder dans le QR code

 // QRCode.toDataURL(url, (err, dataURL) => {
  //  if (err) {
   //   console.error(err);
   //   return;
  //  }

    //this.qrCodeData = dataURL;
  //});
//}

  //generateQRCode(url: string): void {
    
  
    //const qrCodeElement = document.getElementById('qrcode');
  
    //QRCode.toCanvas(qrCodeElement, url, (error) => {
      //if (error) {
        //console.error(error);
     // } else {
     //   console.log('QR code generated successfully!');
    //  }
   // });
 // }
  
 
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
  // Fonction appelée lors de l'appui sur le bouton
  startTime = 30;
  

 
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

currentQuestion: number = 0;
questionList: any = [];
scoreqcm:number = 0;



getAllQuestions() {
  this.articleService.getQuestionJson()
    .subscribe(res => {
  this.questionList = res.questions;

    });
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



getProgressPercent() {
  this.progress = ((this.currentIndex / this.listQcms.length) * 100).toString();

  return this.progress;

}



  onEscapeKey() {
  //if (this.currentIndex <= this.listQcms.length) {

  //  if(this.isChecked== false && this.isChecked2== false && this.isChecked3== false ){
   //   this.currentEntity = this.listQcms[this.currentIndex];
  //    alert("au moins");

  //  }else{

  //  this.getNextQcm();
  //
   // checkbox.checked = false;
  //  }
   // checkbox.checked = false;
   setTimeout(() => {

    //for (let i = 0; i < this.currentEntity; i++) {
    if (!this.isChecked && !this.isChecked2 && !this.isChecked3 && !this.isChecked4 ) {
    //alert("Aucune case à cocher n'a été cochée!");
     this.addReponce(this.reponce[4],this.currentEntity.id_qs_qcm);
    }
  }, 30000); // 5000ms = 5 secondes

  }



  updateChecked() {
  // Vérifiez si au moins un checkbox est coché
  this.checkboxChecked = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;


  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
  //this.quitter= true ;
  //alert("si vous quittez le plein d'écran vous quittez le test !!")
  //this.router.navigateByUrl('/home');
  
 // 
 if (this.isFullScreen) {
  this.exitFullScreen();
  this.router.navigate(['/home']);
  // Redirigez ici vers un autre composant ou effectuez une action supplémentaire.
}
  }

 
  executeBothFunctions() {
  this.getAllQcms();
  this.openFullscreen();
  this.onClick();
  this.hideText();
 // this.getstart();

  // this.onEscapeKey();
  }
  executeAlertenextTick(){
  //this.onEscapeKey(checkbox);
  this.getNextQcm();
  }
temps:number  =0 ;
list:number [] =[];
  getNextQcm() {
    this.testrep1();
    this.testrep2();
    this.testrep3();
    this.testrep4();
  if (this.currentIndex <= this.listQcms.length) {
   this.currentEntity = this.listQcms[this.currentIndex];
   this.currentIndex++;
   this.temps= this.counter;
   this.list.push(this.temps);
   this.counter = 30;
//this.onButtonPress();
    this.getProgressPercent() ;
    this.onButtonClick();
  }
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
  
  onClick() {
    this.showButton = false;

  }
  showpourcentage = true;
  onpourcentage(){

  }
  onButtonClick() {
    this.isChecked = false;
    this.isChecked2 = false;
    this.isChecked3 = false;
    this.isChecked4 = false;
  }
  ONnEXT(){
    this.getNextQcm();
    this.onButtonClick();
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
     this.temps= this.counter;
   this.list.push(this.temps);
    // this.onButtonClicked();
    // this.score;
   //   this.router.navigateByUrl('/home');
   // this.generateQRCodes(this.url);
    }
  }






  addReponce(reponce : any ,id_qs_qcm : any){

   this.articleService.addReponces(reponce,id_qs_qcm).subscribe(()=>{
   
  });

 
  }
addpdfs(reponse: any,id_qs_qcm:any){
  this.articleService.addpdf(reponse,id_qs_qcm).subscribe(() =>{

  });

}




}
