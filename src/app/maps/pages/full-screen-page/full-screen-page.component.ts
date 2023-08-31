import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})

export class FullScreenPageComponent implements AfterViewInit {

  //para hacer referencia a un elemento HTML
  @ViewChild('map') divMap?: ElementRef; //en un determinado momento es undefined por eso el ?


  ngAfterViewInit(): void {
    //despues que ya tenemos las referencias html inicializadas ahi es donde mandamos a llamar el siguiente codigo
    
    if(!this.divMap) throw 'El elemento HTML no fue encontrado'

    const map = new Map({
      container: this.divMap.nativeElement, //de esta manera hacemos referencia a lo que queremos mostrar en el div
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });
  }
}
