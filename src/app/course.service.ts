import { Injectable } from '@angular/core';

import { Course } from './beans/course';
import { PupilsService } from './pupils.service';
import * as firebase from 'Firebase';

export const snapshotToArray = snapshot => {

    let returnArr = [];

    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private basePath = '/courses';
  private ref = firebase.database().ref(this.basePath);

  constructor(private pupilsService: PupilsService) {}

  getCourses(callback) {
    return this.ref.on('value', (s) => {
      var courses = snapshotToArray(s);
      for(let i = 0 ; i < courses.length ; i++){
        this.fetchPupil(courses[i]);
      }
      callback(courses);
    });
  }

  getCourse(courseKey: string, callback){
    return this.ref.child(courseKey).on('value', (itm) => {
      var course = itm.val();
      course.key = courseKey;
      this.fetchPupil(course);
      callback(course);
    });
  }

  updateCourse(courseKey: string, course: Course) {
    this.ref.child(courseKey).once('value', (itm) => {
      if(course.pupilId != itm.val().pupilId){
        this.pupilsService.addCourseForPupil(course.pupilId, courseKey);
        this.pupilsService.removeCourseForPupil(itm.val().pupilId, courseKey);
      }
    });
    this.ref.child(courseKey).set(course);
  }

  addCourse(course: Course): string {
    var courseKey = this.ref.push(course).key;
    this.pupilsService.addCourseForPupil(course.pupilId, courseKey);
    return courseKey;
  }

  deleteCourse(courseKey: string, pupilId: string) {
    this.pupilsService.removeCourseForPupil(pupilId, courseKey);
    this.ref.child(courseKey).remove();
  }

  fetchPupil(course: any){
      this.pupilsService.getRootRef().child(course.pupilId).once('value', (snapshot) => {
        course.pupil = snapshot.val();
      });
  }

  getCoursesBetween(startTime: number, endTime: number, callback) {
    return this.ref.orderByChild('date').startAt(+startTime).endAt(+endTime).on('value', (s) => {
      var courses = snapshotToArray(s);
      for(let i = 0 ; i < courses.length ; i++){
        this.fetchPupil(courses[i]);
      }
      callback(courses);
    });
  }

  getNextCourse(callback) {
    // var date = 1637459200000;
    var course = null;
    var date = new Date().getTime();
    return this.ref.orderByChild('date').startAt(date).limitToFirst(1).on('value', (s) => {
      var courses = snapshotToArray(s);
      if(courses.length > 0){
        course = courses[0];
        this.fetchPupil(course);
      }
      callback(course);
    });
  }

  getCoursesWithStatus(courseStatus: number, callback){
    return this.ref.orderByChild('courseStatus').equalTo(courseStatus).on('value', (s) => {
      var courses = snapshotToArray(s);
      for(let i = 0 ; i < courses.length ; i++){
        this.fetchPupil(courses[i]);
      }
      callback(courses);
    });
  }
}
