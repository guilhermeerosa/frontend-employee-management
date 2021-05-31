import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'empresas',
        loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule),
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
