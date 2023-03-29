import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private fs: Firestore,private auth:Auth) {}

  addSite(data: any) {
    const dbInstance = collection(this.fs, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this.fs, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(id:string,data:object){
    const docInstance = doc(this.fs,'sites',id);
    return updateDoc(docInstance,data)
  }

  deleteSite(id:string){
    const docInstance = doc(this.fs, 'sites', id);
    return deleteDoc(docInstance)
  }

  // Password

  addPassword(value:any,id:string){
    const dbInstance = collection(this.fs , `sites/${id}/passwords`)
    return addDoc(dbInstance,value)
  }

  loadPassword(id:string){
    const dbInstance = collection(this.fs, `sites/${id}/passwords`);
    return collectionData(dbInstance,{idField:'id'})
  }

  updatePass(siteId:string,passId:string,data:any){
    const dbInstance = doc(this.fs, `sites/${siteId}/passwords`,passId);
    return updateDoc(dbInstance,data)
  }

  deletePass(siteId:string,passId:string){
    const dbInstance = doc(this.fs, `sites/${siteId}/passwords`, passId);
    return deleteDoc(dbInstance)
  }


  // Login Function

  login(email:string,password:string){
    return signInWithEmailAndPassword(this.auth,email,password)
  }
}
