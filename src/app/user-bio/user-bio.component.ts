
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserBio } from '../models/user.interface';

@Component({
    selector: 'app-user-bio',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user-bio.component.html',
    styleUrl: './user-bio.component.css'
})
export class UserBioComponent implements OnInit {

    bio = 'I am a passionate web developer with a background in the financial industry. I enjoy creating responsive, user-friendly websites and applications.';

    skills: string[] = [
        'HTML',
        'CSS',
        'JavaScript',
        'Angular',
        'PHP',
        'MySQL'
    ];

    isEditing = false;

    editBio = '';
    editSkills: string[] = [];
    newSkill = '';

    ngOnInit() {
        const savedBio = localStorage.getItem('userBio');
        const savedSkills = localStorage.getItem('userSkills');

        if (savedBio !== null) {
            this.bio = savedBio;
        }

        if (savedSkills) {
            try {
                const parsedSkills = JSON.parse(savedSkills);

                if (Array.isArray(parsedSkills) &&
                    parsedSkills.every(skill => typeof skill === 'string')) {
                    this.skills = parsedSkills;
                }
            } catch (error) {
                console.error('Unable to load saved skills:', error);
            }
        }
    }

    editAboutMe() {
        this.editBio = this.bio;
        this.editSkills = [...this.skills];
        this.newSkill = '';

        this.isEditing = true;
    }

    addSkill() {
        const skill = this.newSkill.trim();

        if (skill && !this.editSkills.some(
            existing => existing.toLowerCase() === skill.toLowerCase()
        )) {
            this.editSkills.push(skill);
        }

        this.newSkill = '';
    }

    removeSkill(index: number) {
        this.editSkills.splice(index, 1);
    }

        /* =========================================
       SAVE ABOUT ME AND SKILLS
    ========================================= */

    saveAboutMe() {
        this.bio = this.editBio.trim();
        this.skills = [...this.editSkills];

        const userBio: UserBio = this.getUserBio();

        try {
            localStorage.setItem('userBio', userBio.bio);
            localStorage.setItem(
                'userSkills',
                JSON.stringify(userBio.skills)
            );
        } catch (error) {
            console.error('Unable to save bio and skills:', error);
        }

        this.isEditing = false;
    }

    /* =========================================
       CANCEL EDIT
    ========================================= */

    cancelEdit() {
        this.isEditing = false;
        this.newSkill = '';
    }

    /* =========================================
       GET USER BIO
    ========================================= */

    getUserBio(): UserBio {
        return {
            bio: this.bio,
            skills: [...this.skills]
        };
    }

}