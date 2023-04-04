import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
  
export class RestaurantsPage implements OnInit {

  
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  
  currentPosition: any;
  myLat: any;
  myLong: any;

  center: any = {
    // 学校草丛
    lat: 33.64583,
    lng: -117.84281,
  }

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {  
    
  }

  async ngOnInit() {

    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    });

    let latitude: number = pos.coords.latitude;
    let longitude: number = pos.coords.longitude;
    this.myLat = latitude;
    this.myLong = longitude;
  }

  async ngAfterViewInit() {
    // this.ionViewDidEnter();
    // this.initMap();
    // const loading = await this.loadingController.create();
    // await loading.present();

    this.createMap();

    // await loading.dismiss();
  }

  ionViewDidEnter() {
    this.createMap();
    
  }

  async getBrandywineMenus() {
    this.router.navigate(['/bw']);
  }

    getAnteateryMenus() {
    this.router.navigate(['/ant']);
    }
  
  getNearbyRestaurants() {
    this.router.navigate(['/nr']);
    }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }


  async createMap() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 8,
      },
    });
    this.newMap.enableCurrentLocation;

    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.myLat,
        lng: this.myLong,
      },
      title: "Current Position"
    });
    
      await loading.dismiss();
  }
  

}


