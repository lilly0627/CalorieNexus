import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CollectionReference } from 'firebase/firestore';
import { Firestore, collectionData, collection, DocumentReference,DocumentData, getDocs} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NrService {


  collections: string[] = ["Asian Box", "Blaze Pizza",  "Blue Bowl Superfoods", "California Gogi", "Chick-fil-A", "Chipotle","Eurika!","Gyutan Ramen","In-N-Out Burger",
  "Luna Grill" ,"Mad Dumplings", "Northern Cafe", " Panda Express" ,"Slapfish", "Subway", "Wendy's"]; 

  collection!: CollectionReference;

  constructor(
    private firestore: Firestore
  ) { }


  async getMenus(collection_name: string) {
    // incompleted
    const doc_info: any = [];
    this.collection = collection(this.firestore, collection_name);

    await getDocs(this.collection).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        // a nearby res menu1 menu2 menu3 with info of name and calorie.
        doc_info.push({ menu_num: doc.id, name: doc.data()[`Name`], calorie: doc.data()[`Calorie`] });
    });
  });
  return doc_info; // nr.page.ts (getMenus) gets [obj promise]
  }


}
