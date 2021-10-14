import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  user:any = null;


  constructor(private router:Router, private productservice:ProductsService,private userService:UsersService) { 
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
  
  onDelete(productid:number,cartid:number,quantity:string){
    

    let removeitem = {
      "userid": this.user.userid,
      "productid":productid,
      "cartid":cartid,
      "quantity":Number(quantity)
    }
    console.log(removeitem);

    this.productservice.removeitemfromcart(removeitem).subscribe(
      (res:any)=>{
        
        this.getUser();

      },(error:any)=>{
        console.log("Error deleting",error);
      }
    )
    
  }

  buycart(){
    console.log("Buying cart");
    this.router.navigate(["buypage"])
  }
}
