import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { AuthComponent } from './core/auth/auth.component';


@Component({
  selector: 'app-root',
  standalone: true,  // Standalone component
  imports: [CommonModule, RouterModule,AuthComponent],  // Include CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  

}
