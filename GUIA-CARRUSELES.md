# Guia rapida: cambiar imagenes de carruseles (Hostinger)

Este sitio ya esta preparado para que no tengas que tocar el codigo principal.

## 1) Donde estan las imagenes y videos

Los archivos de carruseles estan en:

- `img/carouseles/maquina/`
- `img/carouseles/patronaje/`
- `img/carouseles/especializaciones/`
- `img/carouseles/diseno/`

Cada curso tiene subcarpetas:

- `fade` (carrusel corto de la seccion "Que aprenderas")
- `galeria` (carrusel grande con flechas)

En Patronaje tambien hay:

- `punto`
- `plana`

## 2) Como agregar una imagen o video nuevo

1. En Hostinger > Administrador de archivos, entra a la carpeta del carrusel.
2. Sube el archivo con nombre ordenado (ejemplo: `06.jpg`, `07.jpg`, `video_diseno.webm`).
3. Edita `js/carousels-config.js`.
4. Busca la clave del carrusel (por ejemplo `"diseno-gallery"`).
5. Agrega una linea igual a las otras:

```js
{ type: "video", src: "img/carouseles/diseno/galeria/video_diseno.webm", poster: "img/carouseles/diseno/galeria/01.jpeg", alt: "Video del proceso de diseño de modas" }

// o una imagen normal
{ src: "img/carouseles/diseno/galeria/06.jpg", alt: "Texto corto de la imagen" }
```

6. Guarda y recarga la web.

## 3) Como reemplazar una imagen

1. Sube la imagen nueva con el mismo nombre (ejemplo: `03.jpg`) para reemplazo directo.
2. Si cambiaste nombre o extension, actualiza ese `src` en `js/carousels-config.js`.
3. Si reemplazas un video, conserva el formato y actualiza `poster` si cambia la portada.

## 4) Claves de cada carrusel

- `maquina-fade`
- `maquina-gallery`
- `patronaje-fade`
- `patronaje-punto`
- `patronaje-plana`
- `patronaje-gallery`
- `especializaciones-fade`
- `especializaciones-gallery`
- `diseno-fade`
- `diseno-gallery`

## 5) Reglas para evitar errores

- Usa nombres simples y ordenados: `01.jpg`, `02.jpg`, `03.jpg`.
- Respeta mayusculas/minusculas y extension exacta (`.jpg`, `.jpeg`, `.png`).
- No borres comas ni llaves en `js/carousels-config.js`.
- Si una imagen no se ve, revisa que la ruta del `src` sea igual al archivo real.
