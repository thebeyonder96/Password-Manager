import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../services/password-manager.service';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
})
export class PasswordListComponent {
  siteDetails!: any;
  siteId!: string;
  passList!: Observable<Array<any>>;

  email!: string;
  username!: string;
  password!: string;
  id!: string;
  formState = 'Add new';

  constructor(
    private route: ActivatedRoute,
    private passService: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val) => {
      console.log(val);
      this.siteDetails = val;
      this.siteId = val['id'];
    });
    this.loadPass();
  }

  onSubmit(form: any) {
    //

    const encPass = this.encryptPass(form.password);
    form.value.password = encPass;

    if (this.formState == 'Add new') {
      this.passService
        .addPassword(form.value, this.siteId)
        .then(() => {
          console.log('Successfull');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passService
        .updatePass(this.siteId, this.id, form.value)
        .then(() => {
          console.log('updated');
          this.formState = 'Add new';
        })
        .catch((err) => {
          console.log(err);
        });
    }

    form.reset();
  }

  loadPass() {
    this.passList = this.passService.loadPassword(this.siteId);
    this.passList.subscribe((val) => {
      console.log(val);
    });
  }

  onEdit(email: string, username: string, pass: string, id: string) {
    this.email = email;
    this.username = username;
    this.password = pass;
    this.id = id;
    this.formState = 'Edit';
  }

  onDelete(passId: string) {
    this.passService
      .deletePass(this.siteId, passId)
      .then(() => {
        console.log('deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  encryptPass(password: string) {
    const secretKey = 'w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-K';
    const encPass = CryptoJS.AES.encrypt(password, secretKey).toString();
    return encPass;
  }

  decryptPass(password: string) {
    console.log(password);

    const secretKey = 'w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-K';
    const decryptPass = AES.decrypt(password, secretKey).toString(enc.Utf8);
    // return decryptPass;
    console.log(decryptPass);
  }

  onDecrypt(password: string) {
    const decryptPassword = this.decryptPass(password);
    console.log(decryptPassword);
  }
}
