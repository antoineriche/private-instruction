import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';

import { Pupil } from '../beans/pupil';

import { ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'app-testodal',
  templateUrl: './testodal.page.html',
  styleUrls: ['./testodal.page.scss'],
})
export class TestodalPage implements OnInit {

  pupil: Pupil;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  distance: string;

  constructor(private nav: NavController,private modalCtrl: ModalController, public navParams: NavParams) {
    this.distance = "?";
  }

  ngOnInit() {
    this.pupil = this.navParams.get('pupil');
    this.initMap(this.map, this.pupil);
  }

  initMap(map: any, pupil: Pupil){
    var home = new google.maps.LatLng(44.860153, -0.558017);
    var pupilPlace = new google.maps.LatLng(pupil.place.latitude, pupil.place.longitude);

    map = new google.maps.Map(this.mapElement.nativeElement, {
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

    this.addMarker(pupilPlace, map, '');
    this.addMarker(home, map, 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png');
  }

  // Adds a marker to the map.
  addMarker(location, map, icon) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: icon
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
