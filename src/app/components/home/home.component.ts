import { Component, OnInit } from '@angular/core';
import * as internal from 'stream';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any=null;
 
  constructor() { }

  
  ngOnInit(): void {
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
      console.log("Home page:",this.user)
      if(this.user == null){
        this.user = null;
      }
    }
    catch(e){
      this.user = null;
    }
    
  }

}
