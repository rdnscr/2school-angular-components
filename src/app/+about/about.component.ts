import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  template: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor() {

  }

  public ngOnInit() {
    console.log('about loaded initialized');
  }
}
