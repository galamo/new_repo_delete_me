import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number
  public header: string;
  public arrOfStars: Array<string>;
  constructor() {
    this.header = "Rating is:"
    this.arrOfStars = []
  }

  ngOnInit(): void {
    for (let index = 0; index < this.rating; index++) {
      this.arrOfStars.push("Star")
    }
  }

}
