import { Component, OnInit } from '@angular/core';

import { AntService } from '../services/ant.service';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bw',
  templateUrl: './bw.page.html',
  styleUrls: ['./bw.page.scss'],
})
export class BwPage implements OnInit {
  doc_info: any = [];


  document_id_brandywine_breakfast: any = [];
  document_id_brandywine_lunch: any = [];
  document_id_brandywine_dinner: any = [];
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private antService: AntService
    
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.getBrandywineBreakfastInfo();
    this.getBrandywineLunchInfo();
    this.getBrandywineDinnerInfo();
    await loading.dismiss();
  }

  async getBrandywineBreakfastInfo() {
    // structure of doc_info is { id: doc.id, ...doc.data() }

    await this.antService.getBrandywineBreakfast().then(doc_list => {
      doc_list.forEach((document_id: { id: any;calorie: any }) => {
        this.document_id_brandywine_breakfast.push({my_id: document_id.id, calorie: document_id.calorie });
      });
    });

    return this.document_id_brandywine_breakfast;
  }

  async getBrandywineLunchInfo() {

    await this.antService.getBrandywineLunch().then(doc_list => {
      doc_list.forEach((document_id: { id: any; calorie: any}) => {
        this.document_id_brandywine_lunch.push({my_id: document_id.id, calorie: document_id.calorie });
        
      });
    });

    return this.document_id_brandywine_lunch;

  }


  async getBrandywineDinnerInfo() {

    await this.antService.getBrandywineDinner().then(doc_list => {
      doc_list.forEach((document_id: { id: any; calorie: any}) => {
        this.document_id_brandywine_dinner.push({my_id: document_id.id, calorie: document_id.calorie });
      });
    });

    return this.document_id_brandywine_dinner;

  }

  getTodayDate() {
    // Cited the code from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const today_string = mm + '/' + dd + '/' + yyyy;
    return today_string
  }

}
