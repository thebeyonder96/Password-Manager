import { Component } from '@angular/core';
import { BodyService } from './services/body.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pass-App';

  // constructor(private document:Document,private body:BodyService){
  //   this.body = this.document
  // }

}
