import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Todo, DataService } from 'src/app/services/data.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.scss'],
})
export class ModalformComponent implements OnInit {
  // isEditMode = false;
  @Input() todo: Todo;
  @Input() isEditMode = false;

  @Output() editedTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.todo.title, Validators.required),
      description: new FormControl(this.todo.description, Validators.required),
    });
  }

  closeModal() {
    this.close.emit();
  }

  submit() {
    const year = new Date().getFullYear();
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const curentDate = `${year}-${month + 1}-${date} | ${hours} : ${min}`;

    this.todo.title = this.form.value.title;
    this.todo.description = this.form.value.description;
    this.todo.editDate = curentDate;

    this.dataService.editData(this.todo).subscribe((res: any) => {});

    setTimeout(() => this.closeModal(), 1000);
  }
}
