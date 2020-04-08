import { Component, OnInit } from '@angular/core';
import { DataService, Todo } from 'src/app/services/data.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/custom.validators';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodoModal = false;
  isModalOn = false;
  editMode = false;
  confirmModal = false;
  addConfirm = false;
  deleteConfirm = false;
  idToDeleteFromConfirm: string;
  modalData: Todo;
  form: FormGroup;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((res) => {
      this.todos = res;
    });

    this.form = new FormGroup({
      title: new FormControl('', CustomValidators.required),
      description: new FormControl('', CustomValidators.required),
    });
  }

  newTodoConfirm() {
    this.confirmModal = true;
    this.addConfirm = true;
  }

  removeTodoConfirm(event: any, id: string) {
    event.stopPropagation();
    this.idToDeleteFromConfirm = id;
    this.confirmModal = true;
    this.deleteConfirm = true;
  }

  closeConfirm() {
    this.confirmModal = false;
    this.addConfirm = false;
    this.deleteConfirm = false;
  }

  closeModal() {
    this.isModalOn = false;
    this.editMode = false;
    this.newTodoModal = false;
    this.resetForm();
  }

  showModal(data: Todo) {
    this.modalData = data;
    this.isModalOn = true;
  }

  submit() {
    const year = new Date().getFullYear();
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const curentDate = `${year}-${month + 1}-${date} | ${hours} : ${min}`;

    const todo = {
      id: '',
      title: this.form.value.title,
      description: this.form.value.description,
      creationDate: curentDate,
      editDate: curentDate,
    };
    this.dataService.createData(todo).subscribe((res: any) => {
      todo.id = res.name;
      this.todos.push(todo);
    });
    this.closeConfirm();
    this.closeModal();
    this.resetForm();
  }

  resetForm() {
    this.form.setValue({ title: '', description: '' });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  editTodo(event: any, data: Todo) {
    event.stopPropagation();
    this.editMode = true;
    this.showModal(data);
  }

  removeTodo() {
    this.dataService.remove(this.idToDeleteFromConfirm).subscribe(
      () => {
        this.todos = this.todos.filter(
          (todo) => todo.id !== this.idToDeleteFromConfirm
        );
        this.idToDeleteFromConfirm = '';
      },
      (err) => {
        console.error(err);
      }
    );
    this.closeConfirm();
  }
}
