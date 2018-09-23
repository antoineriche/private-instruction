import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import * as moment from 'moment';

import { CourseService } from '../course.service';
import { Observable } from 'rxjs';

import { Course, CourseUtils } from '../beans/course';
import { PupilUtils } from '../beans/pupil';


@Component({
  selector: 'app-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss'],
})
export class WeekPage implements OnInit {

  courses: Course[];
  days: any[];
  loading: any;
  load: boolean;
  courseCounter: number;
  moneyCounter: number;
  today: any;
  offsetWeek: number;

  constructor(public courseService: CourseService, public courseUtils: CourseUtils, public loadingCtrl: LoadingController,
              public pupilUtils: PupilUtils) {

    this.load = true;
    this.today = moment();
    this.offsetWeek = 0;
  }

  nextWeek(){
    this.offsetWeek = this.offsetWeek + 1;
    this.days = this.getDays(this.offsetWeek);
    this.getCourses(this.days);
  }

  lastWeek(){
    this.offsetWeek = this.offsetWeek - 1;
    this.days = this.getDays(this.offsetWeek);
    this.getCourses(this.days);
  }

  thisWeek(){
    this.offsetWeek = 0;
    this.days = this.getDays(this.offsetWeek);
    this.getCourses(this.days);
  }

  // TODO: correct that shit
  getDays(offsetWeek: number): any[] {
    var days = [];

    var m = moment().add(offsetWeek*7, 'days');

    for(let i = 1 ; i <= 7 ; i++){
      var day = {label: null, startTS: null, endTS: null, today: false, details: false};

      day.label = m.weekday(i).format('dddd DD MMMM')
      day.today = moment().format('dddd DD MMMM') == day.label;
      day.details = day.today;

      m.set({hour:0,minute:0,second:0,millisecond:0});
      if(i != 7){
        day.startTS = m.weekday(i).format('x');
      } else {
        day.startTS = m.format('x');
      }

      m.set({hour:23,minute:59,second:59,millisecond:999});
      if(i != 7){
        day.endTS = m.weekday(i).format('x');
      } else {
        day.endTS = m.format('x');
      }

      days.push(day);
    }

    return days;
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Waiting for days',
      duration: 2000
    });

    return await loading.present();
  }

  getCourses (days) {
    this.load = true;
    return this.courseService.getCoursesBetween(+days[0].startTS, +days[6].endTS,
      itm => {
        this.load = false;
        this.courses = itm;
        this.updateUI(itm);
      });
  }

  toggleDetails(day){
    day.details = !day.details;
  }

  updateUI(courses: Course[]){
    for(let i = 0 ; i < 7 ; i++){
      this.days[i].courses = courses.filter(
          course => course.date >= this.days[i].startTS && course.date <= this.days[i].endTS);
    }
    this.courseCounter = this.courses.length;

    var init = 0;
    this.moneyCounter = courses.reduce((accumulateur, course) => accumulateur + course.money, init);
  }

  ngOnInit() {
    this.days = this.getDays(this.offsetWeek);
    this.getCourses(this.days);
  }

}
