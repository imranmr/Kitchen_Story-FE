import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private producturl:string = 'http://localhost:8080/home/products'
  private productsearch:string="http://localhost:8080/home/search"
  private filtersearch:string="http://localhost:8080/home/filtersearch"
  private deleteproducturl:string="http://localhost:8080/home/delete"
  private createproducturl:string="http://localhost:8080/home/create"
  private addproducttocarturl:string="http://localhost:8080/home/add"
  private showusercartitemsurl:string="http://localhost:8080/home/mycartitems"
  private getusercarturl:string="http://localhost:8080/home/getcart"
  private removeitemfromcarturl:string="http://localhost:8080/home/remove"
  private buyitemsfromcarturl:string="http://localhost:8080/home/buy"

  constructor(private httpClient:HttpClient) { }

  public getAllProducts():any{
    return this.httpClient.post(this.producturl,null);
  }

  public getProduct(product:any){
    return this.httpClient.post(this.productsearch,product);
  }

  public getFilter(productid:string){
    return this.httpClient.get(`${this.filtersearch}/${productid}`);
  }

  public deleteProduct(productid:number){
    return this.httpClient.delete(`${this.deleteproducturl}/${productid}`);
  }

  public createProduct(product:any){
    return this.httpClient.post(this.createproducturl,product);
  }

  public addproducttocart(product:any){
    return this.httpClient.post(this.addproducttocarturl,product);
  }

  public showUserCartItems(user:any){
    return this.httpClient.post(this.showusercartitemsurl,user);
  }

  public getUserCart(userid:number){
    return this.httpClient.get(`${this.getusercarturl}/${userid}`);
  }

  public removeitemfromcart(data:any){
    return this.httpClient.post(this.removeitemfromcarturl,data);
  }

  public buyCart(data:any){
    return this.httpClient.post(this.buyitemsfromcarturl,data);
  }

}
