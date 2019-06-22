import { ProjectService } from './../shared/services/project.service';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { Project } from '../shared/models/project.model';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects: {id: string, data: Project}[];
    isdataLoaded: boolean = false;
    isEditing: boolean = false;
    selectedProject: Project = new Project();
    selectedPid: string;
    searchText: string = "";

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
            this.isdataLoaded = true;
        });
    }

    public addProject(name: string, description: string) {
        const newProject = {
            name: name,
            description: description
        };
        this.projectService.addProject(newProject);
    }

    public deleteProject(projectId: string) {
        this.projectService.deleteProject(projectId);
    }

    public updateProject(projectId: string, updatedName: string, updatedDesc:string) {
        const updatedProject = {
            name: updatedName,
            description: updatedDesc
        };
        this.projectService.updateProject(projectId, updatedProject);
    }

    public setProject(project: any) {
        this.selectedPid = project.id;
        this.selectedProject = project.data;
        this.isEditing = true;
    }

    public onSubmit(form: HTMLFormElement) {
        const formData = form.value;
        if (this.isEditing) {
            this.updateProject(this.selectedPid, formData.projecttitle, formData.projectdesc);
        } else {
            this.addProject(formData.projecttitle, formData.projectdesc);
        }
        this.resetDefaults();
        form.reset();
    }

    public resetDefaults() {
        this.isEditing = false;
        this.selectedPid = "";
        this.selectedProject = new Project();
    }

    public onDelete(form: HTMLFormElement) {
        this.deleteProject(this.selectedPid);
        this.resetDefaults();
        form.reset();
    }
}
