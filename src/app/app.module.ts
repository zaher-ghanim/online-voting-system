import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	]
})
export class AppModule { }
