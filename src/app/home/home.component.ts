import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  public ngOnInit() {
    console.log('home loaded initialized');
  }
}
