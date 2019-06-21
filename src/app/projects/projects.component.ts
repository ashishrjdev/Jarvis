import { ProjectService } from './../shared/services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project.model';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects: {id: string, data: Project}[];
    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.getProjects();
    }

    public getProjects() {
        this.projectService.getProjects().subscribe(data => {
            this.projects = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    data: e.payload.doc.data()
                };
            });
        });
    }

    public addProject() {
        const newProject = {
            name: 'Test project' + Math.random().toString(),
            description: 'This is test project ' + Math.random().toString()
        };
        this.projectService.addProject(newProject);
    }

    public deleteProject(projectId: string) {
        this.projectService.deleteProject(projectId);
    }

    public updateProject(projectId: string) {
        const updateProject = {
            name: 'Test project' + Math.random().toString(),
            description: 'This is test project ' + Math.random().toString()
        };
        this.projectService.updateProject(projectId, updateProject);
    }
}
