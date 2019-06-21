import { ProjectService } from './../shared/services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project.model';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects: Project[];
    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.getProjects();
    }

    public getProjects() {
        this.projectService.getProjects().subscribe(projects => {
            this.projects = projects;
        });
    }

    public addProject() {
        const newProject = {
            name: 'Test project',
            description: 'This is test project'
        };
        this.projectService.addProject(newProject);
    }
}
