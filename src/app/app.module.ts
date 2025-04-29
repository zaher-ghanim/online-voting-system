import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { share } from 'rxjs';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
    SharedModule
	]
})
export class AppModule { }
