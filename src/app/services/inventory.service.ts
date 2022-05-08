import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
    "mode": 'no-cors'
  })
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getInventoryItems() {
    return this.http.get(this.baseUrl + '/Item1', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        "mode": 'no-cors'
      }
    });
  }

  postInventoryItems(data) {
    return this.http.post(this.baseUrl + '/Item1', data, httpOptions);
  }

  deleteInventoryItem(data: any) {
    return this.http.delete(this.baseUrl + '/Item1/' + data.id);
  }

  updateInventoryItem(updatedData: any, id: any) {
    return this.http.put(this.baseUrl + '/Item1/' + id, updatedData);
  }
}
