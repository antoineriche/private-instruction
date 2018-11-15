import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestodalPage } from './testodal.page';

const routes: Routes = [
  {
    path: '',
    component: TestodalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestodalPage],
  entryComponents: [TestodalPage]
})
export class TestodalPageModule {}
