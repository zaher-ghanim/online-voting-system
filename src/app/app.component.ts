import { Component, OnInit } from '@angular/core';
import { DatainitService } from './services/datainit.service';

@Component({
  selector: 'app-root',
 standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent  {

  constructor(private dataInitService : DatainitService){}

  ngOnInit(): void {
    this.dataInitService.initializeData();
  }
}
