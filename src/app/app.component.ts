import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDciqXgvwkIq_NWzp08z99or224EJagC5E',
  authDomain: "pifirebaseproject-da97d.firebaseapp.com",
  databaseURL: "https://pifirebaseproject-da97d.firebaseio.com",
  projectId: "pifirebaseproject-da97d",
  storageBucket: "pifirebaseproject-da97d.appspot.com",
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '', icon: 'home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'speedometer' },
    { title: 'Week', url: '/week', icon: 'calendar' },
    { title: 'Pupils', url: '/pupil-list', icon: 'people' },
    { title: 'Courses', url: '/course-list', icon: 'book' },
    { title: 'Devoirs', url: '/devoir-list', icon: 'clipboard' },
    { title: 'Evolution', url: '/evolution', icon: 'stats' },
    { title: 'Profile', url: '/course-list', icon: 'person' },
    { title: 'Bilan', url: '/bilan', icon: 'archive' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
