import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabControlComponent } from './tab-control/tab-control.component';
import { TabService } from './services/tab.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabControlComponent, ModalComponent ,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'dynamicTabs';

  @ViewChild('modal', {read: ViewContainerRef, static: true})
  containerRef !: ViewContainerRef;

  constructor(private tabService : TabService, private modalService : ModalService){}

  ngAfterViewInit(): void {
    this.modalService.modalContainer = this.containerRef;
    //console.log(this.containerRef);

  }

  insertComponent(code: string){
    //this.tabService.tabItemObservable.next(code);
    this.tabService.addNewTab(code);
  }

}
