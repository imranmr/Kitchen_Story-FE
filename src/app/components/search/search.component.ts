import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products:any = null;
  user:any = null;
  submitted:boolean = false;
  productid:number = 0;
  quantity:number = 1;
  productsearch:string = "";

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.getUser();
    console.log("Current User",this.user);
  }

  getSearchProduct(productsearch:string){
    this.productsearch = productsearch;
    if (this.productsearch!= "" || this.productsearch!= null){
      let search = {
        "productname":this.productsearch
      }
      console.log(search);
      this.productsService.getProduct(search).subscribe(
        (res:any)=>{
          this.products = res;
  
        },(error:any)=>{
          console.log(error);
        }
      )
    }
    
  }
  getUser(){
    try{
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
    catch(e){
      this.user = null;
      
    }
  }
  onSubmit(quantity:any, productid:number){
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
        this.getSearchProduct(this.productsearch);
      },(error:any)=>{
        console.log(error);
      }
    )

  }

}
