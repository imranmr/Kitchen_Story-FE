import { Subscription } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public submitted: boolean = false;
  usersub: Subscription = new Subscription;
  user: any;
  public emailpassworderror: boolean = false;


  constructor(private formBuilder: FormBuilder, private router:Router, private userService:UsersService) {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
    })
   }

  ngOnInit(): void {
    console.log("in login");
    this.emailpassworderror = false;
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
    catch(e){
      console.log("User not logged in")
    }
  }

  onSubmit(loginForm: any){
    if (loginForm.valid){
      this.submitted = true;
      console.log("login form",this.loginForm.value);

      this.usersub = this.userService.loginAuthentication(this.loginForm.value).subscribe(
        (res:any)=> {
          this.user = res;
          localStorage.setItem('user',JSON.stringify(this.user));
          console.log(this.user.userid);
          this.router.navigate(["myaccount"])

        }, (error:any)=> {
          this.emailpassworderror = true;
          console.log(error);
        }
      );
      
    }else{
      console.log("invalid form");
      this.validateForm(loginForm);
    }
  }
  public validateForm(form:any){
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf: true});
      }else{
        this.validateForm(control);
      }
      
    })
  }
  hasError(field:any){
    return (this.loginForm.get(field)?.invalid&& this.loginForm.get(field)?.touched&&this.loginForm.get(field)?.errors);
  }
  get f(){
    return this.loginForm.controls;
  }
  
}
