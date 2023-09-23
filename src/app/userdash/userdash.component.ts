import { Component, Inject, OnInit } from '@angular/core';

import { TestService } from '../Services/test.service';
import { CourseModule } from '../course/course.module';

//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit  {
  constructor( private test:TestService ) {}
  cour !:CourseModule;
  closeResult! : string;
ngOnInit(): void {
 

}
ajoutercour(c :any){
  this.test.addcour(this.cour).subscribe(()=>{
   // this.form = false;
  });

 
}


//  private getDismissReason(reason: any): string {
   // if (reason === ModalDismissReasons.ESC) {
 //     return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
   // } else {
  //    return  `with: ${reason}`;
   // }
 // }
 // closeForm(){

 // }
 // cancel(){
   // this.form = false;
 // }

}
