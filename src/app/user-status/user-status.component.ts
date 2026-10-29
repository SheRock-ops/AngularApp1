
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStatus } from '../models/user.interface';

@Component({
    selector: 'app-user-status',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user-status.component.html',
    styleUrl: './user-status.component.css'
})
export class UserStatusComponent implements OnInit {

    /* =========================================
       COMPONENT OUTPUT
    ========================================= */

    // Sends online/offline changes to the parent component
    @Output() onlineStatusChange = new EventEmitter<boolean>();

    /* =========================================
       USER STATUS INFORMATION
    ========================================= */

    availability = 'Available for Opportunities';
    currentFocus = 'Angular Development';
    experience = 'Front-End Development';
    learning = 'Angular Components';

    // Tracks whether the user is online or offline
    isOnline = true;

    /* =========================================
       EDIT STATUS
    ========================================= */

    isEditing = false;

    editAvailability = '';
    editCurrentFocus = '';
    editExperience = '';
    editLearning = '';

    /* =========================================
       LOAD SAVED STATUS
    ========================================= */

    ngOnInit() {

        // Restore the saved online/offline status
        const savedOnlineStatus = localStorage.getItem('userOnlineStatus');

        if (savedOnlineStatus !== null) {
            this.isOnline = savedOnlineStatus === 'true';
        }

        // Restore previously saved status information
        const savedStatus = localStorage.getItem('userStatus');

        if (savedStatus) {
            try {
                const status = JSON.parse(savedStatus);

                this.availability = status.availability ?? this.availability;
                this.currentFocus = status.currentFocus ?? this.currentFocus;
                this.experience = status.experience ?? this.experience;
                this.learning = status.learning ?? this.learning;

            } catch (error) {
                console.error('Unable to load saved status:', error);
            }
        }
    }

    /* =========================================
       TOGGLE ONLINE/OFFLINE STATUS
    ========================================= */

    toggleOnlineStatus() {
        this.isOnline = !this.isOnline;

        try {
            localStorage.setItem(
                'userOnlineStatus',
                JSON.stringify(this.isOnline)
            );
        } catch (error) {
            console.error('Unable to save online status:', error);
        }

        // Send the updated status to AppComponent
        this.onlineStatusChange.emit(this.isOnline);
    }

    /* =========================================
       EDIT STATUS
    ========================================= */

    editStatus() {
        this.editAvailability = this.availability;
        this.editCurrentFocus = this.currentFocus;
        this.editExperience = this.experience;
        this.editLearning = this.learning;

        this.isEditing = true;
    }

    /* =========================================
       SAVE STATUS
    ========================================= */

    saveStatus() {
        this.availability = this.editAvailability;
        this.currentFocus = this.editCurrentFocus;
        this.experience = this.editExperience;
        this.learning = this.editLearning;

        const status: UserStatus = this.getUserStatus();

        try {
            localStorage.setItem('userStatus', JSON.stringify(status));
        } catch (error) {
            console.error('Unable to save status:', error);
        }

        this.isEditing = false;
    }

    /* =========================================
       CANCEL EDIT
    ========================================= */

    cancelEdit() {
        this.isEditing = false;
    }

    /* =========================================
       GET USER STATUS
    ========================================= */

    getUserStatus(): UserStatus {
        return {
            availability: this.availability,
            currentFocus: this.currentFocus,
            experience: this.experience,
            learning: this.learning,
            isOnline: this.isOnline
        };
    }

}
