//IMPORTAMOS LA HERRAMIENTA DE LSO COMPONENTES UTILIZADOS
import { Component,OnInit,ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
//importamos herramienta de formulario
import { FormsModule,NgForm } from "@angular/forms";
//importamos las herraminetas del navegador
import { ActivatedRoute,Router } from "@angular/router";
import { DetalleEjecucion } from "../../models/detalleEjecucion";
import { DetalleEjecucionService } from "../../services/detalleEjecucion.service";

@Component({
  selector:'app-editar',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:"./editar.html",
  styleUrl:"./editar.css"
})
export class Editar implements OnInit{
  detalle:DetalleEjecucion | null=null;
  cargando=false;
  guardando=false;
  error='';
  mensaje='';
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private servicio:DetalleEjecucionService,
    private cdr:ChangeDetectorRef
  ){}
  //cargamos el registro al abrir el componente
  ngOnInit():void{
    this.cargarDetalle();
  }
  cargarDetalle():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    //validamos el id
    if(!Number.isInteger(id)|| id<=0){
      this.error="EL ID DE LA EJECUCION NO ES VALIDA"
      this.cargando=false;
      this.cdr.markForCheck();
      return
    }
    this.cargando=true;
    this.error='';
    this.mensaje='';
    this.detalle=null;
//solicitamos el registro del backend
    this.servicio.buscarPorId(id).subscribe({
      next:(data)=>{
        this.detalle=data;
        this.cargando=false;
        this.cdr.markForCheck();

      },
      error:(err)=>{
        console.error('ERROR AL CARGAR LA EJECUCION',err);
        this.cargando=false;
        if(err.status===404){
          this.error='NO SE PUDO CONECTAR CON EL BACKEND'
        }else{
          this.error='NO SE PUDO CARGAR LA EJECUCION';
        }
        this.cdr.markForCheck();
      }
    })
  }
  //validamos y guardamos los cambios
  guardar(formulario:NgForm):void{
    //evitamos solicitudes duplicadas
    if(this.guardando){
      return;
    }
    this.error='';
    this.mensaje='';
    if(formulario.invalid || !this.detalle){
      formulario.control.markAllAsTouched();
      this.error='COMPLETE CORRECTAMENTE LSO CAMPOS DEL FORMULARIO';
      return;
    }
    //eliminamos espacions de la descripcion
    const descripcion=this.detalle.descripcion.trim();
    this.guardando=true
    //encviamos los datos al backend
    this.servicio.actualizar(
      this.detalle.idDetalleEjecucion,
      this.detalle
    ).subscribe({
      next:()=>{
        this.guardando=false;
        this.mensaje='ACTUALIZACION GUARDADA CORRECTAMENTE'
        this.cdr.markForCheck();
      },
      error:(err)=>{
        console.error('ERROR AL ACTUALIZAR LA EJECUCION:',err)
        this.guardando=false;
        if(err.status===404){
          this.error='LA EJECUCION YA NO EXISTE';

        }else if(err.status===400){
          //extraemos los errores y los enviamos al backedn
          const errores=err.error?.errors as
          Record<string,string[]>| undefined
          //unimos los mensajes de validadicon
          const mensajes=errores
          ?Object.values(errores).flat().join('')
          :'';
            //mostramos el motivo de rechazo
            this.error=mensajes ||
            err.error?.title||
            'EL BACKEND RECHAZO LOS DATOS INGRESADOS';
            console.error('VALIDACION DEL BACKEND:',err.error);
        }else if(err.status===0){
          this.error=
          'NO SE PUDO CONECTAR CON EL BACKEND'
        }else{
          this.error='NO SE PUDO ACTUALIZAR LA EJECUCION';
        }
        //actualizamos la vista
        this.cdr.markForCheck();
      }
    })
  }
  //regresamos al panet indicando que debe de cargar el listado
  volver():void{
    this.router.navigate(['/'],{
      queryParams:{listado:'ejecuciones'}
    });
  }
}

