import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { importProvidersFrom } from '@angular/core';
import { IconService } from './app/core/services/icon.service';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ Add this to enable HTTP services
    importProvidersFrom(BrowserModule, MatIconModule), // ✅ Import required modules
    MatIconRegistry, // ✅ Register Material Icons
    IconService, // ✅ Ensuring it’s available globally
  ]
}).catch(err => console.error(err));
