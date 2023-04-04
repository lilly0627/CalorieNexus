import { Injectable } from '@angular/core';
import { getDocs } from '@angular/fire/firestore';
import { Firestore, collectionData, collection, DocumentReference,DocumentData} from '@angular/fire/firestore';
import { CollectionReference, getDoc} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
  
export class AntService {

  collection_Anteatery_Breakfast!: CollectionReference; 
  collection_Anteatery_Lunch!: CollectionReference; 
  collection_Anteatery_Dinner!: CollectionReference; 

  collection_Brandywine_Breakfast!: CollectionReference; 
  collection_Brandywine_Lunch!: CollectionReference; 
  collection_Brandywine_Dinner!: CollectionReference;


  constructor(private firestore: Firestore) { 

    try {
      this.collection_Anteatery_Breakfast = collection(firestore, `Anteatery_Breakfast`);
      this.collection_Anteatery_Lunch = collection(firestore, `Anteatery_Lunch`);
      this.collection_Anteatery_Dinner = collection(firestore, `Anteatery_Dinner`);

      this.collection_Brandywine_Breakfast = collection(firestore, `Brandywine_Breakfast`);
      this.collection_Brandywine_Lunch = collection(firestore, `Brandywine_Lunch`);
      this.collection_Brandywine_Dinner = collection(firestore, `Brandywine_Dinner`);

    } catch {
      // nothing
    }

  }

// passing a prameter to reduce duplicated code.
  async getAnteateryBreakfast() {
    // Cited code from: https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore
    const doc_info: any = [];
    await getDocs(this.collection_Anteatery_Breakfast).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc_info.push({ id: doc.id, ...doc.data() });
    });
  });
  return doc_info;
  }

  async getAnteateryLunch() {
    const doc_info: any = [];
    await getDocs(this.collection_Anteatery_Lunch).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc_info.push({ id: doc.id, calorie: doc.data()[`calorie`] });
    });
  });
  return doc_info;
  }

  async getAnteateryDinner() {
    const doc_info: any = [];
    await getDocs(this.collection_Anteatery_Breakfast).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc_info.push({ id: doc.id, ...doc.data() });
    });
  });
  return doc_info;
  }

  async getBrandywineBreakfast() {
    const doc_info: any = [];
    await getDocs(this.collection_Brandywine_Breakfast).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc_info.push({ id: doc.id, ...doc.data() });
    });
  });
  return doc_info;
  }

  async getBrandywineLunch() {
    const doc_info: any = [];
    await getDocs(this.collection_Brandywine_Lunch).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc_info.push({ id: doc.id, ...doc.data() });
    });
  });
  return doc_info;
  }

  async getBrandywineDinner() {
    const doc_info: any = [];
    await getDocs(this.collection_Brandywine_Dinner).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc_info.push({ id: doc.id, ...doc.data() });
    });
  });
  return doc_info;
  }


  
}
