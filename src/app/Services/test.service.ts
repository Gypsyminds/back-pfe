import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../Models/question-qcm';
import { Certification } from '../Models/cerification';
import { Condidat } from '../Models/condidat.module';
import { CourseModule } from '../course/course.module';
import { ProfModule } from '../prof/prof.module';

@Injectable({
  providedIn: 'root'
})

export class TestService {
 
  Url ='http://localhost:8086/qcm/qcm/1';
  Url1 ='http://localhost:8086/showqcm';
  Url2='http://localhost:8086/qcm/AddFile';
  url3 ='http://localhost:8086/showallcertif/1';
  url4='http://localhost:8086/score/1/1';
  url5='http://localhost:8086/api/pdf/generate-pdf';
  Urlcaappython = 'http://localhost:5000/cap';
  private apiUrl = 'http://localhost:8086/qcm/generateQRCode';
  url='http://localhost:8086/cour/showall';
  urlrec = 'http://127.0.0.1:5000/ma_fonction';
  url7='http://localhost:8086/cour/add-cour';
 url8='http://localhost:8086/cour/showusers';
url9='http://localhost:8086/cour/nubrcour';
url10='http://localhost:8086/cour/profs'
url11='http://localhost:8086/api/pdf/upload';
url12='http://localhost:8086/cour/showCourse';

  constructor(private http :HttpClient ) { }
  options = { withCredentials: true };

addProduct( condidat:Condidat): Observable<any> {
  return this.http.post(this.Urlcaappython,condidat);
}
 getAllQcms() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
   return this.http.get<Test[]>(`${this.Url}`,httpOptions);
   
 }
 getcour(id :any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
  return this.http.get<CourseModule[]>(`${this.url12}/${id}`,httpOptions);
 }
 getnubrcour():Observable<Number>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
  return this.http.get<Number>(`${this.url9}`,httpOptions)
 }
 getAllprof(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
  return this.http.get<ProfModule[]>(`${this.url10}`,httpOptions);
 }
 getallusers(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
  return this.http.get<Condidat[]>(`${this.url8}`,httpOptions);
 }
 getAllcours(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
    
  }
  { responseType: 'blob' }
  return this.http.get<CourseModule[]>(`${this.url}`,httpOptions);
 }
gettest() {
  return this.http.get<Certification[]>(`${this.url3}`);
}
getQuestionJson(){
  return this.http.get<any>(`assets/correctanswers.json`);
}
getscore(){
  return this.http.get(this.url4);
}
 getQcmById(id: number): Observable<Test> {
 
  return this.http.get<Test>(`${this.Url1}/${id}`);
}

 addReponces(reponces: any,id_qs_qcm:any){

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
   return this.http.post(`${this.Url2}/${id_qs_qcm}/1`,reponces,httpOptions);
 }
 addcour(c:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
  return this.http.post(`${this.url7}`,c,httpOptions);
 }

 generateQRCode(data: string) {
  const headers = new HttpHeaders({
    Accept: 'image/png',
  });

  return this.http.get('http://localhost:8080/qcm/qrcode?data=' + data, {
    headers,
    responseType: 'blob',
    observe: 'response',
  });
}
addpdf(reponse :any,id_qs_qcm:any ){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  }
  return this.http.post(`${this.url5}/${id_qs_qcm}`,reponse,httpOptions);
}


addimage() {
  
  return this.http.get(this.urlrec);
}
addfile(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
       responseType: 'blob' 
    })
  }
  return this.http.post(`${this.url11}`,httpOptions)
}


}
