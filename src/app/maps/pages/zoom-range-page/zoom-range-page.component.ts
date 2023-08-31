import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  //para hacer referencia a un elemento HTML
  @ViewChild('map') divMap?: ElementRef; //en un determinado momento es undefined por eso el ?

  public zoom: number = 14;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-66.80996013155007, 10.48858785603656)

  ngAfterViewInit(): void {
    //despues que ya tenemos las referencias html inicializadas ahi es donde mandamos a llamar el siguiente codigo

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, //de esta manera hacemos referencia a lo que queremos mostrar en el div
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {

    //Tenemos que destruir los listeners cuando el componente ya no va a funcionar con el remove destruimos todo el mapa
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () =>{
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string){
    this.zoom = Number(value); //Transformamos el valor de value de string a number
    this.map?.zoomTo( this.zoom );
  }
}
