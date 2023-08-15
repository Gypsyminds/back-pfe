import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refaciale',
  templateUrl: './refaciale.component.html',
  styleUrls: ['./refaciale.component.css']
})
export class RefacialeComponent implements OnInit{
  constructor(){}
  
 cv: any;
  ngOnInit(): void {
  this.startVideo();
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
}
