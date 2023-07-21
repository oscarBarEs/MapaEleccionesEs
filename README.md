# MapaEleccionesEs
Un mapa interactivo con todas las provincias de españa. Los datos base se recogen a partir de los datos brutos del [CIS](https://www.cis.es/cis/opencms/ES/index.html).
<p float="left">
  <img src="resources/mapa.png?raw=true" width="50%">
</p>

Este codigo incluye 2 paginas, una donde se muestra el mapa de las provincias españolas a partir de la libreria [Amcharts](https://www.amcharts.com/) y una segunda pagina donde se mostraran los partidos que se presentan en cada circunscripción junto con un arco echo con [D3Js](https://d3js.org/) y una tabla que reproduce los calculos de la ley D'hondt.

<p float="middle">
  <img src="resources/tabla.png?raw=true" width="60%">
</p>
Ademas, no hara falta cambiar de pagina para mostrar la segunda atraves de la funcion Cargar del codigo.

```
function Cargar(url, capa)
{
    
}
```

Donde la url sera la pagina con los datos, en este caso `23j.html` y la capa la id del div donde deseas cargar la nueva pagina.

## Datos Cis

Para tener un JSON con datos para cada provincia se ha decidido extraer los datos brutos del CIS. Para ello se ha creado un programa en R. Ademas para simplificar los datos se han estraido algunas respuestas que no aportan a la mejor compresion de los datos.

```
  # Partidos a excluir
  partidos_excluir <- c("No sabe todavía", "Voto nulo","N.C.","No votaría")
  # Obtener la lista de partidos únicos y su número de votos
  partidos <- unique(datos_provincia$`INTENCIONG.Intención.de.voto.en.las.elecciones.generales.de.2023`)
  partidos <- setdiff(partidos, partidos_excluir)
```



