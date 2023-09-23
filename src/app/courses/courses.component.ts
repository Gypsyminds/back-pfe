import { Component, OnInit } from '@angular/core';
import { TestService } from '../Services/test.service';
import { CourseModule } from '../course/course.module';


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
//url="assets/cc.mp4";
  constructor(private articleService :TestService) { }
 

  ngOnInit(): void {
    this.getAllcours();
   // this.getCourbyId(this.list.id_course);
 
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
}
