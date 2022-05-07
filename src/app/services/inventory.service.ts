import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  constructor(private http:HttpClient) { }

  getInventoryItems() {
    return this.http.get('/Kabra66/ShopBridgeApp/db',{
      headers:{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET, OPTIONS, POST, PUT",
        "mode": 'no-cors' 
      }
    });
  }
}
