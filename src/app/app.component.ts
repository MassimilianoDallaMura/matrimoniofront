import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verifica se l'utente è loggato
  //   this.authService.isLoggedIn().subscribe(isLoggedIn => {
  //     if (isLoggedIn) {
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.router.navigate(['/login']);
  //     }
  //   });
}
}
