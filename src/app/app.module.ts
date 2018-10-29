import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes, Router } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { DetailviewComponent } from './detailview/detailview.component';
@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    ErrorpageComponent,
    DetailviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'RestaurantsComponent',pathMatch:'full'},
      {path:'RestaurantsComponent',component:RestaurantsComponent},
      {path:'ErrorpageComponent',component:ErrorpageComponent},
      {path:'detailview/:resid',component:DetailviewComponent}
    ])
  ],
  providers: [AppService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
