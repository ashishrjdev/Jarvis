import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
    constructor() { }

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
}
