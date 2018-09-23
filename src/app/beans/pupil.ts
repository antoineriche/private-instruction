import { Injectable } from '@angular/core';
import { Place } from "./place";

export class Pupil {
  classLevel: string;
  creation: number;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  parentPhone: string;
  hourlyPrice: number;
  place: Place;
  coursesId: string[];
  devoirsId: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PupilUtils {

  getFullName(pupil: Pupil): string {
    return pupil.firstname + " " + pupil.lastname;
  }
}
