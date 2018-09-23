import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseService } from '../course.service';
import { Observable } from 'rxjs';

import { Course, CourseUtils } from '../beans/course';
import { PupilUtils } from '../beans/pupil';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  courses: Course[];
  sortCriteria: string;
  inverse: boolean;
  sortOrderIcon: string;
  showFilters: boolean;
  load: boolean;

  constructor(public courseService: CourseService, public router: Router, public loadingController: LoadingController,
              public courseUtils: CourseUtils, public pupilUtils: PupilUtils) {
    this.inverse = true;
    this.sortCriteria = 'date';
    this.sortOrderIcon = 'arrow-dropdown-circle';
    this.showFilters = false;
  }

  getCourses (callback) {
    this.load = true;
    return this.courseService.getCourses(callback);
  }

  sortCourses(criteria: string) {
    this.courses.sort(function(a, b){return a[criteria] - b[criteria]});

    if(this.inverse){
      this.courses = this.courses.reverse();
    }
  }

  reverseList(){
    this.courses = this.courses.reverse();
    this.inverse = !this.inverse;
    this.sortOrderIcon = this.inverse ? 'arrow-dropdown-circle' : 'arrow-dropup-circle';
  }

  courseStatusUI(courseStatus: number): any[]{
    var result = [];
    switch(courseStatus){
      case 0:   //done
        result[0] = "checkmark-circle";
        result[1] = "success";
      break;
      case 2:   //cancelled
        result[0] = "close-circle";
        result[1] = "danger";
      break;
      default:  //foreseen
        result[0] = "stopwatch";
        result[1] = "primary";
      break;
    }
    return result;
  }

  ngOnInit() {
    this.getCourses(itm => {
      this.load = false;
      this.courses = itm;
      this.sortCourses(this.sortCriteria);
    });
  }

}
