import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  appHeader: string = "Inventory Management";
  addItemText: string = "Add Inventory Item";

  constructor() { }

  ngOnInit(): void {
  }

}
