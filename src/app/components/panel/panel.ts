
//COMPONENT PANEL
//CONTROLA LA LOGICA DEL MENU
//CARGA DATOS DESDE EL BACKEND Y LOS MUESTRA EN PANTALLA
import { Component } from "@angular/core";
import { CommonModule} from '@angular/common';
import { DetalleEjecucion } from "../../models/detalleEjecucion"; //llamamos al modelo
import { DetalleEjecucionService } from "../../services/detalleEjecucion.service";
import { Router } from "@angular/router";

@Component({
  //nombre de la etiqueta del componente
  selector:'app-panel',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./panel.html',
  styleUrl:'./panel.css'
})

export class Panel{
  //controlamso si el sidebar esta contraido
  sidebarContraido=false;
  dashboardAbierto=true;
  usuario='LuxuDev';
  //lista donde se guarda los detalles de la ejecuciones
  detalleEjecuciones:DetalleEjecucion[]=[];
  mostraTabla=false;
  cargando=false;
  //guardamos el mensje de error
  error='';
  //injectamos el servicio de detalle ejecuciones
  constructor(
    private DetalleEjecucionService:DetalleEjecucionService,
    private router:Router){}
  toggleSidebar():void{
      this.sidebarContraido=!this.sidebarContraido;
  }
  toggleDashboard():void{
    this.dashboardAbierto=!this.dashboardAbierto;
  }
  cargarDetalleEjecucion():void{
    console.log('clik en detalle ejecuciones');
    this.cargando=true;
    this.error='';
    this.mostraTabla=false;
    this.DetalleEjecucionService.listar().subscribe({
      next:(data)=>{
        console.log('Datos Recibidos:',data)
        this.detalleEjecuciones=data;
        this.mostraTabla=true;
        this.cargando=false;
      },
      error:(err)=>{
        console.error('ERROR RECIBIDO',err)
        this.error='NO SE PUDO CARGAR LA LISTA DE LOS DETALLES DE LAS EJECUCIONES';
        this.mostraTabla=false;
        this.cargando=false
      },
    });
  }
      ///abre details enviando el id seleccionado
      verDetalle(id:number):void{
        this.router.navigate(['/details',id]);
      }
      editarDetalle(id:number):void{
        this.router.navigate(['/editar',id]);
      }
      eliminarDetalle(id:number):void{
        this.router.navigate(['/eliminar',id])
      }
      //abrimos el formulario para agregar
      agregarDetalle():void{
        this.router.navigate(['/registrar']);
      }

}
