import { Injectable } from '@angular/core';
import {NgForage, Driver, NgForageCache, NgForageConfig, CachedItem} from 'ngforage';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private readonly ngf: NgForage
  ) {
    this.ngf.name = 'Store';
    console.log(this.ngf)
  }
    
  public getItem(key: string) {
    return this.ngf.getItem(key);
  }

  public async getItems() {
    const items = [];
    await this.ngf.iterate(function(value, key, iterationNumber) {
      items.push(value);
    })

    console.log('local storage service', items);

    return items.length != 0 ? items : null;
  }

  public setItem(key, data) {
    this.ngf.setItem(key, data);
  }

  public setItems(items) {
    items.forEach(item => this.setItem(item.id, item));
  }

  public clearStorage() {
    this.ngf.clear() 
  }
  
}
