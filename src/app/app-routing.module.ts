import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { SiteListComponent } from './site-list/site-list.component';

const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  { path:'sites',component:SiteListComponent},
  { path:'password-list',component:PasswordListComponent},
  { path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
