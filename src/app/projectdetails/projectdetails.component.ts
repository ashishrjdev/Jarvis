import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-projectdetails',
    templateUrl: './projectdetails.component.html',
    styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit {
    allTasks: {id: string, data: Task}[];
    todosList: {id: string, data: Task}[];
    inProgressList: {id: string, data: Task}[];
    completedList: {id: string, data: Task}[];
    isEditing: boolean = false;
    selectedTask: Task = new Task();
    selectedTid: string;

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.getTasks();
    }

    onDrop(event: CdkDragDrop<{title:string, description: string}[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    public getTasks() {
        this.taskService.getTasks().subscribe(data => {
            this.allTasks = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    data: e.payload.doc.data()
                };
            });
            this.todosList = this.allTasks.filter(task => {
                return task.data.status == 'todo';
            });
            this.inProgressList = this.allTasks.filter(task => {
                return task.data.status == 'inprogress';
            });
            this.completedList = this.allTasks.filter(task => {
                return task.data.status == 'completed';
            });
            // this.isdataLoaded = true;
        });
    }

    public addTask(name: string, description: string) {
        const newTask = {
            name: name,
            description: description,
            status: 'todo',
            createdAt: new Date(),
            updatedAt: new Date(),
            comments: [],
        };
        this.taskService.addTask(newTask);
    }

    public setTask(task: any) {
        this.selectedTid = task.id;
        this.selectedTask = task.data;
        this.isEditing = true;
    }

    public updateTask(taskId: string, updatedName: string, updatedDesc:string) {
        const updatedTask = {
            name: updatedName,
            description: updatedDesc,
            status: this.selectedTask.status,
            createdAt: this.selectedTask.createdAt,
            updatedAt: new Date(),
            comments: [],
        };
        this.taskService.updateTask(taskId, updatedTask);
    }

    public resetDefaults() {
        this.isEditing = false;
        this.selectedTid = "";
        this.selectedTask = new Task();
    }

    public deleteTask(taskId: string) {
        this.taskService.deleteTask(taskId);
    }

    public onSubmit(form: HTMLFormElement) {
        const formData = form.value;
        if (this.isEditing) {
            this.updateTask(this.selectedTid, formData.tasktitle, formData.taskdesc);
        } else {
            this.addTask(formData.tasktitle, formData.taskdesc);
        }
        this.resetDefaults();
        form.reset();
    }
}
