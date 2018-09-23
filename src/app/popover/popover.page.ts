import { Component, OnInit }  from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss']
})
export class PopoverPage {

  message = '';
  pop: PopoverController;

  constructor(navParams: NavParams) {
    this.message = navParams.get('message');
    this.pop = navParams.get('popoverController');
  }

  close() {
    this.pop.dismiss();
  }
}
