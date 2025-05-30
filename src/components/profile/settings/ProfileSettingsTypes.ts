
export interface UserProfileSettings {
  id: string;
  displayName: string;
  bio: string;
  location: string;
  website: string;
  emailNotifications: boolean;
  shiftNotifications: boolean;
  languageReminders: boolean;
  preferredLanguage: string;
}

// Audio settings are handled separately via useAudioSettings hook
// to avoid conflicts with existing profile system and provide better modularity
