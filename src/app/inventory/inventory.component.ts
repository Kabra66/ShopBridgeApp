import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { InventoryModel } from '../model/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  appHeader: string = "Inventory Management";
  addItemText: string = "Add Inventory Item";
  inventoryItems: any = [];
  inventorySub: Subscription;
  inventoryPostSub: Subscription;
  inventoryUpdateSub: Subscription;
  inventoryDeleteSub: Subscription;
  inventoryList: any;
  loadItems = false
  inventoryObj: InventoryModel = new InventoryModel();
  addItem = true;
  updateItem = false;
  name: string = '';
  description: string = '';
  category: string = '';
  price: string | number = '';
  quantity: string | number = '';
  id: string | number = ''
  @ViewChild('f') InventoryFormDetails: NgForm;
  updationId: any;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getAllInventoryItems()
  }

  updateInventoryItem(items) {
    this.updateItem = true;
    this.addItem = false;
    this.updationId = items.id;
    console.log(items);
    this.InventoryFormDetails.form.patchValue({
      name: items.name,
      description: items.description,
      price: items.price,
      category: items.category,
      quantity: items.quantity
    });

  }
  deleteInventoryItem(data: any) {
    this.inventoryDeleteSub = this.inventoryService.deleteInventoryItem(data).subscribe(res => {
      console.log(res);
      this.getAllInventoryItems();
      alert("Inventory Item Deleted Succefully.");
    },
    error => {
      alert(error.message);
    });
  }
  AddInventoryClick() {
    this.updateItem = false;
    this.addItem = true;
    this.InventoryFormDetails.reset();
  }
  getAllInventoryItems() {
    this.inventorySub = this.inventoryService.getInventoryItems().subscribe(res => {
      console.log(res);
      this.inventoryItems = res;
      this.inventoryList = this.inventoryItems;
      console.log(this.inventoryList);
      this.loadItems = true;
    },
    error => {
      alert(error.message);
    });
  }
  onSubmit() {
    console.log(this.InventoryFormDetails.value.name);
    console.log(this.inventoryObj);
  }

  Closed() {
    console.log("closed")
  }

  AddItemToInventoryList() {
    this.inventoryObj.name = this.InventoryFormDetails.value.name;
    this.inventoryObj.description = this.InventoryFormDetails.value.description;
    this.inventoryObj.category = this.InventoryFormDetails.value.category;
    this.inventoryObj.price = this.InventoryFormDetails.value.price;
    this.inventoryObj.quantity = this.InventoryFormDetails.value.quantity;
    this.inventoryPostSub = this.inventoryService.postInventoryItems(this.inventoryObj).subscribe(res => {
      console.log(res);
      this.InventoryFormDetails.reset();
      this.getAllInventoryItems();
      alert("Inventory Item Added Succefully.");
      let ref = document.getElementById('close');
      ref.click();
    },
    error => {
      alert(error.message);
    });
  }
  UpdateItemToInventoryList() {
    this.inventoryObj.name = this.InventoryFormDetails.value.name;
    this.inventoryObj.description = this.InventoryFormDetails.value.description;
    this.inventoryObj.category = this.InventoryFormDetails.value.category;
    this.inventoryObj.price = this.InventoryFormDetails.value.price;
    this.inventoryObj.quantity = this.InventoryFormDetails.value.quantity;
    this.inventoryUpdateSub = this.inventoryService.updateInventoryItem(this.inventoryObj, this.updationId).subscribe(res => {
      console.log(res);
      this.getAllInventoryItems();
      alert("Inventory Item Updated Succefully.");
      let ref = document.getElementById('close');
      ref.click();
    },
    error => {
      alert(error.message);
    });
  }
  ngOnDestroy() {
    this.inventorySub.unsubscribe();
    this.inventoryPostSub.unsubscribe();
    this.inventoryDeleteSub.unsubscribe();
    this.inventoryUpdateSub.unsubscribe();
  }
}
