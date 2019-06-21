import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [{
    path: '', component: ProjectsComponent
},
{
    path: 'project/:id', component: ProjectdetailsComponent,
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
