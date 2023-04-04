import { ProfileService } from '../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
	username!: string;
	user_uid!: string;

	calorieToday!: number;
	calorieYesterday!: number;
	weight!: number;
	idealWeight!: number;

	user_gender: any;
	bmr!: number;
	user_height!: number;
	user_age!: number;

  constructor(
		private loadingController: LoadingController,
		private alertController: AlertController,
	  private router: Router,
	  private profileService: ProfileService,
  ) { 
	  const user_n = this.profileService.getUserName();
	  if (user_n) {
		  this.username = user_n;
	  }

  }
	
	
	ionViewDidEnter() {
		this.getProfile();
}
	
	async getProfile() {
	  
		const loading = await this.loadingController.create();
		await loading.present();

		this.user_height = await this.profileService.getUserHeight();
		this.user_gender = await this.profileService.getUserGender();
		this.user_age = await this.profileService.getUserAge();

	this.weight = await this.profileService.getUserWeight();
	this.calorieToday = await this.profileService.getUserCalorieToday();
	this.calorieYesterday = await this.profileService.getUserCalorieYesterday();
		this.idealWeight = await this.profileService.getUserIdealWeight();
		
		if (this.user_height) {
			this.getBMR();
		}
		await loading.dismiss();
}
	
	goToRestaurants() {
		this.router.navigate(['/restaurants']);
	  
	}
	
	goToAccount() {
		this.router.navigate(['/account']);
	}

	goToRecommendation() {
		this.router.navigate(['/recommendation'])
	}
  
  	async showAlert(header: any, message: any) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
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
	
	getBMR() {
		if (this.user_gender.toLowerCase() == "male") {
			this.bmr = Math.round((88.362 + (13.397 * this.weight) + (4.799 * this.user_height) - (5.677 * this.user_age)) * 100 / 100);
		} else if (this.user_gender.toLowerCase() == "female"){
			this.bmr = Math.round((447.593 + (9.247 * this.weight) + (3.098 * this.user_height) - (4.330 * this.user_age)) * 100 / 100);
		} else {
			return "PLease update your gender correctly (male/female)."
		}
	
		return this.bmr;
	  }

}
