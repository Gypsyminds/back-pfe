import { Component, OnInit } from '@angular/core';
import { TestService } from '../Services/test.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-refaciale',
  templateUrl: './refaciale.component.html',
  styleUrls: ['./refaciale.component.css']
})
export class RefacialeComponent implements OnInit{
  constructor(private articleService :TestService,private router:Router ,private tokenStorageService: TokenStorageService ){}
  ids:any;
 cv: any;
 affloading:boolean=false;
 desac:boolean=true;
 affvalidation:boolean=false;
  ngOnInit(): void {
  //this.startVideo();
//  while(this.ids==0){
 //   this.detect();
  //}
  setTimeout(() => {
    this.desac = false;
    this.affloading = true;
    this.detect();
  }, 9000); 
//this.detect30s();
  }
 
  startVideo() {
    const video = document.getElementById('videoElement') as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        this.processVideo();
      })
      .catch((err) => console.error(err));
  }

  processVideo() {
    const video = document.getElementById('videoElement') as HTMLVideoElement;
    const canvas = document.getElementById('canvasOutput') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const cap = new this.cv.VideoCapture(video);
    const faceCascade = new this.cv.CascadeClassifier();
    faceCascade.load('D:\AfricoDing-DB-alaa\src\assets\khouloud.jpg');

    const processFrame = () => {
      cap.read(video);
      const frame = this.cv.cvtColor(video, this.cv.COLOR_RGBA2GRAY);
      const faces = new this.cv.RectVector();
      const scaleFactor = 1.1;
      const minNeighbors = 3;
      const minSize = new this.cv.Size(30, 30);
      faceCascade.detectMultiScale(frame, faces, scaleFactor, minNeighbors, 0, minSize);
      for (let i = 0; i < faces.size(); ++i) {
        const face = faces.get(i);
        const point1 = new this.cv.Point(face.x, face.y);
        const point2 = new this.cv.Point(face.x + face.width, face.y + face.height);
        this.cv.rectangle(video, point1, point2, [255, 0, 0, 255]);
      }
      this.cv.imshow(canvas, video);
      requestAnimationFrame(processFrame);
    };

    processFrame();
  }
detect(){
  this.articleService.detectface().subscribe(res => {
    this.ids = res;
 console.log(this.ids);
const user = this.tokenStorageService.getUser();
console.log(user.id);
 if( this.ids == user.id){

   this.affvalidation =true;
   this.affloading = false;
 }else{
  this.detect();
 }

      });
}
routerpassage(){
  this.router.navigateByUrl('/passage');

}
detect30s(){
  this.articleService.detec30s().subscribe(()=>{

  });
}
}
