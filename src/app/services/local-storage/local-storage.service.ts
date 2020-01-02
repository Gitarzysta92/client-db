import { Injectable } from '@angular/core';
import {NgForage, Driver, NgForageCache, NgForageConfig, CachedItem} from 'ngforage';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private readonly ngf: NgForage, 
    private readonly cache: NgForageCache
  ) {
    this.ngf.name = 'Store';
    this.cache.driver = Driver.INDEXED_DB;
  }
    
  public getItem(key: string) {
    return this.ngf.getItem(key);
  }

  public setItem(key, data) {
    this.ngf.setItem(key, data);
  }

  public clearStorage() {
    this.ngf.clear() 
  }
  
}
