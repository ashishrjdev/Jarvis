import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { environment } from '../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { EqualValidator } from './shared/directives/equal-validator.directive';

@NgModule({
    declarations: [
        AppComponent,
        ProjectsComponent,
        ProjectdetailsComponent,
        EqualValidator
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [AngularFirestore],
    bootstrap: [AppComponent]
})
export class AppModule { }
