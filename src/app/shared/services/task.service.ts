import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    public tasksCollection: AngularFirestoreCollection<Task>;

    constructor(private db: AngularFirestore) {
        this.tasksCollection = db.collection<Task>('tasks');
    }

    // Add a new project to project collections.
    public addTask(task: Task) {
        this.tasksCollection.add(task);
    }

    public getTasks() {
        return this.tasksCollection.snapshotChanges();
    }

    public updateTask(taskId: string, updatedTask: Task) {
        this.db.doc('tasks/' + taskId).update(updatedTask);
    }

    public deleteTask(taskId: string) {
        this.db.doc('tasks/' + taskId).delete();
    }
}
