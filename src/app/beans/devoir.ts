import { Injectable } from '@angular/core';

export class Devoir {
  chapter: string;
  comment: string;
  date: number;
  mark: number;
  maxMark: number;
  pupilId: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class DevoirUtils {

  iconFromStatus(devoirStatus: number): any[2]{
    var result = [];
    switch(devoirStatus){
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

}
