import { Component,ViewChild,Output,EventEmitter,ElementRef,ViewEncapsulation, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-imgcol',
  templateUrl: './imgcol.component.html',
  styleUrls: ['./imgcol.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ImgcolComponent implements AfterViewChecked {

  @ViewChild('canvasval')canvasval:ElementRef;
  @ViewChild('colboxval')colboxval:any;
  url;
  displayData=false;
  iswhiteBackground = false;
  displayCol=false;
  private _canvas;
  private _ctx:CanvasRenderingContext2D;
  private _img;
  private _hexval;
 
  @Output() outputColor=new EventEmitter();
  
  readUrl(event:any) {
    this.displayData=true;
    this.displayCol=true;
    if (event.target.files && event.target.files[0])  {
     var reader = new FileReader();
      reader.onload = (event:any) => {
        this.url = event.target.result;
        this.getimg(this.url);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  

  ngAfterViewChecked() {
    this._canvas = this.canvasval.nativeElement;  
    this._ctx = this._canvas.getContext("2d");
    var px=this._ctx.getImageData(31,103,1,1);
    var data_array=px.data;
    var dColor = data_array[2] + 256 * data_array[1] + 65536 * data_array[0];
    this._hexval=('#'+dColor.toString(16));
  if(this._hexval == "#ffffff") {
    this.outputColor.emit(true);
  } else {
    this.outputColor.emit(false);
  }
  }
  getimg(url:string)
  {
  this._hexval="";
  this._canvas = this.canvasval.nativeElement;
    this._ctx = this._canvas.getContext("2d");
    this._img=document.createElement("img"),
    this._img.crossOrigin = 'anonymous';
    this._img.src = this.url;
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._img.onload=(()=>
          this._ctx.drawImage(this._img, 0, 0,this._img.width,this._img.height,0, 0,this._canvas.width, this._canvas.height));
  }
}
