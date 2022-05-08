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
export class InventoryComponent implements OnInit,OnDestroy {

  appHeader: string = "Inventory Management";
  addItemText: string = "Add Inventory Item";
  inventoryItems: any = [];
  inventorySub: Subscription;
  inventoryPostSub: Subscription;
  inventoryList: any;
  loadItems = false
  inventoryObj: InventoryModel = new InventoryModel();
  @ViewChild('f') InventoryFormDetails: NgForm;

  constructor(private inventoryService:InventoryService) { }

  ngOnInit(): void {
    this.getAllInventoryItems()
  }

  getAllInventoryItems(){
    this.inventorySub = this.inventoryService.getInventoryItems().subscribe(res => {
      console.log(res);
      this.inventoryItems = res;
      this.inventoryList = this.inventoryItems.Item1;
      console.log(this.inventoryList);
      this.loadItems = true;
    });
  }
  onSubmit(){
    console.log(this.InventoryFormDetails.value.name);
    console.log(this.inventoryObj);
  }

  Closed(){
    console.log("closed")
  }

  AddItemToInventoryList(){
    this.inventoryObj.name = this.InventoryFormDetails.value.name;
    this.inventoryObj.description = this.InventoryFormDetails.value.description;
    this.inventoryObj.category = this.InventoryFormDetails.value.category;
    this.inventoryObj.price = this.InventoryFormDetails.value.price;
    this.inventoryObj.quantity = this.InventoryFormDetails.value.quantity;
    this.inventoryPostSub = this.inventoryService.postInventoryItems(this.inventoryObj).subscribe(res => {console.log(res);
    this.getAllInventoryItems();});
  }
  ngOnDestroy(){
    this.inventorySub.unsubscribe();
    this.inventoryPostSub.unsubscribe();
  }
}
