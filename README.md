# Registrapp
La aplicación Registrapp fue creada para la asignatura Programacion de Aplicaciones Mobile del DuocUC.

Fue escrita en typescript usando el framework Ionic con Angular.

Su función es para registrar asistencia de alumnos, se puede ingresar al sistema como alumno o como profesor, para registrar una asistencia o para desplegar la lista de alumnos con su estado de asistencia.

En este caso no fue implementada una base de datos, las peticiones HTTP realizan cambios de datos en duro.
 

A continuación se presentarán las pantallas de la aplicación con una breve descripción:

Pantalla principal:

Esta pantalla contiene un login que funciona con el servicio de autenticación authentication guard, se puede ingresar como alumno o como profesor.


<img src="images/pantalla-principal.png" height="600">

Pantalla de profesor:

Esta pantalla contiene listados de alumnos, en este caso se uso el mismo JSON para todos los listados, los valores de la lista se obtienen mediante una petición GET.
Además contiene un generador de código QR para que los alumnos lo escaneen desde sus celulares para registrar su asistencia.


<img src="images/pantalla-profesor.png" height="600">

Pantalla alumno:

Esta pantalla contiene los datos del alumno que ingresó y la función para registrar la asistencia utilizando la cámara para leer un código qr.


<img src="images/panta-alumno-asistencia.jpg" height="600">

Mensaje desplegado una vez que se lee el código QR.

<img src="images/pantalla-alumno-registrando.jpg" height="600">

Estado actualizado.

<img src="images/pantalla-alumno.jpg" height="600">


Pantalla de profesor PC:

La idea es desplegar el código QR en un proyector para que los alumnos lo lean usando sus celulares, es por eso que se muestra la patalla del PC.

Código QR.

<img src="images/codigo%20qr.png" height="600">

Listado actualizado desde la pantalla del PC, Jack registró su asistencia utilizando la cámara del celular.
<img src="images/listado%20actualizado.png" height="600">
