import { Component, AfterViewChecked, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  pathval:any=12121;
getcolval(event)
{
console.log(event);
}

}
