import { Component, OnInit } from '@angular/core';
import { TestService } from '../Services/test.service';
import { CourseModule } from '../course/course.module';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  listArticle : any;
list !:CourseModule;
affdescription:boolean=false;
desaffcour:boolean =false;
listcour:any;
cours :any;
affforminscri:boolean=false ;
url="assets/1223.pdf";
allUsers: number = 0;
pagination: number = 0;
  constructor(private articleService :TestService, private http:HttpClient) { }
 

  ngOnInit(): void {
    this.getAllcours();
   // this.getCourbyId(this.list.id_course);
 this.getAllfiles();
 // this.loadPdf(list.id_course);
 }
  
 
  getAllArticles(){
    this.articleService.getAllcours().subscribe(res => this.listArticle= res);
   console.log(this.listArticle.prix);
  }
  getAllcours(){
    
    this.articleService.getAllcours().subscribe(res => {
      this.listcour = res ;
      this.desaffcour = true ;
    
    });
    console.log(this.listcour)
   }
  files:any;
   getAllfiles(){
    this.articleService.getfiles().subscribe(res => {
      this.files = res ;
    // this.desaffcour = true ;
    });
 //   console.log(this.listcour)
   }
  
   
    getCourbyId(id:any){
      this.articleService.getcour(id).subscribe(res =>{
this.cours = res;
this.affdescription =true ;
this.desaffcour = false;
      });
    }
   
    onclick(){
      this.affforminscri = true ;
      this.affdescription = false;
     // this.desaffcour = false;
    }
    
  loadPdf(id:any) {
   // const pdfId = 2; // Remplacez par l'ID du PDF que vous souhaitez afficher
    this.http.get('http://localhost:8086/api/pdf/' + id, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}
