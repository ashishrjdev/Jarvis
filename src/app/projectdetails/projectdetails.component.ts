import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../shared/services/task.service';

@Component({
    selector: 'app-projectdetails',
    templateUrl: './projectdetails.component.html',
    styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit {
    todosList = [
        {
            title: 'Add reminder for todos',
            description: 'Feature for setting reminders to todos so that the user can remember what to be done.'
        },
        {
            title: 'Feature to set repeated todos per week/month',
            description: 'Feature to set if a todo is repeating per month or week.'
        }
    ];
    inProgressList = [
        {
            title: 'Edit and delete todos',
            description: 'User should be able to edit and delete todos.'
        }
    ];
    completedList = [
        {
            title: 'Create and Save todo',
            description: 'Feature for create and save todo.'
        },
        {
            title: 'Scrollable Calendar and feature to select different dates',
            description: ''
        }
    ];
    isEditing: boolean = false;
    selectedTask =  {title: "", description: ""};
    constructor(private taskService: TaskService) { }

    ngOnInit() {
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

    public updateTask(taskId: string, updatedName: string, updatedDesc:string) {
        // const updatedTask = {
        //     name: updatedName,
        //     description: updatedDesc
        // };
        // this.taskService.updateTask(taskId, updatedTask);
    }

    public deleteTask(taskId: string) {
        this.taskService.deleteTask(taskId);
    }

    public onSubmit(form: HTMLFormElement) {
        const formData = form.value;
        // if (this.isEditing) {
        //     this.updateProject(this.selectedPid, formData.projecttitle, formData.projectdesc);
        // } else {
            this.addTask(formData.tasktitle, formData.taskdesc);
        // }
        // this.resetDefaults();
        form.reset();
    }
}
