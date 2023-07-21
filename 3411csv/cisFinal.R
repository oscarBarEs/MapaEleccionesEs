library(jsonlite)
library(dplyr)
library(tidyr)

# Leer el archivo CSV
datos <- read.csv2("Elecciones/3411csv/3411_etiq.csv")

# Crear una lista para almacenar los data frames por provincia
lista_resultados <- list()

# Obtener la lista de provincias únicas
provincias <- unique(datos$`PROV.Provincia`)

# Iterar sobre cada provincia y crear el data frame correspondiente
for (provincia in provincias) {
  # Filtrar los datos para la provincia actual
  datos_provincia <- datos %>% filter(`PROV.Provincia` == provincia)
  # Partidos a excluir
  partidos_excluir <- c("No sabe todavía", "Voto nulo","N.C.","No votaría")
  # Obtener la lista de partidos únicos y su número de votos
  partidos <- unique(datos_provincia$`INTENCIONG.Intención.de.voto.en.las.elecciones.generales.de.2023`)
  partidos <- setdiff(partidos, partidos_excluir)
  mas_votos<-0
  mas_votado<-0
# Filtrar los datos excluyendo los partidos
datos_provincia_filtrados <- datos_provincia %>% 
  filter(!`INTENCIONG.Intención.de.voto.en.las.elecciones.generales.de.2023` %in% partidos_excluir)
    # Fusionar partidos bajo una etiqueta
  numerovotos <- nrow(datos_provincia_filtrados)
  lista_partidos <- list()
  
  for (partido in partidos) {
    datos_partido <- datos_provincia %>% filter(`INTENCIONG.Intención.de.voto.en.las.elecciones.generales.de.2023` == partido)
    
    if (nrow(datos_partido) > 0) {
      # Obtener el número de votos del partido en la provincia
      numerovotos_partido <- nrow(datos_partido)
      if(numerovotos_partido>mas_votos)
      {
        mas_votos<-numerovotos_partido
        mas_votado<-partido
      }
      # Agregar el partido y su número de votos a la lista de partidos
      lista_partidos[[partido]] <- numerovotos_partido/numerovotos * 100
    }
  }
  
  # Agregar la lista de partidos y votos a la lista de resultados
  lista_resultados[[provincia]] <- list(name = provincia, votos = lista_partidos,win=mas_votado)
}

# Convertir la lista de resultados a formato JSON
json_data <- toJSON(lista_resultados, pretty = TRUE, auto_unbox = TRUE)

# Guardar el JSON en un archivo
write(json_data, file = "Elecciones/FIN3_CIS_DATOSBRUTOS.json")

# Verificar los resultados
#print(json_data)
