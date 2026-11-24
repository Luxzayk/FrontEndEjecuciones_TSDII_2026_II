import { DetalleEjecucionService } from './../../services/detalleEjecucion.service';
import { Component, OnInit , ChangeDetectorRef} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetalleEjecucion } from "../../models/detalleEjecucionDetails";
import { ActivatedRoute,Router } from "@angular/router";
import { subscribeOn } from 'rxjs';

@Component({
  selector:'app-details',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./details.html',
  styleUrl:'./details.css'
})
export class Details implements OnInit{
  //guardamos el detalle obtenido del backend
  detalle:DetalleEjecucion|null=null;
  //controla el estado de carga
  cargando=false;
//guarda un posible mensaje de errror
error='';
//Inyectamos las herramientas que utilizaremos
constructor(
private route:ActivatedRoute,
private router:Router,
private DetalleEjecucionService:DetalleEjecucionService,
private cdt:ChangeDetectorRef
){}
//Se ejecuta automaticamente cuando se abre el componente
ngOnInit(): void {
  //obtenemos el id enviado mediante la URL
  const id=Number(this.route.snapshot.paramMap.get('id'));
  //verificamos que el id sea valido
  if(id>0){
this.cargarDetalle(id);
  }
}
//buscamos el detalle seleccionado en el backend
cargarDetalle(id:number):void{
//Activamos el estado
this.cargando=true;
this.error='';
//llamamos al servicio enviando el ID
this.DetalleEjecucionService.buscarPorId(id).subscribe({
//se ejecuta cuando obtenemos los datos
next:(data)=>{
console.log('Detalle recibido:',data);
//guardamos los datos recibidos
this.detalle=data;
this.cargando=false;
//notificamos a angular que debe de acutalizar la pantall
this.cdt.markForCheck();
},
//se ejecuta
error:(err)=>{

  console.error('Error recibido',err);
  this.error="No se pudo cargar el detalle de la ejecucion";
  this.cargando=false;
  //notificamos a angular que debe de acutalizar la pantall
  this.cdt.markForCheck();
}
});
}
regresar():void{
this.router.navigate(['/'])
}
}
