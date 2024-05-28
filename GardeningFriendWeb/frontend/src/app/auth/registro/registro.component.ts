import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  registerForm!: FormGroup;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe(
        (response) => {
          console.log(response);
          this.showModal();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {
          console.error(error);
          alert("Error al crear el usuario");
        }
      );
    }
  }

  showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
}
