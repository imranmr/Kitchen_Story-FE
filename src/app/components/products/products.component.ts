import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products:any;
  public filter:any;
  public submitted:boolean = false;
  
  productid:number=0;
  quantity:number=1;
  user:any = null;
  
  filtersub: Subscription = new Subscription;
  productsub: Subscription = new Subscription;

  constructor(private productsService:ProductsService,private formBuilder:FormBuilder,private router:Router) { 
   
  }
  
  
  ngOnInit(): void {
    this.getUser();
    console.log("Current User",this.user);
    this.getProducts();
    
  }

  getProducts(){
    this.productsub = this.productsService.getAllProducts().subscribe(
      (res:any) => {
        this.products = res;
        
        console.log("response",res);

      },
      (error:any)=> {
        console.log(error);
      }
    );
  }
  getUser(){
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
    catch(e){
      this.user = null;
      
    }
  }

  ngOnDestroy(){
    this.productsub.unsubscribe;
  }
  
  onSubmit(quantity:any,productid:number){
    
    this.submitted = true;
    this.productid = productid;
    this.quantity = quantity;
    
    let addtocart= {
      "userid":this.user.userid,
      "productid": this.productid,
      "quantity":this.quantity
    }
    console.log(addtocart);

    this.productsService.addproducttocart(addtocart).subscribe(
      (res:any)=>{
        console.log(res);
        this.getProducts();
      },(error:any)=>{
        console.log(error);
      }
    )

    
  }
  
    
}