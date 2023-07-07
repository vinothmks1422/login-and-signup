import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './compnents/login/login.component';
import { ListComponent } from './compnents/list/list.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    loadChildren: () => import("./signup-module/signup-module.module").then(m => m.SignupModuleModule),
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    component: ListComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
