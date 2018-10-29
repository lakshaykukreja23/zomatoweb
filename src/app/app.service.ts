import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public baseUrl = 'https://developers.zomato.com/api/v2.1';
  constructor(private http: Http, public router: Router, private cookieService: CookieService) { }
  //handeling error 
  handleErrors(error: Response) {
    console.log(error.json().message)
    this.router.navigate(['/ErrorpageComponent']);
    return Observable.throw(error);
  }
  //function to get the category of restaraunts in the city
  public testFunction() {
    return this.http.get(this.baseUrl + '/categories', { headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , catchError(this.handleErrors)
    );
  }
  //changing the location of the user
  public locationFunction(data) {
    return this.http.get(this.baseUrl + '/locations?query=' + data, { headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , tap(getdata =>
        console.log(getdata)
      )
      , catchError(this.handleErrors)
    );
  }
  //finding location with the help of latitude and longitude
  public geocodeFunction(latitude, longitude) {
    return this.http.get(this.baseUrl + '/geocode?lat=' + latitude + '&lon=' + longitude, { headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , tap(getdata =>
        console.log(getdata)
      )
    );
  }

  public restaurantsListFunction(entityId,entityType) {
    return this.http.get(this.baseUrl+'/location_details?entity_id='+entityId +'&entity_type='+entityType, { headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , tap(getdata =>
        console.log(getdata)
      )
      , catchError(this.handleErrors)
    );
  }

  public searchRestaurantsFunction(entityId,entityType,restaurantName)
  {
    return this.http.get(this.baseUrl+'/search?entity_id='+entityId+'&entity_type='+entityType+'&q='+restaurantName,{ headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , tap(getdata =>
        console.log(getdata)
      )
      , catchError(this.handleErrors)
    );
  }
  public retaurantDetailsFunction(restaurantId)
  {
    return this.http.get(this.baseUrl+'/restaurant?res_id='+restaurantId,{ headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , tap(getdata =>
        console.log(getdata)
      )
      , catchError(this.handleErrors)
    );
  }
  public restaurantsReviewFunction(restaurantId)
  {
    return this.http.get(this.baseUrl+'/reviews?res_id='+restaurantId,{ headers: this.getCommonHeaders() }).pipe(
      map(Response => Response.json())
      , tap(getdata =>
        console.log(getdata.user_reviews)
      )
      , catchError(this.handleErrors)
    );
  }
  //contains the header which are required
  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("user-key", "00f82a319649b5624b3042f2c3f859ee");
    return headers;
  }
}
