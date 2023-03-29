import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../services/password-manager.service';
// import { AES, enc } from 'crypto-js';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
})
export class PasswordListComponent {
  siteDetails!: any;
  siteId!: string;
  passList!: Array<any>;

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

  onSubmit(forma: any) {
    //
    console.log(forma.value.password);

    const encPass = this.encryptPass(forma.value.password);
    forma.value.password = encPass;
    console.log(forma.value.password);

    if (this.formState == 'Add new') {
      this.passService
        .addPassword(forma.value, this.siteId)
        .then(() => {
          console.log('lllll' + forma.value);
          console.log('Successfull');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passService
        .updatePass(this.siteId, this.id, forma.value)
        .then(() => {
          console.log('updated');
          this.formState = 'Add new';
        })
        .catch((err) => {
          console.log(err);
        });
    }

    forma.reset();
  }

  loadPass() {
    this.passService.loadPassword(this.siteId).subscribe((val: any) => {
      this.passList = val;
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
    console.log(password);

    const encPass = CryptoJS.AES.encrypt(password, secretKey).toString();
    console.log(encPass);

    return encPass;
  }

  decryptPass(password: string) {
    console.log(password);
    const secretKey = 'w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-K';
    //  const encPass = CryptoJS.AES.encrypt(password, secretKey).toString();
    //  console.log(encPass);

    var decrypted = CryptoJS.AES.decrypt(password, secretKey);
    var decrypteds = decrypted.toString(CryptoJS.enc.Utf8);

    // const decryptPass = AES.decrypt(password, secretKey)
    // const decrypted = decryptPass.toString(enc.Utf8);
    return decrypteds;
    console.log(` d - ${decrypteds}`);
  }

  onDecrypt(password: string, index: any) {
    const decryptPassword = this.decryptPass(password);
    this.passList[index].password = decryptPassword;
    console.log();

  }
}
