import { Subscription } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted:boolean = false;
  user:any;

  constructor(private formBuilder:FormBuilder, private router:Router, private userService:UsersService) { 
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      firstname: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      mobile:['',[Validators.required,Validators.maxLength(10)]]
    })



  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: any){
    if (loginForm.valid){
      this.submitted = true;
      console.log(this.registerForm.value);

      this.userService.createUser(this.registerForm.value).subscribe(
        (res:any)=>{
          this.user = res;
          console.log(res);
          localStorage.setItem('user',JSON.stringify(this.user));
        },(error:any)=>{
          console.log(error);
        }
      )

      this.router.navigate(["products"])
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
    return (this.registerForm.get(field)?.invalid&& this.registerForm.get(field)?.touched&&this.registerForm.get(field)?.errors);
  }
  get f(){
    return this.registerForm.controls;
  }
}
