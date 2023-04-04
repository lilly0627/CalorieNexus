import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NrService } from '../services/nr.service'; 

import { GoogleMap } from '@capacitor/google-maps';
declare var google: any;



@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
})
export class RecommendationPage implements OnInit {

  // user data we must need: gender, age, weight, height.
  // may not need (may delete): calorie gained yesterday, gained today, ideal weight.

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;


  myLat: any;
  myLong: any;
  
  
  user_name!: string;
  user_gender!: string; // male or female
  user_age!: number; // number
  user_weight!: number; // in kg, user's current weight
  user_idealweight!: number; //in kg, user's target weight
  user_height!: number; // in cm
  user_deltaweight!: number;

  bmr!: number; // save bmr value


  nearby_restaurants: string[] = ["Asian Box", "Blaze Pizza",
    "Blue Bowl Superfoods", "California Gogi", "Chick-fil-A", "Chipotle", "Eurika!", "Gyutan Ramen", "In-N-Out Burger",
    "Luna Grill", "Mad Dumplings", "Northern Cafe", "Panda Express", "Slapfish", "Subway", "Wendy's"]; 
  
  
  asian_box_menus_list: any = [];
  blaze_pizza_menus_list: any = []; // blaze piazza
  blue_bowl_superfoods_menu_list: any = [];
  california_gogi_menu_list: any = [];
  chick_fil_a_menu_list: any = [];
  chipotle_menu_list: any = [];
  eurika_menu_list: any = [];
  gyutan_ramen_menu_list: any = [];
  in_n_out_burger_menu_list: any = [];
  luna_grill_menu_list: any = [];
  mad_dumplings_menu_list: any = [];
  northern_cafe_menu_list: any = [];
  panda_express_menu_list: any = [];
  slapfish_menu_list: any = [];
  subway_menu_list: any = [];
  wendys_menu_list: any = [];


  //["Asian Box", "Blaze Pizza",  "Blue Bowl Superfoods", "California Gogi", "Chick-fil-A", "Chipotle","Eurika!","Gyutan Ramen","In-N-Out Burger",
  //"Luna Grill", "Mad Dumplings", "Northenr Cafe", " Panda Express", "Slapfish", "Subway", "Wendy's"]
 nearby_collection = [
   {
      restaurant_name: "Asian Box",
      menu_list: this.asian_box_menus_list,
      score: 0,
      distance: 0,
      location: {
        lat: 33.6487860,
        long: -117.8320478
      }
    },

   {
     restaurant_name: "Blaze Pizza",
      menu_list: this.blaze_pizza_menus_list,
      score: 0,
      distance: 0,
      location: {
        lat: 33.6498315, 
        long: -117.8391275
      }
    },
  //Latitude: 33.7191772
  //Longitude: -117.9846459
   {
    restaurant_name: "Blue Bowl Superfoods",
      menu_list: this.blue_bowl_superfoods_menu_list,
      score: 0,
      distance: 0,
      location: {
        lat: 33.6492404, 
        long: -117.8393005
      }
   },
   
  //Latitude: 33.6504313
  //Longitude: -117.8409536
  {
    menu_list: this.california_gogi_menu_list,
    restaurant_name:"California Gogi",
    score: 0,
    distance: 0,
    location: {
      lat: 33.6504793, 
      long: -117.8387878
    }
  },


    //Latitude: 33.6496646
    //Longitude: -117.844292
 {
    restaurant_name: "Chick-fil-A",
    menu_list: this.chick_fil_a_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6496311, 
      long: -117.8396141
    }
  },

