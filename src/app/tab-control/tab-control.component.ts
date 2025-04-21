import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { TabItemHeaderComponent } from '../tab-item-header/tab-item-header.component';
import { UserComponent } from '../user/user.component';
import { ProductComponent } from '../product/product.component';
import { BookComponent } from '../book/book.component';
import { ITab, ITabComponent } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { TabService } from '../services/tab.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import { ModalService } from '../services/modal.service';
@Component({
  standalone: true,
  selector: 'app-tab-control',
  imports: [TabItemHeaderComponent,BookComponent,FormsModule,CommonModule,ProductComponent],
  templateUrl: './tab-control.component.html',
  styleUrls: ['./tab-control.component.css']
})
export class TabControlComponent implements OnDestroy {
  tabItemSubscription: Subscription;
  index: number = 0 ;
  tabs: ITab[]=[]
  @ViewChild('containerRef', {read: ViewContainerRef, static : true})
  containerRef !: ViewContainerRef;


  constructor(private tabService: TabService, private modalService: ModalService) {
    this.tabItemSubscription = tabService.tabItemObservable.subscribe({
      next: (res: string) => {
        this.addNewTab(res);
      },
      error : (err) =>{
        console.log(err)
      },   
    })
  }

  ngOnDestroy():void{
    this.tabItemSubscription.unsubscribe();
  }
  
  addNewTab(code: string){
      // جلوگیری از باز شدن تب تکراری
  const existingTab = this.tabs.find(t => t.header === code);
  if (existingTab) {
    this.selectTab(existingTab.uniqueCode);
    return;
  }
    var uniqueCode = code + '-' + this.index;
    this.index++;

    this.containerRef.detach();
 
    var component = this.containerRef.createComponent(this.getComponentType(code));
    
    //const componentType = this.getComponentType(code);
    //const component = this.containerRef.createComponent(componentType);

    component.instance.IsActive = true;

    this.containerRef.get(0)

    for (let tab of this.tabs){
      tab.content.instance.IsActive = false
    }


    this.tabs.unshift({
      header : code,
      uniqueCode: uniqueCode,
      content : component,
      view: this.containerRef.get(0)!,
    });
  }

  getComponentType(code: string): Type<any>{
    var type: Type<any> = UserComponent;
    switch (code) {
      case 'user':
        type = UserComponent;
        break;
      case 'book':
        type = BookComponent;
        break;
        case 'product':
        type = ProductComponent;
        break;
    }
    return type;
  }

  selectTab(uniqueCode: string){
    for (let tab of this.tabs){
      if(tab.uniqueCode == uniqueCode){
        tab.content.instance.IsActive = true;
        this.containerRef.detach();
        this.containerRef.insert(tab.view);
      }else{
        tab.content.instance.IsActive = false;
      }
    }
  }

  closeTab(uniqueCode: string){
    var tabToClose : ITab | null = null;
    var index = -1;
    for(let i = 0; i < this.tabs.length; i++){
      if(this.tabs[i].uniqueCode == uniqueCode){
        tabToClose = this.tabs[i];
        index = i;
      }
    }
    var component = tabToClose?.content.instance as ITabComponent;

      if(component.CanClose()){
          //this.removeTab(tabToClose! , index);
          var subscription = this.modalService.showModal('Are you sure you want to close this tab?').subscribe({
            next: (res: string) => {
              if(res == 'yes'){
                if(tabToClose != null){
                  this.removeTab(tabToClose! , index);
                }
              }
              subscription.unsubscribe();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    }
    removeTab(tabToRemove: ITab, index: number){
      if(tabToRemove.content.instance.IsActive){
        tabToRemove.content.instance.IsActive = false;
        this.tabs.splice(index,1);
        this.containerRef.detach();

        if(this.tabs.length > 0){

          if(index == this.tabs.length){
            this.tabs[index - 1].content.instance.IsActive = true;
            this.containerRef.insert(this.tabs[index - 1].view);
          }else{
            this.tabs[index].content.instance.IsActive = true;
            this.containerRef.insert(this.tabs[index].view);
          }
        }
  }else{
       this.tabs.splice(index,1);
    }
  }
}
