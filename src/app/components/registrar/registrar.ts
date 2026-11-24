import { subscribeOn } from 'rxjs';
import { ChangeDetectorRef, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { DetalleEjecucion } from "../../models/detalleEjecucion";
import { DetalleEjecucionService } from "../../services/detalleEjecucion.service";

@Component({
  selector:'app-registrar',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl:'./registrar.html',
  styleUrl:'./registrar.css'
})

export class Registrar{
  guardando=false;
  registrando=false;
  //mensaje que mostaremos al usuario
  mensaje='';
  error='';
  //creamos el objeto que almacenara los datso ingresados
  datos={
    //id sera generado por la base de datos

    descripcion:'',
    cantidad:0,
    importe:0,
    igv:0,
    total:0,
    registro:'',
    idCabeceraEjecucion:null as number|null,
  };

  //controlamos si se esta guardando

  constructor(
    private servicio:DetalleEjecucionService,
    private router:Router,
    private cdr:ChangeDetectorRef
  ){}
  //vaidamos y registramso

guardar(formulario:NgForm):void{
  if(this.guardando || this.registrando){
    return;
  }
  this.error='';
  this.mensaje='';
  const descripcion=this.datos.descripcion.trim();
  const idCabecera=this.datos.idCabeceraEjecucion;
  if(
    formulario.invalid ||
    !descripcion ||
    idCabecera===null ||
    !Number.isInteger(idCabecera)||
    idCabecera<=0 ||
    !Number.isInteger(this.datos.cantidad)
  ){
    formulario.control.markAllAsTouched();
    this.error='complete correctamente los campos del formulario';
    return;
  }
  const nuevoRegistro={
    descripcion,
    cantidad:this.datos.cantidad,
    importe:this.datos.importe,
    igv:this.datos.igv,
    total:this.datos.total,
    registro:`${this.datos.registro}:00`,
    idCabeceraEjecucion:idCabecera
  };
  this.guardando=true;
  this.servicio.registrar(nuevoRegistro).subscribe({
    next:()=>{
      this.guardando=false;
      this.registrando=true;
      this.mensaje='Ejecucion Registrada correctamente';
      this.cdr.markForCheck();
    },
    error:(err)=>{
      this.guardando=false;
      if(err.status==400){
        const errores=err.error?.errors as
        Record<string,string[]>|undefined;
        this.error=(
          errores
          ?Object.values(errores).flat().join('')
          :''
        ) || err.error?.title ||
        'El backend rechazo los datos ingresados'
      }else if(err.status===0){
        this.error='No se pudo conectar con el backend';
      }else{
        this.error='No se pudo registrar la ejecucion'
      }
      this.cdr.markForCheck();
    }
  })
}
volver():void{
  this.router.navigate(['/']),{
    queryParams:{listado:'ejecuciones'}
  }
}
}
