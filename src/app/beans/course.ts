import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


export class Course {
  chapter: string;
  comment: string;
  courseStatus: number;
  date: number;
  duration: number;
  money: number;
  paymentStatus: number;
  pupilId: string;
  rate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseUtils {

  getFriendlyDuration(duration: number): string {
    var friendlyDuration= '';
    switch(duration){
      case 90:
        friendlyDuration = "1h30";
        break;
      case 120:
        friendlyDuration = "2h00";
        break;
      default:
        friendlyDuration = "1h00";
        break;
    }
    return friendlyDuration;
  }

  getCourseStatus(courseStatus: number): string {
    var friendlyStatus= '';
    switch(courseStatus){
      case 0:
        friendlyStatus = "Done";
        break;
      case 2:
        friendlyStatus = "Cancelled";
        break;
      default:
        friendlyStatus = "Foreseen";
        break;
    }
    return friendlyStatus;
  }

  getPaymentStatus(paymentStatus: number): string {
    var friendlyStatus= '';
    switch(paymentStatus){
      case 0:
        friendlyStatus = "Waiting for payment";
        break;
      case 1:
        friendlyStatus = "Paid";
        break;
    }
    return friendlyStatus;
  }

  iconFromStatus(courseStatus: number): any[2]{
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

  getFriendlyTime(date: number, duration: number): string{
    var start = new DatePipe('en-US').transform(date, 'HH:mm');
    var end = new DatePipe('en-US').transform((date + duration * 60 * 1000), 'HH:mm');

    return start + " - " + end;
  }

}
