import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  modalContainer !: ViewContainerRef; 
  selectedOptionObservable = new Subject<string>();
  constructor() { }

  showModal(message: string){
    this.modalContainer.clear();
    const component = this.modalContainer.createComponent(ModalComponent);
    component.instance.Message = message;
    return this.selectedOptionObservable;
  }
}
