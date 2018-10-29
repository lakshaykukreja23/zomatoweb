import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  public restaurantToggel = true;
  public locationToggel = false;
  public restaurantsList=true;
  public noRestrauntsFound=false;
  public location=this.cookieService.get('cityName') ;
  public locationHint=this.cookieService.get('cityName') ;
  public RestaurantName;
  public geolocationPosition;
  
  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, public router: Router, private cookieService: CookieService) { }
  public restaurants = 0;
  ngOnInit() {
    // get the user current latitude and longitute   
      if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
            this.appService.geocodeFunction(position.coords.latitude,position.coords.longitude).subscribe(
              (data) => {
                this.location = data.location.city_name;
                this.locationHint = data.location.city_name;
                this.cookieService.set('cityName', data.location.city_name);
                this.cookieService.set('entityId', data.location.entity_id);
                this.cookieService.set('entityType', data.location.entity_type);
                this.appService.restaurantsListFunction(data.location.entity_id,data.location.entity_type).subscribe(
                  (data) => {
                    this.restaurants=data.best_rated_restaurant;
                  },
                  (error) => {
                    console.log(error);
                  
                  }
                )
              },
              (error) => {
                this.location = "Enter city";
                this.locationHint = "Enter city";
              }
            )
            
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              this.location = "Enter city";
              this.locationHint = "Enter city";
              break;
            case 2:
              console.log('Position Unavailable');
              this.location = "Enter city";
              this.locationHint = "Enter city";
              break;
            case 3:
              console.log('Timeout');
              this.location = "Enter city";
              this.locationHint = "Enter city";
              break;
          }
        }
      );
      
    };
    
  }
  // change the location of the user 
  public changeLocation() {
    console.log(this.location);
    this.appService.locationFunction(this.location).subscribe(
      (data) => {
       
        this.location = data.location_suggestions[0].city_name;
        this.locationHint = this.location;
        this.locationToggel = !this.locationToggel;
        this.restaurantToggel = !this.restaurantToggel;
        this.cookieService.set('cityName', data.location_suggestions[0].city_name);
        this.cookieService.set('entityId', data.location_suggestions[0].entity_id);
        this.cookieService.set('entityType', data.location_suggestions[0].entity_type);
        this.appService.restaurantsListFunction(this.cookieService.get('entityId'),this.cookieService.get('entityType')).subscribe(
          (data) => {
            console.log(data);
            this.restaurants=data.best_rated_restaurant.length;
            this.restaurants=data.best_rated_restaurant;
            console.log(this.restaurants);
          },
          (error) => {
            console.log("oops some error occured");
          }
        )
      },
      (error) => {
        console.log("oops some error occured");
      }
    )
  }
  //search restaurants
  public searchRestaurants()
  {
    if(!this.RestaurantName)
    {
      alert('Please Enter Restaurant Name')
    }
    else{
    this.appService.searchRestaurantsFunction(this.cookieService.get('entityId'),this.cookieService.get('entityType'),this.RestaurantName).subscribe(
      (data) => {
        this.RestaurantName="";
        this.restaurants=data.restaurants;
      },
      (error) => {
        console.log("oops some error occured");
      }
    )  
  }
}
  public toggle() {
    this.restaurantToggel = !this.restaurantToggel
    this.locationToggel = !this.locationToggel;
  }
  //set current Location
  public setCurrenLocation()
  {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
            this.appService.geocodeFunction(position.coords.latitude,position.coords.longitude).subscribe(
              (data) => {
                this.restaurantToggel = !this.restaurantToggel
                this.locationToggel = !this.locationToggel;
                this.location = data.location.city_name;
                this.locationHint = data.location.city_name;
                this.cookieService.set('cityName', data.location.city_name);
                this.cookieService.set('entityId', data.location.entity_id);
                this.cookieService.set('entityType', data.location.entity_type);
                this.appService.searchRestaurantsFunction(this.cookieService.get('entityId'),this.cookieService.get('entityType'),this.RestaurantName).subscribe(
                  (data) => {
                    this.RestaurantName="";
                    this.restaurants=data.restaurants;
                  },
                  (error) => {
                    console.log("oops some error occured");
                  }
                )
              },
              (error) => {
                this.location = "Enter city";
                this.locationHint = "Enter city";
              }
            )
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              this.location = "Enter city";
              this.locationHint = "Enter city";
              break;
            case 2:
              console.log('Position Unavailable');
              this.location = "Enter city";
              this.locationHint = "Enter city";
              break;
            case 3:
              console.log('Timeout');
              this.location = "Enter city";
              this.locationHint = "Enter city";
              break;
          }
        }
      );
    };
    this.appService.restaurantsListFunction(this.cookieService.get('entityId'),this.cookieService.get('entityType')).subscribe(
      (data) => {
        
        this.restaurants=data.best_rated_restaurant.length;
        this.restaurants=data.best_rated_restaurant;
        
      },
      (error) => {
        console.log("oops some error occured");
      }
    )
  }
}

