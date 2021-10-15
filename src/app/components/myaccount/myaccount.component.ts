import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  user:any = null;
  adminrights:boolean = false;

  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.adminrights = this.user.adminrights;
      if(this.adminrights){
        console.log("checked admin")
        this.router.navigate(['adminpage'])
      }
      this.getUser();
    }
    catch(e){
      // this.router.navigate(['login']);
      this.user = null;
    }
  }
  getUser(){
    this.userService.getUser(this.user.userid).subscribe(
      (res:any)=>{
        console.log("res",res);
        this.user = res;
      },(error:any)=>{
        console.log("Error fetching user",error);
      }
    )
  }

  resetpassword(){
    console.log("Reset Password button")
    this.router.navigate(["resetpassword"])
  }
  
}
