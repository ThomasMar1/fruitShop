import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { RouterLinkActive } from '@angular/router';



@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[] = [
        new MenuItem(this.l("Home"), "", "home", "/app/home"),
        new MenuItem(this.l("About"), "", "info", "/app/about"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),

    ];

    shownLoginName: string = "";
    constructor(
        injector: Injector,
        private _authService: AppAuthService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    logout(): void {
        this._authService.logout();
    }

    
}
