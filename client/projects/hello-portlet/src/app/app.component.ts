import { Component } from '@angular/core';

@Component({
  // selector: 'hello-portlet',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-portlet';

  constructor() {
    console.log('xtructing AppComponent hello-portlet');
    document.dispatchEvent(new Event('portlet:bootstrap'));
  }
}
