import { Component, OnInit } from '@angular/core';

import { NrService } from '../services/nr.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-nr',
  templateUrl: './nr.page.html',
  styleUrls: ['./nr.page.scss'],
})
export class NrPage implements OnInit {
  // ["Asian Box", "Blaze Pizza",  "Blue Bowl Superfoods", "California Gogi", "Chick-fil-A", "Chipotle","Eurika!","Gyutan Ramen","In-N-Out Burger",
  // "Luna Grill" ,"Mad Dumplings", "Northenr Cafe", " Panda Express" ,"Slapfish", "Subway", "Wendy's"]
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

  nearby_restaurants: string[] = ["Asian Box", "Blaze Pizza",  "Blue Bowl Superfoods", "California Gogi", "Chick-fil-A", "Chipotle","Eurika!","Gyutan Ramen","In-N-Out Burger",
  "Luna Grill" ,"Mad Dumplings", "Northenr Cafe", "Panda Express" ,"Slapfish", "Subway", "Wendy's"]; 

  constructor(
    private loadingController: LoadingController,
    private nrService: NrService,
    private router: Router,
  ) { }

  async ngOnInit() {
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


  
  async getBlazePizzaMenuInfo() {

    await this.nrService.getMenus("Blaze Pizza").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.blaze_pizza_menus_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.blaze_pizza_menus_list;
    
  }

  async getBlueBowlSuperfoodsMenuInfo() {

    await this.nrService.getMenus("Blue Bowl Superfoods").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.blue_bowl_superfoods_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.blue_bowl_superfoods_menu_list;
    
  }

  async getCaliforniaGogiMenuInfo() {

    await this.nrService.getMenus("California Gogi").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.california_gogi_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.california_gogi_menu_list;
    
  }

  async getChickfilAMenuInfo() {

    await this.nrService.getMenus("Chick-fil-A").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.chick_fil_a_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.chick_fil_a_menu_list;
    
  }


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
  async getEurikaMenuInfo() {

    await this.nrService.getMenus("Eruika!").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.eurika_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.eurika_menu_list;
    
  }

  //getGyutanRamenMenuInfo()
  //gyutan_ramen_menu_list
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
  async getSubwayMenuInfo() {

    await this.nrService.getMenus("Subway").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.subway_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.subway_menu_list;
    
  }


  //
  //
  async getWendysMenuInfo() {

    await this.nrService.getMenus("Wendy's").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.wendys_menu_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.wendys_menu_list;
    
  }

  //getAsianBoxMenuInfo()
  async getAsianBoxMenuInfo() {

    await this.nrService.getMenus("Asian Box").then(doc_list => {
      doc_list.forEach((document_id: { menu_num: any; name: any;  calorie: any}) => {
        this.asian_box_menus_list.push({ my_id: document_id.menu_num, name: document_id.name, calorie: document_id.calorie });
        
      });
    });

    return this.asian_box_menus_list;
    
  }
}
