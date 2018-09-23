import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { DevoirService } from '../devoir.service';
import { PupilsService } from '../pupils.service';

import { Pupil } from '../beans/pupil';
import { Devoir } from '../beans/devoir';

// TODO: check

@Component({
  selector: 'app-devoir-form',
  templateUrl: './devoir-form.page.html',
  styleUrls: ['./devoir-form.page.scss'],
})
export class DevoirFormPage implements OnInit {

  pupils: Pupil[];
  key: string;
  devoir: Devoir;
  devoirForm: FormGroup;
  currentDate: string;
  isEditing: boolean;

  constructor(private pupilService: PupilsService, private devoirService: DevoirService,
    private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder) { }

    getPupils() {
      return this.pupilService.getPupils( (itm) => {this.pupils = itm});
    }

    getDevoir(key: string){
      return this.devoirService.getDevoir(key,
        itm => {
          this.devoir = itm;
          this.fillForm(this.devoirForm, this.devoir);
        })
    }

    timestampFromString(devoir: any): number{
      console.log(devoir);
      let strDate;

      if(devoir.day.year == undefined){
        strDate = devoir.day;
        strDate = devoir.day.split('T')[0];
      } else {
        strDate = devoir.day.year.text + "-" + devoir.day.month.text + "-" + devoir.day.day.text;
      }

      strDate = strDate + " 00:00:00";

      console.log(strDate);
      return new Date(strDate).getTime();
    }

    saveDevoir(){
      console.log(this.devoirForm.value);
      var ddevoir = this.devoirForm.value;
      var fbRef;

      var devoir: Devoir = {
        chapter: this.devoirForm.value.chapter,
        comment: this.devoirForm.value.comment,
        status: this.isEditing ? this.devoir.status : 1,
        date: this.timestampFromString(ddevoir),
        pupilId: this.devoirForm.value.pupilId,
        mark: this.devoirForm.value.mark,
        maxMark: this.devoirForm.value.maxMark,
      }

      console.log(devoir);

      if(!this.isEditing){
          this.key = this.devoirService.addDevoir(devoir);
      } else {
        this.devoirService.updateDevoir(this.key, devoir);
      }

      this.router.navigate(['/devoir-list']);
    }

    fillForm(form: FormGroup, devoir: Devoir){
      form.controls.chapter.setValue(devoir.chapter);
      form.controls.comment.setValue(devoir.comment);
      form.controls.pupilId.setValue(devoir.pupilId);

      var date = new DatePipe('en-US').transform(devoir.date, 'yyyy-MM-dd');
      form.controls.day.setValue(new Date(date).toISOString());

      form.controls.mark.setValue(devoir.mark);
      form.controls.maxMark.setValue(devoir.maxMark);
    }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.isEditing = this.key != undefined;

    this.getPupils();

    this.devoirForm = this.formBuilder.group({
      'pupilId' : ['', [ Validators.required ] ],
      'day' : ['', [ Validators.required ] ],
      'chapter' : ['',  Validators.minLength(3)],
      'comment' : ['',  Validators.minLength(3)],
      'mark' : ['',  [ Validators.min(0) ] ],
      'maxMark' : ['',  [ Validators.min(0) ] ]
    });

    if(this.isEditing){
      console.log('Retrieving devoir');
      this.getDevoir(this.key);
    }
  }

}
