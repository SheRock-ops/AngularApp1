/* =========================================
   USER PROFILE INTERFACE
========================================= */

export interface UserProfile {
    name: string;
    role: string;
    email: string;
    profileImage: string | null;
}

/* =========================================
   USER STATUS INTERFACE
========================================= */

export interface UserStatus {
    availability: string;
    currentFocus: string;
    experience: string;
    learning: string;
    isOnline: boolean;
}

/* =========================================
   USER BIO INTERFACE
========================================= */

export interface UserBio {
    bio: string;
    skills: string[];
}