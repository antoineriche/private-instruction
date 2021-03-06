import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PupilDetailPage } from './pupil-detail.page';
import { Ionic2RatingModule } from "ionic2-rating";

const routes: Routes = [
  {
      path: '',
      component: PupilDetailPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ContactPageModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [PupilDetailPage],
})
export class PupilDetailPageModule {}
