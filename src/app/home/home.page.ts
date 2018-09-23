import { Component , OnInit} from '@angular/core';

import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';

import { PupilsService } from '../pupils.service';
import { Observable } from 'rxjs';


//FOR maps
// import { ViewChild, ElementRef } from '@angular/core';
// import { NavController, Platform } from '@ionic/angular';

declare var google;

/////

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.payload.val();
        item.key = childSnapshot.payload.key;
        returnArr.push(item);
    });

    return returnArr;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  //FOR maps
  // public latitude: number;
  // public longitude: number;
  //
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  // search: string;
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;

  // constructor(public navCtrl: NavController, public platform: Platform) {
  //   platform.ready().then(() => {
  //     this.initMap();
  //   });
  // }
  //
  // ionViewDidLoad(){
  //   this.initMap();
  // }
  //
  // initMap() {
  //   let input = document.getElementById('places');
  //   let autocomplete = new google.maps.places.Autocomplete(input);
  //
  //   google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //    let place = autocomplete.getPlace();
  //    this.latitude = place.geometry.location.lat();
  //    this.longitude = place.geometry.location.lng();
  //    alert(this.latitude + ", " + this.longitude);
  //    console.log(place);
  //  });
  //
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     zoom: 7,
  //     center: {lat: 41.85, lng: -87.65}
  //   });
  //
  //   this.directionsDisplay.setMap(this.map);
  // }

  //////

   //infos = [];
   public infos: any[];
   //ref = firebase.database().ref('items/');

  constructor(public pupilsService: PupilsService, public router: Router, public loadingController: LoadingController){
    // this.ref.on('value', resp => {
    //   this.infos = [];
    //   this.infos = snapshotToArray(resp);
    // });
  }

  addInfo() {
    this.router.navigate(['/add-info']);
  }

  edit(key) {
    this.router.navigate(['/edit/'+key]);
  }

  ngOnInit() {
  }

  // OLD
  // async delete(key) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm!',
  //     message: 'Are you sure want to delete this info?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('cancel');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           firebase.database().ref('infos/'+key).remove();
  //         }
  //       }
  //     ]
  //   });
  //
  //   await alert.present();
  // }

}