  //Latitude: 33.6495626
  //Longitude: -117.8415052
  {
    restaurant_name: "Chipotle",
    menu_list: this.chipotle_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6496080,
      long: -117.8393374
    }
  },


  //Latitude: 33.6505959
  //Longitude: -117.8414704
  {
    restaurant_name: "Eurika!",
    menu_list: this.eurika_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6506149, 
      long: -117.8393206
    }
  },


  //Latitude: 33.6507899
  //Longitude: -117.8410141
  {
    restaurant_name: "Gyutan Ramen",
    menu_list: this.gyutan_ramen_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6507880, 
      long: -117.8388013
    }
  },


  //Latitude: 33.6501658
  //Longitude: -117.842833
  {
    restaurant_name: "In-N-Out Burger",
    menu_list: this.in_n_out_burger_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6501469,
      long: -117.8405957
    }
  },

  //Latitude: 33.6506056
  //Longitude: -117.8435683
  {
    restaurant_name: "Luna Grill",
    menu_list: this.luna_grill_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6505912,
      long: -117.8390611
    }
  },

  //Latitude: 33.6505535
  //Longitude: -117.8400765
  {
    restaurant_name: "Mad Dumplings",
    menu_list: this.mad_dumplings_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6505630, 
      long: -117.8379098
    }
  },

  //Latitude: 33.6509961
  //Longitude: -117.8411895
  {
    restaurant_name: "Northern Cafe",
    menu_list: this.northern_cafe_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6510411, 
      long: -117.8390178
    }
  },

  //Latitude: 33.6488747
  //Longitude: -117.8442851
  {
    restaurant_name: "Panda Express",
    menu_list: this.panda_express_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6488536, 
      long: -117.8421631
    }
  },

  //Latitude: 33.649973
  //Longitude: -117.8411506
  {
    restaurant_name: "Slapfish",
    menu_list: this.slapfish_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.649973,
      long: -117.8411506
    }
  },

  //Latitude: 33.6491461
  //Longitude: -117.8446254
  {
    restaurant_name: "Subway",
    menu_list: this.subway_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6491461,
      long: -117.8446254
    }
  },

  //Latitude: 33.6493107
  //Longitude: -117.8448386
  {
    restaurant_name: "Wendy's",
    menu_list: this.wendys_menu_list,
    score: 0,
    distance: 0,
    location: {
      lat: 33.6493205, 
      long: -117.8426838
    }
   },
  
   {
    restaurant_name: "Anteatery",
    menu_list: [],
    score: 0,
    distance: 0,
    location: {
      lat: 33.6507422, 
      long: -117.8455534
     }
   },
   // 33.6456134,-117.8435233
   {
    restaurant_name: "Brandywine",
    menu_list: [],
    score: 0,
    distance: 0,
    location: {
      lat: 33.6456090,
      long: -117.8390386
    },
  
}
    
 ]
  ansianbox_distance!: number;
  num!: number;



  // asianbox_lat = this.nearby_collection['Asian Box'].location.lat;
  // asianbox_long = this.nearby_collection['Asian Box'].location.long;
  // asianbox_update_score!: number;

  constructor(
    private loadingController: LoadingController,
    private profileService: ProfileService,
    private nrService: NrService
  ) { 
    this.getAsianBoxMenuInfo();
    this.getBlazePizzaMenuInfo();
    this.getBlueBowlSuperfoodsMenuInfo();
    this.getCaliforniaGogiMenuInfo();
    this.getChickfilAMenuInfo();
    this.getChipotleMenuInfo();
    this.getEurikaMenuInfo();
    this.getGyutanRamenMenuInfo();
    this.getInNOutBurgerMenuInfo();
    this.getLunaGrillMenuInfo();
    this.getMadDumplingsMenuInfo();
    this.getNorthernCafeMenuInfo();
    this.getPandaExpressMenuInfo();
    this.getSlapfishMenuInfo();
    this.getSubwayMenuInfo();
    this.getWendysMenuInfo();
  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.getProfile();

    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    let latitude: number = pos.coords.latitude;
    let longitude: number = pos.coords.longitude;
    this.myLat = latitude;
    this.myLong = longitude;


    this.setDistance2();
    this.ansianbox_distance = this.nearby_collection[0].distance;
    this.recommendation();


    await loading.dismiss();
  }

  ionViewDidEnter() {
    
  }


  deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }

  setDistance2() {   
    // How to calculate the actual distance in meters based on the latitude and longitude of two places
    this.nearby_collection.forEach(restaurant => {

      var R = 6371; // Radius of the earth in km
      // const lat2 = restaurant.location.long;
      const lat1= this.myLat;
      // const lat3 = lat1 + 1;

      const lon1 = this.myLong;
      // const lon2 = restaurant.location.long;
      // const lon3 = Number(parseFloat(this.myLat));

      // const
      const cdLat = this.deg2rad(restaurant.location.lat - this.myLat);
      const cdLon = this.deg2rad(restaurant.location.long - this.myLong);
      const ad = Math.sin(cdLat / 2) * Math.sin(cdLat / 2) + Math.cos(this.deg2rad(restaurant.location.lat)) * Math.cos(this.deg2rad(this.myLat)) * Math.sin(cdLon / 2) * Math.sin(cdLon / 2);
      const cd = 2 * Math.atan2(Math.sqrt(ad),Math.sqrt(1-ad));

      // this.mylat2 = this.mylat1 + 1.0;
      restaurant.distance = R*cd;
    });

  }


  setDistance() {   
    this.nearby_collection.forEach(restaurant => {

      var R = 6371; // Radius of the earth in km
      const lat2 = this.deg2rad(restaurant.location.lat);
      const lat1= this.deg2rad(this.myLat);
      const lon1 = this.deg2rad(this.myLong);
      const lon2 = this.deg2rad(restaurant.location.long);

      // const cdLat = this.deg2rad(lat2 - this.myLat)
      // const cdLong = this.deg2rad(lon2 - this.myLong)

      // var R = 6371; // Radius of the earth in km
      // const cdLat = this.deg2rad(restaurant.location.lat - this.myLat);
      // const cdLon = this.deg2rad(restaurant.location.long - this.myLong);
      // const ad = Math.sin(cdLat / 2) * Math.sin(cdLat / 2) + Math.cos(this.deg2rad(restaurant.location.lat)) * Math.cos(this.deg2rad(this.myLat)) * Math.sin(cdLon / 2) * Math.sin(cdLon / 2);
      // const cd = 2 * Math.atan2(Math.sqrt(ad), Math.sqrt(1 - ad));
      
      var p = 0.017453292519943295;
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;
      var d = 12742 * Math.asin(Math.sqrt(a));
      restaurant.distance = d;
      
    });

  }
  
  async getProfile() {
		this.user_gender = await this.profileService.getUserGender();
		this.user_age = await this.profileService.getUserAge();
		this.user_height = await this.profileService.getUserHeight();
    this.user_weight = await this.profileService.getUserWeight();
    this.user_idealweight = await this.profileService.getUserIdealWeight();
    this.user_deltaweight = this.user_idealweight - this.user_weight;

    if (this.user_height) {
			this.setBMR();
		}
    console.log(this.user_deltaweight);
    // this.setIdealWeight_Calorie();
  }

  // setIdealWeight_Calorie(){
  //   let InCDes = 0;
  //   if(this.user_idealweight>this.user_weight+0.5){
  //     InCDes = InCDes + 1;
  //   }else if(this.user_idealweight<this.user_weight-0.5){
  //     InCDes = InCDes -1;
  //   }
  //   let 
  // }

  setBMR() {
    // if (this.user_gender.toLowerCase() == "male") {
    //   this.bmr = 88.362 + (13.397 * this.user_weight) + (4.799 * this.user_height) - (5.677 * this.user_age)
    // } else {
    //   this.bmr = 447.593 + (9.247 * this.user_weight) + (3.098 * this.user_height) - (4.330 * this.user_age)
    // }

    // return this.bmr;
    if (this.user_gender.toLowerCase() == "male") {
			this.bmr = Math.round((88.362 + (13.397 * this.user_weight) + (4.799 * this.user_height) - (5.677 * this.user_age)) * 100 / 100);
		} else if (this.user_gender.toLowerCase() == "female"){
			this.bmr = Math.round((447.593 + (9.247 * this.user_weight) + (3.098 * this.user_height) - (4.330 * this.user_age)) * 100 / 100);
		} else {
			return "PLease update your gender correctly (male/female)."
		}
	
		return this.bmr;
  }


  recommendation() {

    // 公式一： score = abs(average_calorie - bmr) * 0.6 + distance * 0.4
    this.nearby_collection.forEach(restaurant => {

      // score = abs(average_calorie - bmr) * 0.6 + distance * 0.4

      const menu_list1: any = restaurant.menu_list;
      let average_calorie = 0;
      menu_list1.forEach((menu: { calorie: number; }) => {

        average_calorie = average_calorie + menu.calorie;

      });


      const average_calorie_1 = average_calorie / 3;
      
      if (average_calorie_1 == 0) { // 如果是学校食堂
        const average_calorie_1 = average_calorie / 3;
      } else {
        const average_calorie_1 = this.bmr;
      }

      let calorie_consum = this.user_weight * restaurant.distance*0.455;//calorie_consume是特定体重的用户前往距离多远的餐厅所消耗的卡路里。

      let calorie_input = average_calorie_1 - this.bmr;
    
      // if restaurant

      let alternativeRestaurantScore = Math.abs(calorie_input*0.9 - calorie_consum*0.1);
      //上述为另一种餐厅分的计算格式，思路为，根据卡路里的摄入与支出进行计算，接近0的数值为优。可以考虑去掉绝对值。

      let defaultRestaurnatScore = Math.abs(calorie_input * 0.6 - restaurant.distance * 0.4);
      //以上是默认的计算方法，直接使用绝对值的均卡-bmr再加入餐厅变量

      //一个思路，记录用户的最后一次就餐时间点。根据就餐时间点来分析从上一次就餐到现在用户可能的卡路里消耗量。这个卡路里消耗量可以作为一个卡路里损耗，来计算如我们的score里。
      // let defaultRestaurnatScore = Math.abs(average_calorie - this.bmr) * 0.6 + restaurant.distance * 0.4;
      restaurant.score = Math.abs(calorie_input * 0.6) + restaurant.distance * 0.4;
      console.log(restaurant.score);

      
    });

    this.nearby_collection.sort((a, b) => a.score - b.score);
    this.nearby_collection.splice(3);

  }


  //getAsianBoxMenuInfo()
  //Latitude: 33.6487791
  //Longitude: -117.8342784
    async getAsianBoxMenuInfo() {

      await this.nrService.getMenus("Asian Box").then(doc_list => {
        doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
          this.asian_box_menus_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
          
        });
      });
  
      return this.asian_box_menus_list;
      
    }


  //Latitude: 33.6498268
  //Longitude: -117.8417169
  async getBlazePizzaMenuInfo() {

    await this.nrService.getMenus("Blaze Pizza").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.blaze_pizza_menus_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.blaze_pizza_menus_list;
    
  }


  //Latitude: 33.7191772
  //Longitude: -117.9846459
  async getBlueBowlSuperfoodsMenuInfo() {

    await this.nrService.getMenus("Blue Bowl Superfoods").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.blue_bowl_superfoods_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });
    return this.blue_bowl_superfoods_menu_list;
    
  }


  //Latitude: 33.6504313
  //Longitude: -117.8409536
  async getCaliforniaGogiMenuInfo() {

    await this.nrService.getMenus("California Gogi").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.california_gogi_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.california_gogi_menu_list;
    
  }


    //Latitude: 33.6496646
  //Longitude: -117.844292
  async getChickfilAMenuInfo() {

    await this.nrService.getMenus("Chick-fil-A").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.chick_fil_a_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.chick_fil_a_menu_list;
    
  }


    //Latitude: 33.6495626
  //Longitude: -117.8415052
  async getChipotleMenuInfo() {

    await this.nrService.getMenus("Chipotle").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.chipotle_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.chipotle_menu_list;
    
  }


  //eurika_menu_list
  //getEurikaMenuInfo()
    //Latitude: 33.6505959
  //Longitude: -117.8414704
  async getEurikaMenuInfo() {

    await this.nrService.getMenus("Eurika!").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.eurika_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.eurika_menu_list;
    
  }

  //getGyutanRamenMenuInfo()
  //gyutan_ramen_menu_list
    //Latitude: 33.6507899
  //Longitude: -117.8410141
  async getGyutanRamenMenuInfo() {

    await this.nrService.getMenus("Gyutan Ramen").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.gyutan_ramen_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.gyutan_ramen_menu_list;
    
  }


  //in_n_out_burger_menu_list
  //getInNOutBurgerMenuInfo()
    //Latitude: 33.6501658
  //Longitude: -117.842833
  async getInNOutBurgerMenuInfo() {

    await this.nrService.getMenus("In-N-Out Burger").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.in_n_out_burger_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.in_n_out_burger_menu_list;
    
  }


  //luna_grill_menu_list
  //getLunaGrillMenuInfo()
    //Latitude: 33.6506056
  //Longitude: -117.8435683
  async getLunaGrillMenuInfo() {

    await this.nrService.getMenus("Luna Grill").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.luna_grill_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.luna_grill_menu_list;
    
  }


  //getMadDumplingsMenuInfo()
  //mad_dumplings_menu_list
    //Latitude: 33.6505535
  //Longitude: -117.8400765
  async getMadDumplingsMenuInfo() {

    await this.nrService.getMenus("Mad Dumplings").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.mad_dumplings_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.mad_dumplings_menu_list;
    
  }


  //northern_cafe_menu_list
  //getNorthernCafeMenuInfo()
  //Latitude: 33.6509961
  //Longitude: -117.8411895
  async getNorthernCafeMenuInfo() {

    await this.nrService.getMenus("Northern Cafe").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.northern_cafe_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.northern_cafe_menu_list;
    
  }


  //panda_express_menu_list
  //getPandaExpressMenuInfo()
    //Latitude: 33.6488747
  //Longitude: -117.8442851
  async getPandaExpressMenuInfo() {

    await this.nrService.getMenus("Panda Express").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.panda_express_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.panda_express_menu_list;
    
  }


  //slapfish_menu_list
  //getSlapfishMenuInfo()
    //Latitude: 33.649973
  //Longitude: -117.8411506
  async getSlapfishMenuInfo() {

    await this.nrService.getMenus("Slapfish").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.slapfish_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.slapfish_menu_list;
    
  }


  //subway_menu_list
  //getSubwayMenuInfo()
    //Latitude: 33.6491461
  //Longitude: -117.8446254
  async getSubwayMenuInfo() {

    await this.nrService.getMenus("Subway").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.subway_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.subway_menu_list;
    
  }


  //Latitude: 33.6493107
  //Longitude: -117.8448386
  async getWendysMenuInfo() {

    await this.nrService.getMenus("Wendy's").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.wendys_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.wendys_menu_list;
    
  }


}
