import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, setDoc, addDoc } from '@angular/fire/firestore';
import { Firestore, collectionData, collection, DocumentReference,DocumentData} from '@angular/fire/firestore';
import {  CollectionReference, getDoc} from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
  
  
export class ProfileService {

  itemDoc!: DocumentData;
  user_id!: string;
  my_collection!: DocumentReference<DocumentData>;

  user_gender!: string;
  user_age!: number;
  user_calorieToday!: number;
  user_calorieYesterday!: number;
  user_height!: number;
  user_idealWeight!: number;
  user_weight!: number;

  


  constructor(private auth: Auth,
    private firestore: Firestore, 
  ) { 
    const user = this.auth.currentUser;
    if (user) {
      this.user_id = user.uid;
      try {
        this.my_collection = doc(firestore, `userProfile/${user.uid}`);
      } catch {
      }

    }
    }

  async updateUserProfile(age: number,
    calorieYesterday: number,
    calorieToday: number,
    gender: string,
    height: number,
    idealWeight: number,
    weight: number) {
    const getDocRef = await getDoc(this.my_collection);
    if (getDocRef.exists()) {
      setDoc(this.my_collection, {
        age: age,
        calorieYesterday: calorieYesterday,
        calorieToday: calorieToday,
        gender: gender,
        height: height,
        idealWeight: idealWeight,
        weight: weight
      }, { merge: true });

    } else {
      setDoc(this.my_collection, {
        age: "",
        calorieYesterday: "",
        calorieToday: "",
        gender: "",
        height: "",
        idealWeight: "",
        weight: ""
      });
    }
  }

  getUserProfileReference() {
    return this.my_collection;
  }

  async getUserGender() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_gender = itemDoc2.get(`gender`);
      return this.user_gender;
  }

  async getUserAge() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_age = itemDoc2.get(`age`);
    return this.user_age;
  }

  async getUserCalorieToday() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_calorieToday = itemDoc2.get(`calorieToday`);
    return this.user_calorieToday;
  }

  async getUserCalorieYesterday() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_calorieYesterday= itemDoc2.get(`calorieYesterday`);
    return this.user_calorieYesterday;
      
  }

  async getUserHeight() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_height = itemDoc2.get(`height`);
    return this.user_height;
      
  }

  async getUserWeight() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_weight = itemDoc2.get(`weight`);
    return this.user_weight;
      
  }

  async getUserIdealWeight() {
    const itemDoc2 = await getDoc(this.my_collection);
    this.user_idealWeight = itemDoc2.get(`idealWeight`);
    return this.user_idealWeight;
      
  }

  getUserName() {
    const user = this.auth.currentUser;
    return user!.email;
  }

  getUserId() {
    const user = this.auth.currentUser;
    return user!.uid;
  }

}
