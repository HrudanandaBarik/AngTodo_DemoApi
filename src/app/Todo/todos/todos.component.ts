import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../todo.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit{
  taskObj: Task = new Task();
  todos:any;
  
  showAdd!: boolean;
  showUpdate!: boolean;
  userForm: FormGroup;
  constructor(private service:TodoService){
    this.userForm = new FormGroup({
      todo: new FormControl("",[Validators.required]),
      userId: new FormControl("",[Validators.required]),
      completed:new FormControl("")
    })
   
  }

  ngOnInit(): void {
    this.getAlltodos();
  }

  clickAddEmployee(){
    this.userForm.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

 

  submitForm(){
    if (this.userForm.value.completed === null) {
      this.userForm.patchValue({ completed: false });
    }
    this.taskObj.todo=this.userForm.value.todo;
    this.taskObj.userId=this.userForm.value. userId;
    this.taskObj.completed=this.userForm.value.completed;
    this.service.addTodo(this.taskObj).subscribe(data=>{
      alert("Added");
      console.log("Todo Added",data);
    })
    this.userForm.reset();
  }

  getAlltodos(){
     this.service.getTodos().subscribe(data=>{
       this.todos=data.todos;
       console.log("Todos",this.todos)
     })
  }

  deleteTodo(id:any){
    this.service.deleteById(id).subscribe(data=>{
      alert("Todo Deleted");
      //this.getAlltodos();
      console.log(data);
      
      this.todos = this.todos.filter((item: any) => item.id !== id);
    })
  }

  onEdit(data:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.taskObj.id=data.id;
    this.userForm.patchValue(data);
  }

  updateTodo() {
    const id = this.taskObj.id;
    const updatedData = this.userForm.value;

    this.service.updateTodo(id, updatedData).subscribe(data => {
      alert("Todo Updated");
      console.log(data);
    });
  
  }
}
