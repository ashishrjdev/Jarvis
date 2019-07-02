import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    public projectsCollection: AngularFirestoreCollection<Project>;

    constructor(private db: AngularFirestore) {
        this.projectsCollection = db.collection<Project>('projects');
    }

    // Add a new project to project collections.
    public addProject(project: Project) {
        this.projectsCollection.add(project);
    }

    public getProjects() {
        return this.projectsCollection.snapshotChanges();
    }

    public updateProject(projectId: string, updatedProject: Project) {
        this.db.doc('projects/' + projectId).update(updatedProject);
    }

    public deleteProject(projectId: string) {
        this.db.doc('projects/' + projectId).delete();
    }
}
