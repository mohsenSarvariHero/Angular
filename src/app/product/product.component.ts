import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl,FormBuilder,ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ITabComponent,Product } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'product',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements ITabComponent,OnInit {
  newProduct: Product = {name: '',quantity:0}
  products : Product[]=[];
  inputControl : FormControl;
  @Input() IsActive:boolean = true;
  @Output() onClose = new EventEmitter<void>();
  constructor(fb: FormBuilder){
    this.inputControl = fb.control('');
  }

  ngOnInit() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }
  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
  addProduct() {
    if (this.newProduct.name && this.newProduct.quantity > 0) {
      this.products.push({ ...this.newProduct });
      this.newProduct = { name: '', quantity: 0 }; // Reset input fields
      this.saveProducts();
    }
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);         // Remove from array
    this.saveProducts();                    // Update localStorage
  }
  


  CanClose(): boolean {
    if(this.inputControl.value !== ' '){
      return true;
    }else{
      return false;
    }
  }
}
