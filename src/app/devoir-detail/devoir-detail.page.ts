import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

import { DevoirService } from '../devoir.service';
import { Devoir, DevoirUtils } from '../beans/devoir';
import { PupilUtils } from '../beans/pupil';

@Component({
  selector: 'app-devoir-detail',
  templateUrl: './devoir-detail.page.html',
  styleUrls: ['./devoir-detail.page.scss'],
})
export class DevoirDetailPage implements OnInit {

  devoirKey: string;
  devoir: Devoir;

  constructor(private devoirService: DevoirService, private route: ActivatedRoute, public devoirUtils: DevoirUtils,
    private pupilUtils: PupilUtils, public actionSheetController: ActionSheetController,
    public router: Router, public alertController: AlertController) { }

    getButtonsFromDevoir(devoir: Devoir): any[]{
      var buttons = [
        {
          text: 'Edit',
          icon: 'create',
          handler: () => { this.router.navigate(['/devoir-form/' + this.devoirKey]); }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ];

      // Deal with devoir status
       if (devoir.status != 0){
          buttons.push({
            text: 'Validate devoir',
            icon: 'checkmark-circle',
            handler: () => {
              this.updateDevoirStatus(0);
              console.log('valid devoir');
            }
          });
      } else {
        buttons.push({
          text: 'Foreseen devoir',
          icon: 'time',
          handler: () => {
            this.updateDevoirStatus(1);
            console.log('foreseen devoir');
          }
        });
      }

      buttons.push({
        text: 'Delete',
        icon: 'trash',
        handler: () => { this.presentAlertConfirm(); }
      });

      return buttons;
    }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetController.create({
      buttons: this.getButtonsFromDevoir(this.devoir)
    });

    await actionSheet.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Warning !',
      message: 'Do you really want to remove this devoir ?',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.devoirService.deleteDevoir(this.devoirKey, this.devoir.pupilId)
            this.router.navigate(['/devoir-list/']);
          }
        }
      ]
    });

    await alert.present();
  }

  updateDevoirStatus(newStatus: number){
    this.devoir.status = newStatus;
    this.devoirService.updateDevoir(this.devoirKey, this.devoir);
  }

  ngOnInit() {
    this.devoirKey = this.route.snapshot.paramMap.get('key');
    this.devoirService.getDevoir(this.devoirKey,
      (devoir) => { this.devoir = devoir; },
      true
    );
  }

}
