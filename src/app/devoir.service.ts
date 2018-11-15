import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Devoir } from './beans/devoir';
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
export class DevoirService {

  private basePath = '/devoirs';
  private ref = firebase.database().ref(this.basePath);

  constructor(private pupilsService: PupilsService) { }

  fetchPupil(devoir: any){
      this.pupilsService.getRootRef().child(devoir.pupilId).once('value').then(function(snapshot) {
        devoir.pupil = snapshot.val();
      });
  }

  getDevoir(devoirKey: string, callback, fetchPupil: boolean) {
    return this.ref.child(devoirKey).on('value', (itm) => {
      var devoir = itm.val();
      devoir.key = devoirKey;
      if(fetchPupil){
        this.fetchPupil(devoir);
      }
      callback(devoir);
    });
  }

  getDevoirs(callback) {
    return this.ref.orderByChild('date').on('value', (s) => {
      var devoirs = snapshotToArray(s);
      for(let i = 0 ; i < devoirs.length ; i++){
        this.fetchPupil(devoirs[i]);
      }
      callback(devoirs);
    });
  }

  updateDevoir(devoirKey: string, devoir: Devoir) {
    this.ref.child(devoirKey).once('value', (itm) => {
      if(devoir.pupilId != itm.val().pupilId){
        this.pupilsService.addDevoirForPupil(devoir.pupilId, devoirKey);
        this.pupilsService.removeDevoirForPupil(itm.val().pupilId, devoirKey);
      }
    });
    this.ref.child(devoirKey).set(devoir);
  }

  addDevoir(devoir: Devoir): string {
    var devoirKey = this.ref.push(devoir).key;
    this.pupilsService.addDevoirForPupil(devoir.pupilId, devoirKey);
    return devoirKey;
  }

  deleteDevoir(devoirKey: string, pupilId: string) {
    this.pupilsService.removeDevoirForPupil(pupilId, devoirKey);
    this.ref.child(devoirKey).remove();
  }

  getNextDevoir(callback) {
    var devoir = null;
    var date = new Date().getTime();
    return this.ref.orderByChild('date').startAt(date).limitToFirst(1).on('value', (s) => {
      var devoirs = snapshotToArray(s);
      if(devoirs.length > 0){
        devoir = devoirs[0];
        this.fetchPupil(devoir);
      }
      callback(devoir);
    });
  }
}
