
//componete priciapal sirve para el contenedor princiapr
import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { Panel } from './components/panel/panel';
import { RouterOutlet } from '@angular/router';

@Component({
  selector:'app-root',
  standalone:true,
  imports:[RouterOutlet],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
