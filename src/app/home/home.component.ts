import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Vider tout le localStorage afin de créer une todolist vide :
  emptyLocalStorage(){
    localStorage.clear(); // Vider le localStorage
  }

}
