import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { FormFieldComponent } from '../form-field/form-field.component';
import { formField } from '../form-field/from-field.model';


@Component({
  selector: 'auth',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormFieldComponent,],  // Include CommonModule
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  marsterData: any;
  //users: User[] = []; // Define array for API response
  users: any[] = []; // Define array for API response

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  authForm: formField[] = [
    {
      label: 'Name',
      type: 'name',
      placeholder: 'Enter your Name',
      control: this.form.controls['name']
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      control: this.form.controls['email']
    },
    {
      label: 'Password',
      type: 'password',
      placeholder: 'password',
      control: this.form.controls['password']
    },
    {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'confirm password',
      control: this.form.controls['password'],
      isVisible: true
    },
  ]

  constructor(private apiService: ApiService) { }

  // Toggle between Login & Register
  isLogin = true; 

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.marsterData = data;
      },
      error: (error) => console.error('There was an error!', error)
    });
    this.loadeUsers();
  }

  loadeUsers() {
    this.apiService.getCatagoryData('users').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => console.error('There was an error!', error)
    });
  }
  submitForm() {
    if (this.form.valid) {
      let value = this.form.value;
      const newUser = { name: value.name ?? '', email: value.email ?? '' };
      this.apiService.addUser(newUser).subscribe((response) => {
        this.loadeUsers();
        this.form.patchValue({ name: '', email: '' });
        this.form.markAsPristine();
        this.form.markAsUntouched();
    })
    }
  }
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.removeUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }

}
