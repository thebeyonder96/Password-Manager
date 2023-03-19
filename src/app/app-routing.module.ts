import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PasswordListComponent } from './password-list/password-list.component';

const routes: Routes = [
  { path:'',redirectTo:'HomeComponent',pathMatch:'full'},
  { path:'password-list',component:PasswordListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
