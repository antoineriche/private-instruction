import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { NavController } from '@ionic/angular';

import { PupilsService } from '../pupils.service';
import { Observable } from 'rxjs';

import { Place } from '../beans/place';
import { Pupil } from '../beans/pupil';

declare var google;

//TODO check Pupil place
//TODO Pupil phone numbers

@Component({
  selector: 'app-pupil-form',
  templateUrl: './pupil-form.page.html',
  styleUrls: ['./pupil-form.page.scss'],
})
export class PupilFormPage implements OnInit {

  address: Place;
  pupil: Pupil;
  pupilKey: string;
  isEditing: boolean;
  pupilForm: FormGroup;
  classLevels = ['Sixième', 'Cinquième', 'Quatrième', 'Troisième', 'Seconde', 'Première', 'Terminale'];

  constructor(public pupilsService: PupilsService, private route: ActivatedRoute, public router: Router,
              private formBuilder: FormBuilder) {}

  getPupil (pupilKey: string) {
    return this.pupilsService.getPupil(pupilKey,
      (itm) => {
        this.pupil = itm;
        this.address = this.pupil.place;
        this.fillForm(this.pupilForm, this.pupil);
      })
  }

  fillForm(form: FormGroup, pupil: Pupil){
    form.controls.firstname.setValue(pupil.firstname);
    form.controls.lastname.setValue(pupil.lastname);
    form.controls.classLevel.setValue(pupil.classLevel);
    form.controls.gender.setValue(pupil.gender);
    form.controls.hourlyPrice.setValue(pupil.hourlyPrice);
    form.controls.place.setValue(pupil.place.address);
    form.controls.phone.setValue(pupil.phone);
    form.controls.parentPhone.setValue(pupil.parentPhone);
  }

  saveInfo() {

    var ppupil = this.pupilForm.value;

    if(this.address != undefined){
      ppupil.place = this.address;
    }

    ppupil = JSON.parse(JSON.stringify(ppupil));

    if(!this.isEditing){
      this.pupilKey = this.pupilsService.addPupil(ppupil);
    } else {

      if(this.pupil.coursesId != undefined){
        ppupil.coursesId = this.pupil.coursesId;
      }
      this.pupilsService.updatePupil(this.pupilKey, ppupil);
    }

    this.router.navigate(['/pupil-list']);
  }

  ngOnInit() {
    this.pupilKey = this.route.snapshot.paramMap.get('key');
    this.isEditing = this.pupilKey != undefined;

    this.pupilForm = this.formBuilder.group({
      'firstname' : ['', [ Validators.required, Validators.minLength(2) ] ],
      'lastname' : ['', [ Validators.required, Validators.minLength(2) ] ],
      'classLevel' : ['', Validators.required],
      'gender' : ['', Validators.required],
      'place' : [null, Validators.required],
      'phone' : ['',  Validators.minLength(10)],
      'parentPhone' : ['',  Validators.minLength(10)],
      'hourlyPrice' : [null, [ Validators.required, Validators.min(0) ] ]
    });

    if(this.isEditing){
      console.log('Retrieving pupil');
      this.getPupil(this.pupilKey);
      // this.getPupil(this.key).subscribe(
      //   itm => {
      //     this.pupil = itm;
      //     this.address = this.pupil.place;
      //     this.fillForm(this.pupilForm, this.pupil);
      //   }
      // );
    }

    this.initPlaceAutocomplete();
  }

  initPlaceAutocomplete() {
    let input = document.getElementById('place');
    let autocomplete = new google.maps.places.Autocomplete(input);

    // Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions({'country': ['fr']});
    // Specify only the data fields that are needed.
    autocomplete.setFields(['geometry','formatted_address']);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
       let gPlace = autocomplete.getPlace();
       console.log(gPlace);
       this.address = {
         latitude: gPlace.geometry.location.lat(),
         longitude: gPlace.geometry.location.lng(),
         address: gPlace.formatted_address
       }
       console.log(this.address);
     });
  }

}
