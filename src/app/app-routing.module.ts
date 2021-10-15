import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ConfirmationpageComponent } from './components/confirmationpage/confirmationpage.component';
import { BuypageComponent } from './components/buypage/buypage.component';
import { CreateComponent } from './components/products/create/create.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",redirectTo:'/home',pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"products",children:[
    {path:"",component:ProductsComponent},
    {path:"create",component:CreateComponent}
  ]},
  {path:"search",component:SearchComponent},
  {path:"mycart",component:MycartComponent},
  {path:"myaccount",component:MyaccountComponent},
  {path:"login",component:LoginComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"adminpage",component:AdminpageComponent},
  {path:"buypage",component:BuypageComponent},
  {path:"confirmationpage",component:ConfirmationpageComponent},
  {path:"resetpassword",component:ResetpasswordComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
