import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';

import { PupilFormPage } from './pupil-form.page';

const routes: Routes = [
  {
    path: '',
    component: PupilFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PupilFormPage]
})
export class PupilFormPageModule {}
