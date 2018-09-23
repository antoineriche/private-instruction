import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { CourseService } from '../course.service';
import { PupilsService } from '../pupils.service';

import { Pupil } from '../beans/pupil';
import { Course } from '../beans/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.page.html',
  styleUrls: ['./course-form.page.scss'],
})
export class CourseFormPage implements OnInit {

  pupils: Pupil[];
  courseKey: string;
  course: Course;
  courseForm: FormGroup;
  currentDate: string;
  isEditing: boolean;
  rating: number;

  constructor(private pupilService: PupilsService, private courseService: CourseService,
    private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder) { }

  getPupils() {
    return this.pupilService.getPupils( (itm) => {this.pupils = itm});
  }

  getCourse(courseKey: string) {
    return this.courseService.getCourse(courseKey,
      (itm) => {
        this.course = itm;
        this.fillForm(this.courseForm, this.course);
      })
  }

  timestampFromString(course: any): number{
    console.log(course);
    let strDate;

    if(course.day.year == undefined){
      strDate = course.day;
      strDate = course.day.split('T')[0];
    } else {
      strDate = course.day.year.text + "-" + course.day.month.text + "-" + course.day.day.text;
    }

    strDate = strDate + " ";

    if(course.hour.hour == undefined){
      strDate = strDate + course.hour;
    } else {
      strDate = strDate + course.hour.hour.text + ":" + course.hour.minute.text;
    }
    strDate = strDate + ":00";

    return new Date(strDate).getTime();
  }

  saveCourse() {
    var ccourse = this.courseForm.value;
    var fbRef;

    var course: Course = {
      chapter: this.courseForm.value.chapter,
      courseStatus: this.isEditing ? this.course.courseStatus : 1,
      date: this.timestampFromString(ccourse),
      duration: +this.courseForm.value.duration,
      money: this.courseForm.value.money,
      paymentStatus: this.isEditing ? this.course.paymentStatus : 0,
      pupilId: this.courseForm.value.pupilId,
      rate: this.courseForm.value.rating,
      comment: this.courseForm.value.comment
    }

    // console.log(course);

    if(!this.isEditing){
        this.courseKey = this.courseService.addCourse(course);
    } else {
      this.courseService.updateCourse(this.courseKey, course);
    }

    this.router.navigate(['/course-list']);
  }

  fillForm(form: FormGroup, course: Course){
    form.controls.money.setValue(course.money);
    form.controls.chapter.setValue(course.chapter);
    form.controls.duration.setValue(""+course.duration);
    form.controls.pupilId.setValue(this.course.pupilId);

    var date = new DatePipe('en-US').transform(course.date, 'yyyy-MM-dd');
    var hour = new DatePipe('en-US').transform(course.date, 'HH:mm');

    form.controls.day.setValue(new Date(date).toISOString());
    form.controls.hour.setValue(hour);

    form.controls.rating.setValue(this.course.rate);
    form.controls.comment.setValue(this.course.comment);
  }

  ngOnInit() {
    this.courseKey = this.route.snapshot.paramMap.get('key');
    this.isEditing = this.courseKey != undefined;
    this.getPupils();

    this.courseForm = this.formBuilder.group({
      'pupilId' : ['', [ Validators.required ] ],
      'day' : ['', [ Validators.required ] ],
      'hour' : ['', Validators.required],
      'duration' : ['', Validators.required],
      'money' : [null, [ Validators.required, Validators.min(0) ] ],
      'chapter' : ['',  Validators.minLength(3)],
      'rating' : ['',  [ Validators.min(0),  Validators.max(5) ] ],
      'comment' : ['',  Validators.minLength(3)]
    });

    if(this.isEditing){
      this.getCourse(this.courseKey);
    }
  }

}
