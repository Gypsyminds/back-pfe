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

  constructor(private articleService :TestService) { }

  ngOnInit(): void {
    this.getAllcours();
  }
  getAllArticles(){
    this.articleService.getAllcours().subscribe(res => this.listArticle= res);
   console.log(this.listArticle.prix);
  }
  getAllcours(){
    this.articleService.getAllcours().subscribe(res => {
      this.listcour = res 
    });
    console.log(this.listcour)
   }
    listcour:any;
}
