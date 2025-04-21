import { Component, Input ,Output, EventEmitter } from '@angular/core';
import { FormControl,FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import { ITabComponent } from '../interfaces/interfaces';

@Component({
  selector: 'book',
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements ITabComponent {
  inputControl : FormControl;
  @Input() IsActive:boolean = true;
  @Output() onClose = new EventEmitter<void>();
  constructor(fb: FormBuilder){
    this.inputControl = fb.control('');
  }

  CanClose(): boolean {
    if(this.inputControl.value !== ' '){
      return true;
    }else{
      return false;
    }
  }
}
