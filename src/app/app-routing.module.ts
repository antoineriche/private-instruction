import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pupil-form', loadChildren: './pupil-form/pupil-form.module#PupilFormPageModule' },
  { path: 'pupil-form/:key', loadChildren: './pupil-form/pupil-form.module#PupilFormPageModule' },
  { path: 'pupil-detail/:key', loadChildren: './pupil-detail/pupil-detail.module#PupilDetailPageModule' },
  { path: 'pupil-list', loadChildren: './pupil-list/pupil-list.module#PupilListPageModule' },
  { path: 'popover', loadChildren: './popover/popover.module#PopoverPageModule' },
  { path: 'course-list', loadChildren: './course-list/course-list.module#CourseListPageModule' },
  { path: 'course-form', loadChildren: './course-form/course-form.module#CourseFormPageModule' },
  { path: 'course-form/:key', loadChildren: './course-form/course-form.module#CourseFormPageModule' },
  { path: 'course-detail/:key', loadChildren: './course-detail/course-detail.module#CourseDetailPageModule' },
  { path: 'week', loadChildren: './week/week.module#WeekPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'devoir-list', loadChildren: './devoir-list/devoir-list.module#DevoirListPageModule' },
  { path: 'devoir-form', loadChildren: './devoir-form/devoir-form.module#DevoirFormPageModule' },
  { path: 'devoir-form/:key', loadChildren: './devoir-form/devoir-form.module#DevoirFormPageModule' },
  { path: 'devoir-detail/:key', loadChildren: './devoir-detail/devoir-detail.module#DevoirDetailPageModule' },
  { path: 'testodal', loadChildren: './testodal/testodal.module#TestodalPageModule' },
  { path: 'bilan', loadChildren: './bilan/bilan.module#BilanPageModule' },
  { path: 'evolution', loadChildren: './evolution/evolution.module#EvolutionPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
