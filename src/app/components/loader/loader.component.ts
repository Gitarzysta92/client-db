import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderPath: string;

  constructor() { 
    this.loaderPath = 'assets/images/loader.gif'
  }

  ngOnInit() {
  }

}
