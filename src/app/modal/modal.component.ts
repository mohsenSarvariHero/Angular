import { Component, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
   @Input() Message: string = '';
   Title: string = 'Confirming Box';

   constructor(private modalService: ModalService){}

   closeModal(returnOption: string){
      this.modalService.modalContainer.clear();
      this.modalService.selectedOptionObservable.next(returnOption);
   }

  }
