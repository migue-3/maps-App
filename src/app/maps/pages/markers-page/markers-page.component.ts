import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

//Creamos esta interface para poder grabar en el localStorage solo la data que necesitamos
interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent {
  //para hacer referencia a un elemento HTML
  @ViewChild('map') divMap?: ElementRef; //en un determinado momento es undefined por eso el ?

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-66.80996013155007, 10.48858785603656);

  ngAfterViewInit(): void {
    //despues que ya tenemos las referencias html inicializadas ahi es donde mandamos a llamar el siguiente codigo

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, //de esta manera hacemos referencia a lo que queremos mostrar en el div
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readFromLocalStorage();

    // const marker = new Marker({
    //   color: 'red'
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );
  }

  createMarker() {
    if (!this.map) return;

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true, //propiedad para poder mover el marcador
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    //Cada vez que se crea un marker lo insertamos en nuestro arreglo de markers
    this.markers.push({
      color: color,
      marker: marker,
    });
    this.saveToLocalStorage();

    //Para guardar en el localStorage la posicion donde quedo el marcador en el mapa
    marker.on('dragend', () => this.saveToLocalStorage() );
  }

  deleteMarker(index: number) {
    //con esto lo eliminamos del mapa
    this.markers[index].marker.remove();

    //con esto lo eliminamos del arreglo markers
    this.markers.splice(index, 1);

    this.saveToLocalStorage();
  };

  flyTo( marker: Marker){

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  };

  saveToLocalStorage() {
    //preparamos la data que queremos insertar en el localStorage
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) => { //para convertir esa data la pasamos por el metodo map de los arrays, desestructuramos de MarkerAndColor el color y el marker

      //tenemos que regresar la longitud y la latitud como un array para poder grabar en el localStorage
      return {
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    //de esta manera si podemos almacenar en el localStorage
    // console.log(plainMarkers)
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    //con esta instruccion insertamos los marcadore en el mapa
    plainMarkers.forEach( ({color, lngLat}) => {
      const [ lng, lat] = lngLat;
      const coords = new LngLat( lng, lat);

      this.addMarker( coords, color);
    });
  }
}
