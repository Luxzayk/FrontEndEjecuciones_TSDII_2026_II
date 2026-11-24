import { Component,OnInit,ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
//importamos las herraminetas del navegador
import { ActivatedRoute,Router } from "@angular/router";
import { DetalleEjecucion } from "../../models/detalleEjecucion";
import { DetalleEjecucionService } from "../../services/detalleEjecucion.service";


@Component({
  selector:'app-eliminar',
  standalone:true,
  imports:[CommonModule],
  templateUrl:"./eliminar.html",
  styleUrl:"./eliminar.css"
})
export class Eliminar implements OnInit{
  detalle:DetalleEjecucion | null=null;
  cargando=false;
  eliminando=false;
  eliminado=false;
  mensaje='';
  error='';

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private servicio:DetalleEjecucionService,
    private cdr:ChangeDetectorRef
  ){}
  ngOnInit(): void {
      this.cargarDetalle();

  }

    cargarDetalle():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    //validamos el id
    if(!Number.isInteger(id)|| id<=0){
      this.error="EL ID DE LA EJECUCION NO ES VALIDA"
      this.cargando=false;
      this.cdr.markForCheck();
      return;
    }
//solicitamos el registro del backend
    this.servicio.buscarPorId(id).subscribe({
      next:(data)=>{
        this.detalle=data;
        this.cargando=false;
        this.cdr.markForCheck();

      },
      error:(err)=>{
        this.cargando=false;
        this.error=err.status===404
        ? 'La ejecucion no existe'
        :err.status===0
        ?'No se puedo conectar con el backend'
        :'No se pudo cargar la ejecucion';
        this.cdr.markForCheck()
      }
    })
  }
///eliminamos unicanmente cuando pulsamos el boton confirmar
confirmarEliminar():void{
  if(!this.detalle|| this.eliminando || this.eliminado){
    return;
  }
  this.error='';
  this.eliminado=true;
  this.servicio.eliminar( this.detalle.idDetalleEjecucion )
  .subscribe({
      next:()=>{
        this.eliminando=false;
        this.eliminado=true;
        this.detalle=null
        this.cdr.markForCheck();
      },
      error:(err)=>{
        this.cargando=false;
        if(err.status===404){
          this.error='La ejecucion no existe'
        }else if(err.status===0){
          this.error='No se pudo conenctar al backend'
        }else if(err.status===409){
          this.error='Nose puede eliminar poque tiene registros relacionados'
        }else{
          this.error='No se pudo eliminar la ejecucion'
        }
        this.cdr.markForCheck();

      }
    });
}
volver():void{
  this.router.navigate(['/'],{
    queryParams:{listado:'ejecuciones'}
  })
}
}

