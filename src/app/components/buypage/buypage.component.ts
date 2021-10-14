import { UsersService } from './../../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buypage',
  templateUrl: './buypage.component.html',
  styleUrls: ['./buypage.component.css']
})
export class BuypageComponent implements OnInit {
  user:any = null;
  cart:any = null;
  cartitems:any = null;
  cardform:FormGroup;
  public submitted: boolean = false;

  constructor(private router:Router, private productservice:ProductsService,private formBuilder: FormBuilder,private userService:UsersService) {
    this.cardform = this.formBuilder.group({
      cardname:['',[Validators.required,Validators.minLength(2)]],
      cardnumber:['',[Validators.required,Validators.min(1000000000000000),Validators.max(9999999999999999)]],
      expiry:['',[Validators.required]],
      cvv:['',[Validators.required,Validators.minLength(3)]],
      address:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
      
      if (this.user==null){
        this.router.navigate(['login']);
      }
      this.getUser();
      
    }
    catch(e){
      this.user = null;
    }
  }

  onSubmit(loginForm: any){
    if (loginForm.valid){
      this.submitted = true;
      console.log("login form",this.cardform.value);
      let buyform = {
        "userid":this.user.userid,
        "address":this.cardform.value.address
      }
      this.productservice.buyCart(buyform).subscribe(
        (res:any)=>{
          console.log("Successfully Bought")
          this.router.navigate(["confirmationpage"]);
        },(error:any)=>{
          console.log(error);
        }
      )
      console.log("buyform",buyform);
      
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
    return (this.cardform.get(field)?.invalid&& this.cardform.get(field)?.touched&&this.cardform.get(field)?.errors);
  }
  get f(){
    return this.cardform.controls;
  }




  getUser(){
    this.userService.getUser(this.user.userid).subscribe(
      (res:any)=>{
        console.log("res",res);
        this.user = res;
        localStorage.setItem('user',JSON.stringify(this.user));
        
      },(error:any)=>{
        console.log("Error fetching user",error);
      }
    )
  }



  goback(){
    console.log("Clicked Go back")
  }

  confirmbuy(){
    console.log("Clicked Confirm Buy")

  }

}
