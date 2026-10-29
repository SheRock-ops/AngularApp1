
import { Component, OnInit } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { UserBioComponent } from './user-bio/user-bio.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        UserCardComponent,
        UserStatusComponent,
        UserBioComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    /* =========================================
       DASHBOARD INFORMATION
    ========================================= */

    title = 'User Profile Dashboard';

    /* =========================================
       ONLINE/OFFLINE STATUS
    ========================================= */

    // Stores the online/offline status received from UserStatusComponent
    isOnline = true;

    /* =========================================
       LOAD SAVED STATUS
    ========================================= */

    ngOnInit() {
        const savedStatus = localStorage.getItem('userOnlineStatus');

        if (savedStatus !== null) {
            this.isOnline = savedStatus === 'true';
        }
    }

    /* =========================================
       RECEIVE STATUS FROM CHILD COMPONENT
    ========================================= */

    updateOnlineStatus(status: boolean) {
        this.isOnline = status;
    }

}
