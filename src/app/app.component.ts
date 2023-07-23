import { Component, OnInit } from '@angular/core';
import { Result } from "./types/result-items";
import { FetchDataService } from "./services/fetch-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'infinite-scroll';

  result: Result;
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  disableScroll: boolean = false;
  toggleLoading = () => this.isLoading = !this.isLoading;
  tempScroled: number = 0;

  constructor(private fetchData: FetchDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // call when page is load
  loadData() {
    this.toggleLoading();
    this.fetchData.getItems(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: response => this.result = response,
        error: err => console.log('Error message load page: ', err),
        complete: () => this.toggleLoading()
      });
  }

  // call when page scrolling
  appendData() {
    this.disableScroll = true;
    this.toggleLoading();
    this.fetchData.getItems(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: response => {
          this.result.items = [...this.result.items, ...response.items];
          this.result.endPage = response.endPage;
        },
        error: err => console.log('Error message scroling : ', err),
        complete: () => {
          if(this.result.endPage === true) {
            this.toggleLoading();
          }else {
            this.disableScroll = false;
            this.toggleLoading();
          }
        } 
      })
  }

  onScroll() {
    this.currentPage++;
    this.appendData();
  }
}
