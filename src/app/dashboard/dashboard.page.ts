import { Component, OnInit } from '@angular/core';

import { Course, CourseUtils } from '../beans/course';
import { Devoir } from '../beans/devoir';
import { PupilUtils } from '../beans/pupil';
import { CourseService } from '../course.service';
import { DevoirService } from '../devoir.service';

import { interval } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  nextCourse: Course;
  nextDevoir: Devoir;
  nextCourseCountDown: any;
  uncompleteCourses: Course[];
  uncompleteCourseVisible: boolean;
  load: boolean;

  constructor(public courseService: CourseService, public courseUtils: CourseUtils, public pupilUtils: PupilUtils,
    public devoirService: DevoirService) {
    this.uncompleteCourseVisible = false;
  }

  formatCountDown(t: number){
    let days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    var result = seconds + 's';
    result = Number(minutes) > 0 ? minutes + 'm ' + result : result;
    result = Number(hours) > 0 ? hours + 'h ' + result : result;
    result = Number(days) > 0 ? days + 'd ' + result : result;

    return result;
  }

  toggleUncompleteCourses() {
    this.uncompleteCourseVisible = !this.uncompleteCourseVisible;
  }

  getNextCourse() {
    this.load = true;
    return this.courseService.getNextCourse(
      itm => {
        this.load = false;
        this.nextCourse = itm;
        if(this.nextCourse != undefined){
          const source = interval(1000);
          source.subscribe(val => {
            this.nextCourseCountDown = Math.floor((this.nextCourse.date - new Date().getTime()) / 1000);
          });
        }
      });
  }

  getNextDevoir(){
    this.load = true;
    return this.devoirService.getNextDevoir(
      itm => {
        this.load = false;
        this.nextDevoir = itm;
      });
  }

  getUncommpleteCourses(){
    return this.courseService.getCoursesWithStatus(0,
      itm => {
        this.uncompleteCourses = itm.filter(course => (course.comment == "" || course.chapter == "" || course.rate == ""));
      });
  }

  ngOnInit() {
    this.getNextCourse();
    this.getNextDevoir();
    this.getUncommpleteCourses();
  }

}
