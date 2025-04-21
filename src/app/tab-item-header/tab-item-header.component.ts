import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab-item-header',
  imports: [CommonModule,FormsModule],
  templateUrl: './tab-item-header.component.html',
  styleUrl: './tab-item-header.component.css'
})
export class TabItemHeaderComponent implements OnChanges {
  @Input() Header:string = ''
  @Input() UniqueCode:string = ''
  @Input() IsActive:boolean = true;

  @Output() Close : EventEmitter<string> = new EventEmitter();
    
  @HostBinding('class') hostClass: string = '';
  @HostListener('click') onHostSelected() {
    this.Selected.emit(this.UniqueCode);
  }
  @Output() Selected :  EventEmitter<string> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['IsActive'] !== undefined) {
      if(changes['IsActive'].currentValue == true){
        this.hostClass = "active"
      }else{
        this.hostClass = ''
      }
    }
    //console.log(changes)
  }
  closeTab(){
    this.Close.emit(this.UniqueCode);
  }
}
