import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Import the angular/fire providers so we can use @Inject() anywhere in the application
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCVr6Hj1vNwBDbncanwh6OYUpBuVyDK4xw",
  authDomain: "elms-120v-ac.firebaseapp.com",
  projectId: "elms-120v-ac",
  storageBucket: "elms-120v-ac.firebasestorage.app",
  messagingSenderId: "448263974688",
  appId: "1:448263974688:web:f3150a7b23736636bbf145",
  measurementId: "G-Y4D9ZEN79X"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig))
  ]
};
