import { Component } from '@angular/core';
import { TestService } from '../Services/test.service';
import { interval } from 'rxjs';
import { Test } from '../Models/question-qcm';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  currentIndex = 0;
  isChecked = false;
  isChecked1 = false;
  isChecked2 = false;
  isChecked3 = false;
   name: string = "";
   listQcms: Test[] = [];
   currentQuestion: number = 0;
   points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  currentEntity!:Test;
  articleService: any;
  index = 1;
  constructor(private article: TestService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.article.getAllQcms().subscribe(listQcms => {
      for (let i = 0; i < listQcms.length; i++) {
        


    this.listQcms = listQcms ;
    this.currentEntity = listQcms[i];
    this.currentEntity = this.listQcms[this.currentIndex];
    this.currentIndex++;
    this.index++;
  }
});
  }
  
  getNextQcm() {

    if (this.currentIndex <= this.listQcms.length) {
      
    this.currentEntity = this.listQcms[this.currentIndex];
  
    this.currentIndex++;
    this.index ++;
   
    
    
     
   // this.onButtonClick();
  
    }
  
  }  
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.listQcms.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.listQcms.length) * 100).toString();
    return this.progress;

  }
}
