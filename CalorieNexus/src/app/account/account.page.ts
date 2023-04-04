import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
	
export class AccountPage {
	username!: string;

	// public alraedyGetProfile = false;

	gender: string = "null";
	age: number = 0;
	calorieToday: number = 0;
	calorieYesterday: number = 0;
	height: number = 0;
	weight: number = 0;
	idealWeight: number = 0;


  constructor(
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
	  private router: Router,

	  private profileService: ProfileService,

  ) { 
	  const user_n = this.profileService.getUserName();

	if (user_n) {
		this.username = user_n;
		this.getProfile();
	}
	  
	
  }
	ngOnInit() {
		
  }

	
	async getProfile() {
		const loading = await this.loadingController.create();
		await loading.present();
		this.gender = await this.profileService.getUserGender();
		this.age = await this.profileService.getUserAge();
		this.height = await this.profileService.getUserHeight();
		this.weight = await this.profileService.getUserWeight();
		this.calorieToday = await this.profileService.getUserCalorieToday();
		this.calorieYesterday = await this.profileService.getUserCalorieYesterday();
		this.idealWeight = await this.profileService.getUserIdealWeight();

		// this.alraedyGetProfile = true;

		await loading.dismiss();
	}
	
  async updateProfile() {
		const loading = await this.loadingController.create();
	  await loading.present();

	  await this.profileService.updateUserProfile(this.age,
		  this.calorieYesterday,
		  this.calorieToday,
		  this.gender,
		  this.height,
		  this.idealWeight,
		  this.weight);
	  
	  await loading.dismiss();
	  this.showAlert('Successfully Updated Profile', '');
	//   this.alraedyGetProfile = false;

  }

  goToRestaurants() {
	this.router.navigate(['/restaurants']);
  
}

goToHome() {
	this.router.navigate(['/home']);
}


  async logout() {
		const loading = await this.loadingController.create();
		await loading.present();

	  const user = await this.authService.logout();
	  await loading.dismiss();
	  this.showAlert('Successfully Logged Out', '');
	  this.router.navigateByUrl('', { replaceUrl: true });

  }
  
  async showAlert(header: any, message: any) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

}


