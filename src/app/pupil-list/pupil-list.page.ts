import { Component , OnInit} from '@angular/core';

import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { PupilsService } from '../pupils.service';
import { Observable } from 'rxjs';

import { Pupil } from '../beans/pupil';
import { PopoverPage } from '../popover/popover.page';


@Component({
  selector: 'app-pupil-list',
  templateUrl: './pupil-list.page.html',
  styleUrls: ['./pupil-list.page.scss'],
})
export class PupilListPage implements OnInit {

  pupils: Pupil[];
  sortCriteria: string;
  inverse: boolean;
  sortOrderIcon: string;
  showFilters: boolean;
  load: boolean;

  constructor(public pupilsService: PupilsService, public router: Router, public loadingController: LoadingController,
              public popoverController: PopoverController) {
    this.inverse = false;
    this.sortCriteria = 'firstname';
    this.sortOrderIcon = 'arrow-dropup-circle';
    this.showFilters = false;
  }

  // best help ever: https://forum.ionicframework.com/t/popovers-in-ionic-4/137426
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverPage,
  //     componentProps: {message: 'passed message', popoverController: this.popoverController},
  //     event: ev
  //   });
  //   return await popover.present();
  // }

  getPupils (callback) {
    this.load = true;
    return this.pupilsService.getPupils(callback);
  }

  sortPupils(criteria: string) {
    this.pupils.sort(function (a, b) {
      return ('' + a[criteria]).localeCompare(b[criteria]);
    })

    if(this.inverse){
      this.pupils = this.pupils.reverse();
    }
  }

  reverseList(){
    this.pupils = this.pupils.reverse();
    this.inverse = !this.inverse;
    this.sortOrderIcon = this.inverse ? 'arrow-dropdown-circle' : 'arrow-dropup-circle';
  }

  ngOnInit() {
    this.getPupils(itm => {
      this.load = false;
      this.pupils = itm;
      this.sortPupils(this.sortCriteria);
    });
  }

}
