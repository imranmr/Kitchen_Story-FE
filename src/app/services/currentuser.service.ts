import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {
  user:any = null;
  constructor(private router:Router) { }

  public getCurrentUser(){
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
      return this.user;
    }
    catch(e){
      return null;
    }
  }
}
