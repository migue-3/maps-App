import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {

  @ViewChild('map') divMap?: ElementRef; 

  @Input() lngLat?: [number, number];

  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map Div not found";
    if( !this.lngLat ) throw "LngLat can't be null";

    //mapa
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,  //lo recibo como argumento
      zoom: 13,
      interactive: false //para no mover el mapa ni hacer zoom, queda como si fuera una imagen
    });

    //marker
    new Marker()
      .setLngLat( this.lngLat)
      .addTo( map )


  }

}
