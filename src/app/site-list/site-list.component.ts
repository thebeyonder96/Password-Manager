import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../services/password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  name!: string;
  URL!: string;
  imgURL!: string;
  siteId!: string;
  formState = 'Add new';
  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passService: PasswordManagerService) {
    this.loadSites();
  }

  showAlert(msg:string){
    this.isSuccess = true;
    this.successMessage= msg;
  }

  onSubmit(value: any) {
    if (this.formState == 'Add new') {
      this.passService
        .addSite(value.value)
        .then(() => {
          console.log('Data updated successfully');
          this.showAlert('Data Added successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passService
        .updateSite(this.siteId, value.value)
        .then(() => {
          console.log('Successfull');
          this.showAlert('Data updated successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    value.reset();
  }

  loadSites() {
    this.allSites = this.passService.loadSites();
    this.allSites.subscribe(val=>{
      console.log(val);

    })

  }

  editSites(name: string, Url: string, imgUrl: string, id: string) {
    (this.name = name), (this.URL = Url), (this.imgURL = imgUrl);
    this.siteId = id;
    this.formState = 'Edit';
  }

  deleteSite(id: string) {
    this.passService
      .deleteSite(id)
      .then(() => {
        console.log('Deleted');
        this.showAlert('Data deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
