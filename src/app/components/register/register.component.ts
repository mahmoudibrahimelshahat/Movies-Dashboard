import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor( private formbuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      name:[null,[Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.registerService.createUser(form.value).subscribe(result => {
        this.router.navigate(['/login']);
      }, error => {
        console.log("error")
      })
    }
  }
}
