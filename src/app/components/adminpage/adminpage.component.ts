import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  
  adminuser = JSON.parse(localStorage.getItem('user')!);
  public products:any;
  productsub: Subscription = new Subscription;
  
  constructor(private productsService:ProductsService, private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
    this.products = this.getProducts();
    this.getUser();
  }

  public getProducts(){
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

  onDelete(productid:number){
    console.log("Delete this item",productid);

    this.productsService.deleteProduct(productid).subscribe(
      (res:any)=>{
        console.log("Deleted item",productid);
        this.getProducts();
      },(error:any)=>{
        console.log(error);
      }
    )
  };
  onUpdate(productid:number){
    console.log("Update this item",productid);
  }
  getUser(){
    this.userService.getUser(this.adminuser.userid).subscribe(
      (res:any)=>{
        console.log("res",res);
        this.adminuser = res;
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
