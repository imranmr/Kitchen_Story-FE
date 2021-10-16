import { CurrentuserService } from './../../services/currentuser.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any = null;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  getUser(){
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
    catch(e){
      this.user = null;
      
    }
  }

  myaccountcheck(){
    this.getUser();
    if (this.user==null){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['myaccount']);
    }
   
  }

  mycartcheck(){
    this.getUser();
    if (this.user==null){
      this.router.navigate(['login']);
    }else{
      if(this.user.adminrights==true){
        this.router.navigate(['myaccount'])
      }else{
        this.router.navigate(['mycart']);
      }
      
    }
  }
  logout(){
    localStorage.removeItem('user');
    this.router.navigate(["home"]);
    this.ngOnInit();
    console.log("logging out");
  }
}
