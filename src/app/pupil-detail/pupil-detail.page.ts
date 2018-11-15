import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router  } from '@angular/router';

import { PupilsService } from '../pupils.service';
import { CourseService } from '../course.service';
import { DevoirService } from '../devoir.service';

import { NavController, Platform, ActionSheetController, AlertController, ModalController } from '@ionic/angular';

import { Pupil, PupilUtils } from '../beans/pupil';
import { Devoir } from '../beans/devoir';
import { Course, CourseUtils } from '../beans/course';

import { TestodalPage } from '../testodal/testodal.page';


@Component({
  selector: 'app-pupil-detail',
  templateUrl: './pupil-detail.page.html',
  styleUrls: ['./pupil-detail.page.scss'],
})
export class PupilDetailPage implements OnInit {

  pupil: Pupil;
  courses: Course[];
  devoirs: Devoir[];
  pupilKey: string;
  courseCounter: number;
  devoirCounter: number;

  constructor(public pupilsService: PupilsService, public courseService: CourseService, public devoirService: DevoirService,
              public router: Router, private route: ActivatedRoute, public actionSheetController: ActionSheetController,
              public alertController: AlertController, private courseUtils: CourseUtils,
              private modalCtrl:ModalController, private pupilUtils: PupilUtils) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Warning !',
      message: 'If you remove this pupil, all his courses will be deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.pupilsService.deletePupil(this.pupilKey)
            this.router.navigate(['/pupil-list/']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Edit',
        icon: 'create',
        handler: () => {
          console.log('Edit')
          this.router.navigate(['/pupil-form/' + this.pupilKey]);
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  getPupil(pupilKey: string) {
    this.pupilsService.getPupil(this.pupilKey, (itm) => {
      this.pupil = itm;

      if(this.pupil.coursesId){
        this.courses = [];
        this.getCourses(this.pupil.coursesId);
      }

      if(this.pupil.devoirsId){
        this.devoirs = [];
        this.getDevoirs(this.pupil.devoirsId);
      }

      console.log(this.pupil)

      this.courseCounter = this.pupil.coursesId != undefined ? Object.keys(this.pupil.coursesId).length : 0;
      this.devoirCounter = this.pupil.devoirsId != undefined ? Object.keys(this.pupil.devoirsId).length : 0;
    });
  }

  getCourses(coursesId){
    Object.keys(coursesId).forEach(
      courseId => {
        this.courseService.getCourse(courseId,
        (course) => {
          this.courses.push(course);
          this.sortArrayByDate(this.courses, 'date');
        }, false);
      });
  }

  getDevoirs(devoirsId){
    Object.keys(devoirsId).forEach(
      devoirId => {
        this.devoirService.getDevoir(devoirId,
        (devoir) => {
          this.devoirs.push(devoir);
          this.sortArrayByDate(this.devoirs, 'date');
        }, false);
      });
  }

  sortArrayByDate(array: any[], criteria: string) {
    array.sort(function (a, b) { return ('' + a[criteria]).localeCompare(b[criteria]); });
    array = array.reverse();
  }

  ngOnInit() {
    this.pupilKey = this.route.snapshot.paramMap.get('key');
    this.getPupil(this.pupilKey);
  }

  async showModal(){
    const modal = await this.modalCtrl.create({
     component: TestodalPage,
     componentProps: { pupil: this.pupil }
   });

   return await modal.present();
  }

}
