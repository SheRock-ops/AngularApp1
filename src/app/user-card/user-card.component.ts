
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../models/user.interface';

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit {

    /* =========================================
       COMPONENT INPUT
    ========================================= */

    // Receives online/offline status from AppComponent
    @Input() isOnline = true;
    
    /* =========================================
       USER PROFILE INFORMATION
    ========================================= */

    name = 'Sheila D.';
    role = 'Web Developer';
    email = 'user@example.com';

    /* =========================================
       EDIT PROFILE
    ========================================= */

    isEditing = false;

    editName = '';
    editRole = '';
    editEmail = '';

    /* =========================================
       PROFILE PICTURE
    ========================================= */

    profileImage: string | null = null;

    /* =========================================
       LOAD SAVED PROFILE
    ========================================= */

    ngOnInit() {
        const savedProfile = localStorage.getItem('userProfile');

        if (savedProfile) {
            try {
                const profile: Partial<UserProfile> = JSON.parse(savedProfile);

                this.name = profile.name ?? this.name;
                this.role = profile.role ?? this.role;
                this.email = profile.email ?? this.email;

            } catch (error) {
                console.error('Unable to load saved profile:', error);
            }
        }

        this.profileImage = localStorage.getItem('profileImage');
    }

    /* =========================================
       EDIT PROFILE
    ========================================= */

    editProfile() {
        this.editName = this.name;
        this.editRole = this.role;
        this.editEmail = this.email;

        this.isEditing = true;
    }

    /* =========================================
       SAVE PROFILE
    ========================================= */

    saveProfile() {
        if (!this.editName.trim() ||
            !this.editRole.trim() ||
            !this.editEmail.trim()) {
            return;
        }

        this.name = this.editName.trim();
        this.role = this.editRole.trim();
        this.email = this.editEmail.trim();

        const profile: UserProfile = this.getUserProfile();

        try {
            localStorage.setItem('userProfile', JSON.stringify(profile));
        } catch (error) {
            console.error('Unable to save profile:', error);
            alert('Unable to save your profile.');
            return;
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
       UPLOAD PROFILE PICTURE
    ========================================= */

    uploadProfilePicture(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            alert('Please select a JPG, PNG, or WebP image.');
            input.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Please select an image smaller than 2 MB.');
            input.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const image = reader.result;

            if (typeof image !== 'string') {
                input.value = '';
                return;
            }

            try {
                localStorage.setItem('profileImage', image);
                this.profileImage = image;

            } catch (error) {
                console.error('Unable to save profile picture:', error);
                alert('Unable to save the picture. Browser storage may be full.');
            }

            input.value = '';
        };

        reader.onerror = () => {
            alert('Unable to read the selected picture.');
            input.value = '';
        };

        reader.readAsDataURL(file);
    }

    /* =========================================
       REMOVE PROFILE PICTURE
    ========================================= */

    removeProfilePicture() {
        this.profileImage = null;
        localStorage.removeItem('profileImage');
    }

    /* =========================================
       GET USER PROFILE
    ========================================= */

    getUserProfile(): UserProfile {
        return {
            name: this.name,
            role: this.role,
            email: this.email,
            profileImage: this.profileImage
        };
    }

}
