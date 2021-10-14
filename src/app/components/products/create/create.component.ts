import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public productForm: FormGroup;
  public submitted: boolean = false;
  user = JSON.parse(localStorage.getItem('user')!);
  
  constructor(private fromBuilder:FormBuilder,private productSrv: ProductsService, private router:Router) { 
    this.productForm = this.fromBuilder.group({
      productname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      price: ['',[Validators.required]],
      productquantity: ['', [Validators.required,Validators.min(1)]],
      userid:[this.user.userid,[Validators.required]],
      type:['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]]
     
    })
  }

  ngOnInit(): void {
  }

  public onSubmit(loginForm: any) {
    if (loginForm.valid) {
      this.submitted = true;
      //console.log(this.productForm.value);
      //call a add product method from service.
      this.productSrv.createProduct(this.productForm.value).subscribe(res=>{
        console.log(res);
        this.router.navigateByUrl("/products");
      })
      
    } else {
      console.log("Invalid Form !");
      this.validateForm(loginForm);
    }
  }

  public validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else{
        this.validateForm(control)
      }
    })
  }

  hasError(field: any) {
    return (this.productForm.get(field)?.invalid && this.productForm.get(field)?.touched && this.productForm.get(field)?.errors);
  }
  get f() {
    return this.productForm.controls;
  }
}
