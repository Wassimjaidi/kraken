import { Component } from '@angular/core';
//import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: any;

  constructor() {}

  signInWithGoogle(): void {
   /*  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      this.user = user;
      console.log('Token JWT Google:', user.idToken);
    }); */
  }
}
