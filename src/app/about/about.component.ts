import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay(){
    this.isVisible = !this.isVisible;
    return this.isVisible;
  }

}
