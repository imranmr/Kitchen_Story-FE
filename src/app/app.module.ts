import { ProductsService } from './services/products.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { CreateComponent } from './components/products/create/create.component';
import { BuypageComponent } from './components/buypage/buypage.component';
import { ConfirmationpageComponent } from './components/confirmationpage/confirmationpage.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    SearchComponent,
    MycartComponent,
    LoginComponent,
    RegistrationComponent,
    MyaccountComponent,
    AdminpageComponent,
    CreateComponent,
    BuypageComponent,
    ConfirmationpageComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
