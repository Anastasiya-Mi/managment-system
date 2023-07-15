import { Component } from '@angular/core';
import { Task } from '../task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent {
  list: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
      condition: true,
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
      condition: true,
    },
  ];
  constructor(private dialog: MatDialog) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        task: {
          condition: true,
        },
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        let value = result?.task.condition;
        const checkTitle = result?.task.title;
        const checkDescription = result?.task.description;
        if (!checkTitle && !checkDescription) {
          value = false;
        }
        if (!result || !value) {
          return;
        }
        this.list.push(result.task);
      });
  }
}
