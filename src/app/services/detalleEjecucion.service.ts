
//sevice para conectar con el endpoint de la base de datos
//sirve para consumie el backend mediante peticiones http
//importamos injectable para crear un servicio en angular
import {Injectable} from "@angular/core";
//importamos httpclient para consumir la APIs
import { HttpClient } from "@angular/common/http";
//importamos el observable para manejer las respuestas asincronas
import { DetalleEjecucion } from "../models/detalleEjecucion";
import { Observable } from "rxjs";
//indicamos que este servicio estara disponible en toda la aplicacion
@Injectable({
  providedIn:'root'
})

//creamos la clase servicion
export class DetalleEjecucionService{
  //guarda la url base del backend
  private api="https://localhost:7141/api/apiejecucion";
  //inyectamos el httpclient para poder hacer peticiones http
  constructor(private http:HttpClient){}
  //metodo que llama al endpoint listar del backen
  listar():Observable<DetalleEjecucion[]>{
    //se realiza una peticion GET y devuelve la lista de detalle ejecucion
    return this.http.get<DetalleEjecucion[]>(`${this.api}/listar`);
  }
  //obtenemos un detalle utilizando el id
  buscarPorId(id:number):Observable<DetalleEjecucion>{
  return this.http.get<DetalleEjecucion>(`${this.api}/detalle/${id}`);
}
//metodo para registrar
registrar(
  datos:{
    descripcion:string;
    cantidad:number;
    importe:number;
    igv:number;
    total:number;
    registro:string;
    idCabeceraEjecucion:number;
  }
):Observable<unknown>{
  return this.http.post<unknown>(`${this.api}/registrar`,datos);
}
//metodo para actualizar
actualizar(id:number,detalle:DetalleEjecucion):Observable<DetalleEjecucion>{
  return this.http.put<DetalleEjecucion>(`${this.api}/actualizar/${id}`,detalle);
}
//metodo para eliminar
eliminar(id:number):Observable<void>{
  return this.http.delete<void>(`${this.api}/eliminar/${id}`);
}
}

