import { Component, OnInit } from '@angular/core';

import { Devoir } from '../beans/devoir';
import { Pupil, PupilUtils } from '../beans/pupil';
import { DevoirService } from '../devoir.service';
import { PupilsService } from '../pupils.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})
export class EvolutionPage implements OnInit {

  graph: any;
  loadPupils: boolean;
  pupils: any[];
  selectedPupil: Pupil;
  devoirs: Devoir[];

  constructor(private devoirService: DevoirService, private pupilService: PupilsService) {
    this.resetGraph();
  }

  getPupils(){
    this.loadPupils = true;
    return this.pupilService.getPupils(itm => {
      this.pupils = itm;
      this.loadPupils = false;
    });
  }

  getDevoirs(devoirsId){
    this.devoirs = [];
    if(devoirsId){
      Object.keys(devoirsId).forEach(
        devoirId => {
          this.devoirService.getDevoir(devoirId,
          (devoir) => {
            this.devoirs.push(devoir);
            var date = new DatePipe('en-US').transform(devoir.date, 'yyyy-MM-dd');
            var mark = devoir.mark * 20 / devoir.maxMark;
            this.graph.data[0].x.push(date);
            this.graph.data[0].y.push(mark);
          }, false);
        });
      } else {
        console.log('no devoir to fetch');
      }
  }

  sortArrayByDate(array: any[], criteria: string) {
    array.sort(function (a, b) { return ('' + a[criteria]).localeCompare(b[criteria]); });
    // array = array.reverse();
  }

  selectPupil(pupilKey: any){
    console.log(pupilKey);
    this.resetGraph();
    this.selectedPupil = this.pupils.filter(pupil => pupil.key == pupilKey)[0];
    this.getDevoirs(this.selectedPupil.devoirsId);
  }

  resetGraph(){
    this.graph = {
        data: [
            { x: [],
              y: [],
              type: 'bar'
            },
        ],
        layout: {
          width: 300,
          height: 300,
          margin: {
            l:20, r:20, b:20, t:20
          },
          // title: 'A Fancy Plot',
          yaxis: {
            range: [0,20],
            showline: true,
          }},
        config: {displayModeBar: false}
    };
  }

  ngOnInit() {
    this.getPupils();
  }

}
