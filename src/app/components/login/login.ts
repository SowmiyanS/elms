import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule for ngModel
  templateUrl: './login.html',
  styles: [`
    /* Basic component styles for layout */
    .auth-container {
        max-width: 400px;
        margin: 40px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
    }
    input, button {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
    button {
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
        border: none;
    }
    .error {
        color: red;
        margin-top: -10px;
        margin-bottom: 10px;
    }
  `]
})
export class Login {
  // Inject the AngularFire Auth service
  private auth: Auth = inject(Auth);

  // State signals for the form and status
  email = signal<string>('');
  password = signal<string>('');
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  isRegistering = signal<boolean>(false); // State to switch between Login/Register

  constructor() {}

  /**
   * Handles both sign-in and registration based on the 'isRegistering' state.
   */
  async submitAuth() {
    this.isLoading.set(true);
    this.error.set(null);

    const email = this.email();
    const password = this.password();

    if (!email || !password) {
        this.error.set('Email and password are required.');
        this.isLoading.set(false);
        return;
    }

    try {
        if (this.isRegistering()) {
            await createUserWithEmailAndPassword(this.auth, email, password);
            console.log('User registered successfully!');
        } else {
            await signInWithEmailAndPassword(this.auth, email, password);
            console.log('User signed in successfully!');
        }
        // Authentication successful, navigation should happen here (e.g., to the dashboard)
    } catch (err: any) {
        // Firebase error handling
        this.error.set(this.formatFirebaseError(err.code));
        console.error("Auth Error:", err);
    } finally {
        this.isLoading.set(false);
    }
  }

  /**
   * Cleans up Firebase error codes for user display.
   */
  private formatFirebaseError(code: string): string {
    switch (code) {
        case 'auth/user-not-found': return 'No account found with this email.';
        case 'auth/wrong-password': return 'Incorrect password.';
        case 'auth/invalid-email': return 'The email address is invalid.';
        case 'auth/email-already-in-use': return 'This email is already registered.';
        case 'auth/weak-password': return 'Password should be at least 6 characters.';
        default: return 'An unexpected authentication error occurred.';
    }
  }
}
