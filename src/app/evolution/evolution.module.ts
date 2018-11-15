import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvolutionPage } from './evolution.page';

import { PlotlyModule } from 'angular-plotly.js';

const routes: Routes = [
  {
    path: '',
    component: EvolutionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    PlotlyModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvolutionPage]
})
export class EvolutionPageModule {}
