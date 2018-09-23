import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseFormPage } from './course-form.page';

import { Ionic2RatingModule } from "ionic2-rating";

const routes: Routes = [
  {
    path: '',
    component: CourseFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ionic2RatingModule
  ],
  declarations: [CourseFormPage]
})
export class CourseFormPageModule {}
