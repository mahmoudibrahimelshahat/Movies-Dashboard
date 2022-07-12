import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
  constructor( private formbuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loginService.login(form.value).subscribe(result => {
        localStorage.setItem('token', result.authorisation.token);
        this.router.navigate(['/movies']);
      }, error => {
        console.log("error")
      })
    }
  }
}
