import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

import { CourseService } from '../course.service';
import { PupilsService } from '../pupils.service';

import { Observable } from 'rxjs';
import { NavController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

import { Pupil, PupilUtils } from '../beans/pupil';
import { Course, CourseUtils } from '../beans/course';

import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  course: Course;
  courseKey: string;

  constructor(public courseService: CourseService, public router: Router, private route: ActivatedRoute,
      public actionSheetController: ActionSheetController, public alertController: AlertController,
      public courseUtils: CourseUtils, private pupilUtils: PupilUtils) { }


  getCourse (courseKey: string) {
    this.courseService.getCourse(this.courseKey, (itm) => { this.course = itm; } );
  }

  updateCourseStatus(newStatus: number){
    this.course.courseStatus = newStatus;
    this.courseService.updateCourse(this.courseKey, this.course);
  }

  updatePaymentStatus(newStatus: number){
    this.course.paymentStatus = newStatus;
    this.courseService.updateCourse(this.courseKey, this.course);
  }

  getButtonsFromCourse(course: Course): any[]{
    var buttons = [
      {
        text: 'Edit',
        icon: 'create',
        handler: () => { this.router.navigate(['/course-form/' + this.courseKey]); }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];

    // Deal with course status
    if(course.courseStatus == 2){
      buttons.push({
        text: 'Schedule course',
        icon: 'time',
        handler: () => {
          this.updateCourseStatus(1);
          console.log('schedule course'); }
      });
    } else if (course.courseStatus != 0){
        buttons.push({
          text: 'Cancel course',
          icon: 'close',
          handler: () => {
            this.updateCourseStatus(2);
            console.log('cancel course');
          }
        });
        buttons.push({
          text: 'Validate course',
          icon: 'checkmark-circle',
          handler: () => {
            this.updateCourseStatus(0);
            console.log('valid course');
          }
        });
    }

    // Deal with payment status
    if(course.paymentStatus == 0){  // Waiting
      buttons.push({
        text: 'Declared as paid',
        icon: 'logo-euro',
        handler: () => {
          this.updatePaymentStatus(1);
          console.log('Declared as paid'); }
      });
    } else {
      buttons.push({
        text: 'Waiting for payment',
        icon: 'logo-euro',
        handler: () => {
          this.updatePaymentStatus(0);
          console.log('Declared as not paid'); }
      });
    }

    buttons.push({
      text: 'Delete',
      icon: 'trash',
      handler: () => {
        this.presentAlertConfirm();
      }
    });

    return buttons;
  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetController.create({
      buttons: this.getButtonsFromCourse(this.course)
    });

    await actionSheet.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Warning !',
      message: 'Do you really want to remove this course ? You can also cancel it.',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.courseService.deleteCourse(this.courseKey, this.course.pupilId)
            this.router.navigate(['/course-list/']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.courseKey = this.route.snapshot.paramMap.get('key');
    this.getCourse(this.courseKey);
  }
}
