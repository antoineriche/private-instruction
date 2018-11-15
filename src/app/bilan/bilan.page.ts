import { Component, OnInit } from '@angular/core';

import { Course } from '../beans/course';
import { CourseService } from '../course.service';

import { Pupil } from '../beans/pupil';
import { PupilsService } from '../pupils.service';

import { Devoir } from '../beans/devoir';
import { DevoirService } from '../devoir.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.page.html',
  styleUrls: ['./bilan.page.scss'],
})
export class BilanPage implements OnInit {

  moneyLoading: boolean;
  moneyWaiting: number;
  moneyPaid: number;
  moneyTotal: number;

  pupilLoading: boolean;
  pupilMale: number;
  pupilFemale: number;

  courseLoading: boolean;
  courseFirst: number;
  courseCancelled: number;
  courseFinished: number;
  courseTotal: number;

  devoirLoading: boolean;
  devoirFinished: number;
  devoirBestMark: string;
  devoirWorstMark: string;
  devoirTotal: number;


  constructor(private courseService: CourseService, private pupilService: PupilsService, private devoirService: DevoirService) { }

  gatherMoneyInfos(courses: Course[]){
    this.moneyWaiting = courses.filter(course => (course.paymentStatus == 0))
      .reduce((accumulateur, course) => accumulateur + course.money, 0);
    this.moneyPaid = courses.filter(course => (course.paymentStatus == 1))
      .reduce((accumulateur, course) => accumulateur + course.money, 0);
    this.moneyTotal = this.moneyWaiting + this.moneyPaid;
    this.moneyLoading = false;
  }

  gatherCoursesInfo(courses: Course[]){
    if(courses.length > 0){
      courses = courses.sort(function(a, b){return a['date'] - b['date']});
      this.courseFirst = courses[0].date;
    }

    this.courseFinished = courses.filter(course => (course.courseStatus == 0)).length;
    this.courseCancelled = courses.filter(course => (course.courseStatus == 2)).length;
    this.courseTotal = courses.length;
    this.courseLoading = false;
  }

  gatherPupilsInfos(pupils: Pupil[]){
    this.pupilMale = pupils.filter(pupil => (pupil.gender == "male")).length;
    this.pupilFemale = pupils.length - this.pupilMale;
    this.pupilLoading = false;
  }

  gatherDevoirsInfos(devoirs: Devoir[]){
    this.devoirFinished = devoirs.filter(devoir => (devoir.status == 0)).length;
    this.devoirTotal = devoirs.length;

    var worst = 1;
    let worstDevoir;
    var best = 0;
    let bestDevoir;

    devoirs.filter(devoir => (devoir.status == 0)).forEach(devoir => {
      var mark = devoir.mark / devoir.maxMark;

      if(mark <= worst){
        worst = mark;
        worstDevoir = devoir;
      }

      if (mark >= best){
        best = mark;
        bestDevoir = devoir;
      }
    });

    this.devoirBestMark = bestDevoir.mark + " / " + bestDevoir.maxMark;
    this.devoirWorstMark = worstDevoir.mark + " / " + worstDevoir.maxMark;

    this.devoirLoading = false;
  }

  getCourses () {
    this.moneyLoading = true;
    this.courseLoading = true;

    return this.courseService.getCourses( courses => {
      this.gatherMoneyInfos(courses);
      this.gatherCoursesInfo(courses);
    });
  }

  getDevoirs () {
    this.devoirLoading = true;

    return this.devoirService.getDevoirs( devoirs => {
      this.gatherDevoirsInfos(devoirs);
    });
  }

  getPupils () {
    this.pupilLoading = true;
    return this.pupilService.getPupils( pupils => {
      this.gatherPupilsInfos(pupils);
    });
  }

  ngOnInit() {
    this.getCourses();
    this.getPupils();
    this.getDevoirs();
  }

}
