import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public dataList;
  public threeSetData = [];
  private currentIndex = 0;
  public imageUrl: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe((resp) => {
      this.dataList = resp;
      this.dataList.filter((ele, index) => {
        if (index < 3) {
          this.threeSetData.push(ele);
        }
      });
    });
  }

  public displayFullImage(imageUrl) {
    this.imageUrl = imageUrl;
  }

  public handleNext() {
    this.threeSetData = [];
    this.currentIndex = this.currentIndex + 3;
    this.handleArrayLogic();
  }

  public handlePrev() {
    if (this.currentIndex > 2) {
      this.threeSetData = [];
      this.currentIndex = this.currentIndex - 3;
      this.handleArrayLogic();
    }
  }

  private handleArrayLogic() {
    this.dataList.filter((ele, index) => {
      if (index >= this.currentIndex && index <= this.currentIndex + 2) {
        this.threeSetData.push(ele);
      }
    });
  }
}
