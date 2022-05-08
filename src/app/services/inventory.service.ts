import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json; charset=UTF-8',
  })
}

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

  postInventoryItems(data){
    return this.http.post('/Kabra66/ShopBridgeApp/Item1',data,httpOptions);
  }
}
