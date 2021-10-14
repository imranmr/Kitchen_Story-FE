import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private alluserurl:string = 'http://localhost:8080/user/allusers'
  private createuserurl:string="http://localhost:8080/user/create"
  private loginurl:string="http://localhost:8080/user/login"
  private getuserurl:string="http://localhost:8080/user/getuser"
  constructor(private httpClient:HttpClient) { }
    
    public getAllUser(user:any):any{
      return this.httpClient.post(this.alluserurl,user);
    }

    public createUser(user:any):any{
      return this.httpClient.post(this.createuserurl,user);
    }

    public loginAuthentication(user:any):any{
      return this.httpClient.post(this.loginurl,user);
    }
    public logout(user:string):any{
      localStorage.removeItem(user);
    }

    public getUser(user:number){
      return this.httpClient.get(`${this.getuserurl}/${user}`);
    }
}
