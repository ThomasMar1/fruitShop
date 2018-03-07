import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from "app/roles/roles.component";
import { FruitComponent } from "./fruit/fruit.component";
import { SupplierComponent } from "./supplier/supplier.component";
import { ViewSupplierComponent } from 'app/supplier/view-supplier/view-supplier.component';
import { SupplierRootComponent } from './supplier/supplier-root.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    {
                        path: 'home',
                        component: HomeComponent,
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'users',
                        component: UsersComponent,
                        data: { permission: 'Pages.Users' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'roles',
                        component: RolesComponent,
                        data: { permission: 'Pages.Roles' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'tenants',
                        component: TenantsComponent,
                        data: { permission: 'Pages.Tenants' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'about',
                        component: AboutComponent
                    },
                    {
                        path: 'fruit',
                        component: FruitComponent
                    },
                    {
                        path: 'supplier',
                        component: SupplierRootComponent,
                        children: [
                            {
                                path: 'supplierlist',
                                component: SupplierComponent
                            },
                            {
                                path: 'detail/:id',
                                component: ViewSupplierComponent
                            }

                        ]
                    },

                ]
            },
        

            
        ]),

    ],
exports: [RouterModule]
})
export class AppRoutingModule { }