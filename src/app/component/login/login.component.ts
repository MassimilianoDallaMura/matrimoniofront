import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isButtonClicked: boolean = false;
  errorMessage: string | null = null;
  showPassword: boolean = false;  // Variabile per gestire la visibilità della password


  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  onSubmit(form: NgForm) {
    this.errorMessage = null; // Resetta il messaggio di errore all'inizio

    if (form.valid) {
      this.isButtonClicked = true; // Disabilita il pulsante

      this.authService.login(this.username, this.password).subscribe({
        next: () => {
          // Reindirizza all'home page dopo il login
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error de inicio de sesión:', error);
          this.errorMessage = 'Credenciales no válidas. Intentar otra vez.'; // Imposta il messaggio di errore
          this.isButtonClicked = false; // Riabilita il pulsante in caso di errore
        },
        complete: () => {
          this.isButtonClicked = false; // Riabilita il pulsante
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos'; // Messaggio per form non valido
    }
  }

}