 
    var NE;
    var pie;
    var outerRadius ;
    var innerRadius ;
    var arc;
    var svg;
    var idPro;
    var resto;
    function setDataPro(da){
        console.log("llega");
        idPro=da;
    }
    function setNE(x){
        NE=x;
    }
    function getTopFiveElements(array,num) {
  // Sort the array in descending order based on "votos" value
  array.sort((a, b) => parseFloat(b.votos) - parseFloat(a.votos));

  // Return the first five elements
  return array.slice(0, num);
}
    function tablarelleno(dataset)
    {
        var existingTable = document.querySelector("table");
        if (existingTable) {
            existingTable.remove();
        }
        var divTabla=document.getElementById("Tabla");
        var divText=document.getElementById("Enunciado");
        var s="";
        if(NE>1){
            s="s";
        }
        divText.innerHTML="<h1>Se eligen unicamente "+NE+" diputado"+s+"</h1><p>En Rojo electos</p><hr>";
        divTabla.innerHTML="<table style='width:100%'></table>";
        var table = document.createElement("table");
        table.classList.add("table");
        
        table.classList.add("table-dark");
        for (var i = 0; i < dataset.length; i++) {
            console.log(dataset[i].label);
        }
        // Create and append the table header row
        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        var headerCell = document.createElement("th");
        headerCell.textContent = "Partidos";
        headerRow.appendChild(headerCell);

        for (var i = 1; i <= NE; i++) {
            var columnNum = i === 0 ? "votos" : "votos / " + i;
            headerCell = document.createElement("th");
            headerCell.textContent = columnNum;
            headerRow.appendChild(headerCell);
        }

        thead.appendChild(headerRow);
        table.appendChild(thead);
        var votosMatrix =[];
        // Create and append the table body rows
        var tbody = document.createElement("tbody");

        for (var j = 0; j < dataset.length; j++) {
            var dataRow = document.createElement("tr");
            var labelCell = document.createElement("td");
            labelCell.textContent = dataset[j].label;
            dataRow.appendChild(labelCell);

            for (var k = 0; k <= NE; k++) {
                var dataCell = document.createElement("td");
                var votosValue = dataset[j].votos;

                if (k > 0) {
                    votosValue = votosValue / k;
                    dataCell.textContent = votosValue.toFixed(4);
                    votosMatrix.push({ "Nx": j,"Ny": k, "votos": votosValue.toFixed(4) });
                    dataRow.appendChild(dataCell);
                }


            }
            
            tbody.appendChild(dataRow);
        }
        const topFive = getTopFiveElements(votosMatrix,NE+1);

            
        tbody.appendChild(dataRow);

        table.appendChild(tbody);
        divTabla.appendChild(table);
        for (var j = 0; j < topFive.length-2; j++) {

        var row = table.rows[topFive[j].Nx+1]; // Row index 1 corresponds to the second row
        var cell = row.cells[topFive[j].Ny]; // Cell index 2 corresponds to the third column
        cell.style.backgroundColor = "red";


        }
        var row = table.rows[topFive[topFive.length-2].Nx+1]; // Row index 1 corresponds to the second row
        var cell = row.cells[topFive[topFive.length-2].Ny]; // Cell index 2 corresponds to the third column
        cell.style.backgroundColor = "#e33a1b";

        var row = table.rows[topFive[topFive.length-1].Nx+1]; // Row index 1 corresponds to the second row
        var cell = row.cells[topFive[topFive.length-1].Ny]; // Cell index 2 corresponds to the third column
        cell.style.backgroundColor = "#fa5a3e";

    }



    //PIE LAYOUT: A partir de un conjunto de datos que representan un porcentaje sobre el total
  //este layout calcula el ángulo inicial y final de cada porción del pastel,
  //también los radios interior y exterior para el caso de tener dos círculos concéntricos
  //Width and height

