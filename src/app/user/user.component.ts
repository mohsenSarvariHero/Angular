import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { ITabComponent } from '../interfaces/interfaces';
import { TabService } from '../services/tab.service';
@Component({
  selector: 'user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements ITabComponent {
  inputControl : FormControl;
  @Input() IsActive:boolean = true;
  @Output() onClose = new EventEmitter<void>();
  constructor(fb: FormBuilder, private tabService: TabService) {
    this.inputControl = fb.control(' ')
  }

  CanClose(): boolean {
    if(this.inputControl.value !== ' '){
      return true;
    }else{
      return false;
    }
  }

  createBook(){
    this.tabService.addNewTab('book');
  }
}
