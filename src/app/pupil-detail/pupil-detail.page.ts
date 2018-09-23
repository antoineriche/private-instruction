import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router  } from '@angular/router';

import { PupilsService } from '../pupils.service';

//FOR maps
import { ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

import { Pupil } from '../beans/pupil';


declare var google;

@Component({
  selector: 'app-pupil-detail',
  templateUrl: './pupil-detail.page.html',
  styleUrls: ['./pupil-detail.page.scss'],
})
export class PupilDetailPage implements OnInit {

  pupil: Pupil;
  distance = "?"
  pupilKey: string;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  courseCounter: number;
  devoirCounter: number;

  constructor(public pupilsService: PupilsService, public router: Router,
              private route: ActivatedRoute, public actionSheetController: ActionSheetController,
              public alertController: AlertController) { }

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

      console.log(this.pupil);
      this.courseCounter = this.pupil.coursesId != undefined ? Object.keys(this.pupil.coursesId).length : 0;
      this.devoirCounter = this.pupil.devoirsId != undefined ? Object.keys(this.pupil.devoirsId).length : 0;


      var home = new google.maps.LatLng(44.860153, -0.558017);
      var pupilPlace = new google.maps.LatLng(this.pupil.place.latitude, this.pupil.place.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 10,
          mapTypeControl: false,          // (true? show plan/satellite buttons)
          disableDefaultUI: true,         // (true? hide zoom buttons)
          gestureHandling: 'none',
          center: pupilPlace,
          zoomControl: true
      });

      // this.distance = google.maps.geometry.spherical.computeDistanceBetween (
      //   latLngA,
      //   latLngB);

      this.addMarker(pupilPlace, this.map, '');
      this.addMarker(home, this.map, 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png');
    });
  }

  // Adds a marker to the map.
  addMarker(location, map, icon) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: icon
    });
  }

  ngOnInit() {
    this.pupilKey = this.route.snapshot.paramMap.get('key');
    this.getPupil(this.pupilKey);
  }

}
