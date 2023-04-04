import { Component, OnInit } from '@angular/core';
import { AntService } from '../services/ant.service';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ant',
  templateUrl: './ant.page.html',
  styleUrls: ['./ant.page.scss'],
})

  
  
export class AntPage implements OnInit {
  doc_info: any = [];


  document_id_anteatery_breakfast: any = [];
  document_id_anteatery_lunch: any = [];
  document_id_anteatery_dinner: any = [];

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private antService: AntService,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.getAnteateryBreakfastInfo();
    this.getAnteateryLunchInfo();
    this.getAnteateryDinnerInfo();
    await loading.dismiss();
  }


  async getAnteateryBreakfastInfo() {
    // structure of doc_info is { id: doc.id, ...doc.data() }

    await this.antService.getAnteateryBreakfast().then(doc_list => {
      doc_list.forEach((document_id: { id: any; calorie: any}) => {
        this.document_id_anteatery_breakfast.push({my_id: document_id.id, calorie: document_id.calorie });
      });
    });

    return this.document_id_anteatery_breakfast;
  }

  async getAnteateryLunchInfo() {

    await this.antService.getAnteateryLunch().then(doc_list => {
      doc_list.forEach((document_id: { id: any; calorie: any}) => {
        this.document_id_anteatery_lunch.push({my_id: document_id.id, calorie: document_id.calorie });
        
      });
    });

    return this.document_id_anteatery_lunch;

  }


  async getAnteateryDinnerInfo() {

    await this.antService.getAnteateryDinner().then(doc_list => {
      doc_list.forEach((document_id: { id: any; calorie: any}) => {
        this.document_id_anteatery_dinner.push({my_id: document_id.id, calorie: document_id.calorie });
      });
    });

    return this.document_id_anteatery_dinner;

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


  goToInfoPage(meal: any) {
    this.router.navigate(['/dishinfo', JSON.stringify({name: meal.my_id, calorie: meal.calorie})]);
  }


}
