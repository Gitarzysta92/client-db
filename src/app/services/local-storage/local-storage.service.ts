import { Injectable } from '@angular/core';
import {NgForage, Driver, NgForageCache, NgForageConfig, CachedItem} from 'ngforage';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key: string = 'Profiles';
  name: string;

  constructor(
    private readonly ngf: NgForage
  ) {
    this.ngf.name = 'LocalStorage';
    this.name = this.ngf.name
  }
  
  // Pobranie jednego elementu po jego kluczu w obiekcie
  public async getItem(key: string) {
    if (!key) return;
    const items: Array<any> = await this.ngf.getItem(this.key);
    return items.find(item => item.key === key);
  }

  // Pobranie wielu elementów po jego kluczach w obiekcie
  public async getItems(keys?: Array<string>) {
    const items: Array<any> = await this.ngf.getItem(this.key);
    if (!Array.isArray(keys)) return items;

    const result = keys.map(key => items.find(item => item.key === key));
    return result;
  }

  // Dodanie jednego elementu 
  public async addItem(key, data) {
    const storedItems: Array<any> = await this.ngf.getItem(this.key) || [];
    return await this.ngf.setItem(this.key, [data, ...storedItems]);
  }

  // Dodanie wielu elementow
  public async addItems(items: Array<any> = []) {
    const storedItems: Array<any> = await this.ngf.getItem(this.key) || [];
    return await this.ngf.setItem(this.key, [...items, ...storedItems]);
  }

  // Zaktualizowanie wielu elementow
  public async updateItems(items: Array<any>) {
    const storedItems: Array<any> = await this.ngf.getItem(this.key) || [];
    
    items.forEach(item => {
      const index = storedItems.findIndex(storedItem => storedItem.key === item.key); 
      index && (storedItems[index] = item)
    });

    return await this.ngf.setItem(this.key, storedItems);
  } 

  // Usuniecie wielu elementow
  public async deleteItems(keys: Array<any> = []) {
    const storedItems: Array<any> = await this.ngf.getItem(this.key) || [];
    const updateItems = storedItems.filter(storedItem => !keys.find(key => key === storedItem.key))
    return await this.ngf.setItem(this.key, updateItems);
  }

  public async clearStorage() {
    return await this.ngf.clear() 
  }
  
}
