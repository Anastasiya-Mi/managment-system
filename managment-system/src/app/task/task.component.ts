import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../task-dialog/task-dialog.component';
import { ConfirmWindowComponent } from '../confirm-window/confirm-window.component';
import { BoardsComponent } from '../boards/boards.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  constructor(private dialog: MatDialog) {}
  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        task,
      },
    });
    console.log(this.task);
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const currentData = result.task;
        currentData.condition = true;
      });
  }

  deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {
        task,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: ConfirmWindowComponent | undefined) => {
        const valueCondition = result?.task?.condition;
        console.log(result, 'task');
        if (valueCondition) {
          return;
        }
      });
  }
  redirectTo() {
    console.log('/task');
  }
}
