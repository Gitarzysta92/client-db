import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LocalStorageInstanciesService } from '../../services/local-storage-instancies/local-storage-instancies.service';
import { ProfileService } from '../../services/profiles/profile.service';

@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.scss']
})
export class ComparisionComponent implements OnInit {

  performanceTests: Array<PerformanceTest> = [];
  servicesToTest: Array<any> = [];

  testData: Array<any> = [];
  choosenData: Array<any> = [];
  modifiedData: Array<any> = [];
  sampleDataKeys: Array<any> = [];


  numberOfItemsToEdit: number = 10;
  iterationGap: number = 100;

  constructor(
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private localStorageInstanciesService: LocalStorageInstanciesService
  ){
    this.servicesToTest = [ this.localStorageService, this.localStorageInstanciesService ];
  }

  ngOnInit() {
    this.profileService.getServerProfiles()
      .then(data => this.testData = data)
      .then(data => this.chooseSampleData())
      .then(data => this.modifySampleData())
      .then(data => this.getSampleDataKeys())
      .then(data => this.clearStorages())
      .then(result => this.runTasks(this.servicesToTest));
  }

  // Sekwencyjne uruchomienie testow
  async runTasks(services) {
    if (Array.isArray(services) && services.length === 0) return;
    const tempServices = services.map(service => service);
    const service = tempServices.pop(); 
    await this.testStoragePerformance(service);
    this.runTasks(tempServices);
  };
  

  // Wykonanie testu i zapisanie wynikow
  async testStoragePerformance(storageInstance) {
    const performance = new PerformanceTest({name: storageInstance.name})
    
    performance.create = await this.getAsyncTaskExecutionTime(this.loadDataToStorage, [storageInstance, this.testData]);
    performance.read = await this.getAsyncTaskExecutionTime(this.getStoredItems, [storageInstance, this.sampleDataKeys]);
    performance.update = await this.getAsyncTaskExecutionTime(this.updateStoredItems, [storageInstance, this.modifiedData]);
    performance.delete = await this.getAsyncTaskExecutionTime(this.deleteStoredItems, [storageInstance, this.sampleDataKeys]);

    this.performanceTests.push(performance);
  } 

  // Sprawdzenie czasu egzekucji funkcji
  async getAsyncTaskExecutionTime(task: Function, params: Array<any>): Promise<string> {
    const t0 = performance.now();
    await task.apply(this, params);
    const t1 = performance.now();
    return `${(t1 - t0)}`;
  }

  // Wyczyszczenie storage'ow
  async clearStorages() {
    await this.clearStorage(this.localStorageService);
    await this.clearStorage(this.localStorageInstanciesService);
    return;
  }

  // Przygotowanie danych do zapisywania i aktualizowania
  chooseSampleData() {
    for (let i = 0; i < this.numberOfItemsToEdit; i++) {
      this.choosenData.push(this.testData[i+this.iterationGap]);
    }
  }

  modifySampleData() {
    this.modifiedData = this.choosenData.map(item => {
      item.name = 'Test name';
      return item;
    });
  }

  getSampleDataKeys() {
    this.sampleDataKeys = this.choosenData.map(item => item.key);
  }

  // Local storage api

  async loadDataToStorage(storageInstance, data) {
    const result = await storageInstance.addItems(data);
    return result;
  }

  async getStoredItems(storageInstance, keys?: Array<string>) {
    const result = await storageInstance.getItems(keys);
    return result;
  }

  async updateStoredItems(storageInstance, data) {
    const result = await storageInstance.updateItems(data);
    return result;
  }

  async deleteStoredItems(storageInstance, keys?: Array<string>) {
    const result = await storageInstance.deleteItems(keys);
    return result;
  }

  async clearStorage(storageInstance) {
    const result = await storageInstance.clearStorage();
    return result;
  }
}


export class PerformanceTest {
  name: string;

  create: string;
  read: string;
  update: string;
  delete: string;
  constructor(testData) {
    this.name = testData.name;
  }
}
