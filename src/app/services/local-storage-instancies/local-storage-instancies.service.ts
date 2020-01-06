import { Injectable } from '@angular/core';
import { NgForage, Driver, NgForageCache, NgForageConfig, CachedItem, InstanceFactory, DedicatedInstanceFactory} from 'ngforage';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageInstanciesService {

  currentStorage: NgForage;
  name: string;

  constructor(
    private readonly dedicatedInstanceFactory: DedicatedInstanceFactory
  ) {
    this.currentStorage = this._createStorageInstance('localStorageInstance');
    this.name = this.currentStorage.name;
  }

  //
  // Publiczne api
  //

  // Pobranie elementu
  public async getItem(key: string) {
    return this.currentStorage.getItem(key);
  }

  // Pobranie elementów
  public async getItems(keys?: Array<string>) {
    const items = [];

    // pobieranie wszystkich elementow
    if (keys == null) {
      await this.currentStorage.iterate(function(value, key, iterationNumber) { 
        items.push(value);
      });
      return items;
    }

    // pobieranie wybranych elementow
    Array.isArray(keys) && keys.forEach(async key => {
      const item = await this.currentStorage.getItem(key);
      item && items.push(item);
    });
    return Promise.all(items);
  }


  // Ustawienie elementu
  public async addItem(key, data) {
    return await this.currentStorage.setItem(key, data);
  }


  // Ustawienie elementow
  public async addItems(items) {
    const results = items.map(async item => await this.addItem(item.id, item));
    return Promise.all(results);
  }


  // Zaktualizowanie wielu elementow
  public async updateItems(items) {
    const results = items.map(async item => this.addItem(item.id, item));
    return Promise.all(results);
  }


  // Usuniecie wielu elementow
  public async deleteItems(keys: Array<string>) {
    const results = keys.map(async key => await this.currentStorage.removeItem(key));
    return Promise.all(results); 
  }


  // Czyszczenie instancji
  public async clearStorage() {
    return await this.currentStorage.clear() 
  }

  //
  // Metody prywatne
  //

  private _createStorageInstance(name: string): NgForage {
    const storage = LocalStorages.getStorage(name);

    if (storage) return storage;
    
    const newStorage = this.dedicatedInstanceFactory.createNgForage({
      name: name,
      driver: [ Driver.INDEXED_DB ]
    })

    return LocalStorages.addStorage(newStorage);
  }
  
}


class LocalStorages {
  private static _list: Array<NgForage> = [];
  public static get list(): Array<NgForage> {
    return this._list;
  }

  public static addStorage(storage: NgForage): NgForage {
    const isExists = this._list.find(instance => instance.name === storage.name);
    
    if (isExists) {
      return isExists;
    } else {
      this._list.push(storage);
      return storage;
    }
  }

  public static getStorage(name: string): NgForage {
    return this._list.find(instance => instance.name === name);
  }

}