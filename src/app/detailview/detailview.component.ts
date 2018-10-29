import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from '../app.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {
 public restaurantData=0;
 public userReview=0;
  constructor(private route:ActivatedRoute,private router:Router,private appService:AppService) { }

  ngOnInit() {
    //Getting details of particular restaurant
    let restaurantId = this.route.snapshot.paramMap.get('resid');
    this.appService.retaurantDetailsFunction(restaurantId).subscribe(
      (data)=>{
        this.restaurantData=data;
        //getting review of the same restaurants
        this.appService.restaurantsReviewFunction(restaurantId).subscribe(
          (data)=>{
            console.log(data.user_reviews);
            this.userReview=data.user_reviews;
          }
          ,(error)=>{}
        )
      },
      (error)=>{
        console.log('error occured while fetching');
      }
    )
  }

}