function pickColor(name){
    var col;
    switch(name){
        case "PP":
            col="#2164E9";
            break;
        case "PSOE":
            col="#EA1916";
            break;
        case "VOX":
            col="#07AC1D";
            break;
        case "Sumar":
            col="#F7329A";
            break;
        case "ERC":
            col="#f2e30f";
            break;
        case "EAJ-PNV":
                col="#18a13d";
                break;
        case "EH Bildu":
            col="#36d962";
            break;
        case "RESTO":
            col="#B1B1B1";
            break;
        case "JxCat":
            col="#1bfacd";
            break;
            
        case "Existe":
            col="#115408";
            break;
            
        case "BNG":
            col="#3ad0f2";
            break;
            
        case "Soria Ya":
            col="#a30505";
            break; 
            
        case "UPN":
            col="#f08a0e";
            break;
        case "En blanco":
            col="#ffffff";
            break;
            
        case "Nueva Canarias":
            col="#c0fac2";
            break;
        case "CC-PNC":
            col="#09bad9";
            break; 
            
            case "UPL":
            col="#a30559";
            break; 
    }
    return col;
}
function res(ds){
    var re=1;
    return ds;
}
  function newEleccion()
  {
    console.log("cambio");
    dataset=[];
    var inputs = document.getElementsByTagName("input");
    var sum=0;
    re = document.getElementById("RESTO");
    for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.type === "number") {
                    var label = input.id;
                    if(label!="RESTO"){

                    var votos = parseFloat(input.value);
                    sum+=votos;
                    dataset.push({ "label": label, "votos": votos });
                    }
                }
            }
            var calc=100-sum;
                        
            re.value=calc.toFixed(3);

            var votos = parseFloat(re.value);
            console.log(votos);
            dataset.push({ "label": "RESTO", "votos": votos });
    dataset=res(dataset);        
    console.log(dataset);
    tablarelleno(dataset);
    redraw(dataset,svg);
  }
  
  function start(){

    var w = 300;
    var h = 300;
    var dataset = [];
    var divMod=document.getElementById("modificadores");
    re = document.getElementById("RESTO");
    if(idPro){

    
    var resultados=idPro;
    for (var partido in resultados.votos) {
        if (resultados.votos.hasOwnProperty(partido)) {
            if(resultados.votos[partido]>0.5){
                console.log(partido + ": " + resultados.votos[partido]);
                var input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.max = "100";
                input.step = "0.25";
                input.id = partido;
                input.value = resultados.votos[partido];
                input.addEventListener("change",newEleccion);
                input.classList.add("form-control");
                var label = document.createElement("label");
                label.appendChild(document.createTextNode(partido));
                label.appendChild(input);
            
                divMod.appendChild(label);
      
                var votoX = parseFloat(input.value);
                dataset.push({ "label": partido, "votos": votoX });
            }

        }
      }
    }
      /*
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                input.addEventListener("change",newEleccion);
                if (input.type === "number") {
                    var label = input.id;
                    if(idPro){
                        console.log("votos PP:");
                        console.log(idPro.votos.PP);
                        if(label=="PP"){
                            input.value=idPro.votos.PP;
                        }
                    }
                    var votos = parseFloat(input.value);
                    dataset.push({ "label": label, "votos": votos });
                }
            }
            */
                  
                  //Conjunto de datos
  //Definimos un "pie layout" por defecto. Esto nos crea un array de objetos con
  //elementos que contienen: data,index, startAngle, endAngle y value
    pie = d3.pie()
      .value(function(d) { return d.votos; })
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .padAngle(0.00);;
  //Ahora dibujaremos objetos tipo "path" con SVG.
   outerRadius = w / 2;
   innerRadius = w/4;
   arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);
  //Creamos un esquema de colores
  //Creamos el elemento SVG
  svg = d3.select("#Hemi")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

  draw(dataset,svg);
  tablarelleno(dataset);
}
  function draw(ds,svg){
        //Creamos en svg un grupo "g"
        var arcs = svg.selectAll("g.arc")
        .data(pie(ds))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," +
        outerRadius + ")");
        //Dibujamos paths con la lista de puntos generada previamente en "arc" y los colores del array
        arcs.append("path")
        .attr("fill", function(d, i) {
        return pickColor(d.data.label);
        })
        .attr("d", arc);
        //Añadimos etiquetas de texto en la posición central del path
        arcs.append("text")
        .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d,i) {
        return d.data.label;
        });
  }
    function redraw(ds,svg){
                    // Guarda una referencia al grupo "g" en una variable
            var arcsGroup = svg.selectAll("g.arc").data(pie(ds));
            arcsGroup.remove();
            draw(ds,svg);
  }
  function Escanos(nam){
    switch(nam){
  
  case "Madrid":
      setNE(37);
      break;
  case "Barcelona":
    setNE(32);
    break;          
  case "Valencia":
      setNE(16);
      break;
  case "Alicante":
  case "Sevilla":
      setNE(12);
      break;
  case "Málaga":
    setNE(11);
    break;
  case "Murcia":
    setNE(10);
    break;
    case "Cádiz":
    setNE(9);
    break;
  
  case "Illes Balears":
  case "A Coruña":
  case "Las Palmas":
  case "Bizkaia":
      setNE(8);
    break;
    
  case "Asturias":
  case "Granada":
  case "Pontevedra":
  case "Santa Cruz de Tenerife":
  case "Zaragoza":
      setNE(7);
    break;
    
  case "Almería":
  case "Córdoba":
  case "Girona":
  case "Gipuzkoa":
  case "Tarragona":
  case "Toledo":
      setNE(6);
    break;
  
  case "Badajoz":
  case "Cantabria":
  case "Castellón":
  case "Ciudad Real":
  case "Huelva":
  case "Jaén":
  case "Navarra":
  case "Valladolid":
      setNE(5);
      break; 
  case "Álava":
  case "Albacete":
  case "Burgos":
  case "Cáceres":
  case "León":
  case "Lleida":
  case "Lugo":
  case "Ourense":
  case "La Rioja":
  case "Salamanca":
      setNE(4);
      break;
          
  case "Ávila":
  case "Cuenca":
  case "Guadalajara":
  case "Huesca":
  case "Palencia":
  case "Segovia":
  case "Teruel":
  case "Zamora":
      setNE(3);
      break;
  case "Soria":
      setNE(2);
      break;
  case "Ceuta":
  case "Melilla":
  setNE(1);
  break;        
  }
  }
  