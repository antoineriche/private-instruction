import { Component, OnInit } from '@angular/core';

import { DevoirService } from '../devoir.service';

import { Devoir, DevoirUtils } from '../beans/devoir';
import { PupilUtils } from '../beans/pupil';

@Component({
  selector: 'app-devoir-list',
  templateUrl: './devoir-list.page.html',
  styleUrls: ['./devoir-list.page.scss'],
})
export class DevoirListPage implements OnInit {

  devoirs: Devoir[];
  sortCriteria: string;
  inverse: boolean;
  sortOrderIcon: string;
  showFilters: boolean;
  load: boolean;

  constructor(private devoirService: DevoirService, public pupilUtils: PupilUtils) {
    this.inverse = true;
    this.sortCriteria = 'date';
    this.sortOrderIcon = 'arrow-dropdown-circle';
    this.showFilters = false;
  }

  sortDevoirs(criteria: string) {
    this.devoirs.sort(function(a, b){return a[criteria] - b[criteria]});

    if(this.inverse){
      this.devoirs = this.devoirs.reverse();
    }
  }

  reverseList(){
    this.devoirs = this.devoirs.reverse();
    this.inverse = !this.inverse;
    this.sortOrderIcon = this.inverse ? 'arrow-dropdown-circle' : 'arrow-dropup-circle';
  }

  devoirStatusUI(courseStatus: number): any[]{
    var result = [];
    switch(courseStatus){
      case 0:   //done
        result[0] = "checkmark-circle";
        result[1] = "success";
      break;
      default:  //foreseen
        result[0] = "stopwatch";
        result[1] = "primary";
      break;
    }
    return result;
  }

  getDevoirs (callback) {
    this.load = true;
    return this.devoirService.getDevoirs(callback);
  }

  ngOnInit() {
    this.getDevoirs(itm => {
      this.load = false;
      this.devoirs = itm;
      this.sortDevoirs(this.sortCriteria);
    });
  }

}
