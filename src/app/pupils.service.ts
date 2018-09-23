import { Injectable } from '@angular/core';

import { Pupil } from './beans/pupil';
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
export class PupilsService {

  private basePath = '/items';
  private ref = firebase.database().ref(this.basePath);

  constructor() {}

  getRootRef(){
    return this.ref;
  }

  getPupils(callback) {
    return this.ref.on('value', (s) => {
      var pupils = snapshotToArray(s);
      callback(pupils);
    });
  }

  getPupil(pupilKey: string, callback) {
    return this.ref.child(pupilKey).on('value', (itm) => {
      var pupil = itm.val();
      pupil.key = pupilKey;
      callback(pupil);
    });
  }

  addPupil(pupil: Pupil): string {
    var pupilKey = this.ref.push(pupil).key;
    return pupilKey;
  }

  addCourseForPupil(pupilId: string, courseId: string){
    return this.ref.child(pupilId).once('value', (s) => {
      var pupil = s.val();
      var coursesId = pupil.coursesId != undefined ? pupil.coursesId : {};
      coursesId[courseId] = true;
      this.ref.child(pupilId).child('coursesId').set(coursesId);
    });
  }

  removeCourseForPupil(pupilId: string, courseId: string){
    return this.ref.child(pupilId).once('value', (s) => {
      var pupil = s.val();
      var coursesId = pupil.coursesId != undefined ? pupil.coursesId : {};
      delete coursesId[courseId];
      this.ref.child(pupilId).child('coursesId').set(coursesId);
    });
  }

  addDevoirForPupil(pupilId: string, devoirId: string){
    return this.ref.child(pupilId).once('value', (s) => {
      var pupil = s.val();
      var devoirsId = pupil.devoirsId != undefined ? pupil.devoirsId : {};
      devoirsId[devoirId] = true;
      this.ref.child(pupilId).child('devoirsId').set(devoirsId);
    });
  }

  removeDevoirForPupil(pupilId: string, devoirId: string){
    return this.ref.child(pupilId).once('value', (s) => {
      var pupil = s.val();
      var devoirIds = pupil.devoirIds != undefined ? pupil.devoirIds : {};
      delete devoirIds[devoirId];
      this.ref.child(pupilId).child('devoirsId').set(devoirIds);
    });
  }

  updatePupil(pupilKey: string, pupil: Pupil) {
    this.ref.child(pupilKey).set(pupil);
  }

  deletePupil(pupilKey: string) {
    this.ref.child(pupilKey).remove();
  }
}
