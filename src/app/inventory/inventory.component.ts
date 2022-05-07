import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  appHeader: string = "Inventory Management";
  addItemText: string = "Add Inventory Item";
  inventoryItems: any;

  constructor(private inventoryService:InventoryService) { }

  ngOnInit(): void {
     this.inventoryService.getInventoryItems().subscribe(res => {console.log(res);
      this.inventoryItems = res;});
  }

  Closed(){
    console.log("closed")
  }
}
