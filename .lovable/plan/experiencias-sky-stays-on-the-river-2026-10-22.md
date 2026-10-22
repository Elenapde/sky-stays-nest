# EXPERIENCIAS · Sky Stays On The River

## Integración propuesta
- Agregar **EXPERIENCIAS** en el menú principal, entre **Corporate & Long Stay** y **Guía de Asunción**, con un único acceso: **Sky Stays On The River**. Mantener el mismo acceso en el menú del celular y el pie de página.
- El acceso abrirá directamente la página de la experiencia, sin crear una página intermedia con el mismo contenido.
- En la Home, colocar el bloque del yate después de **Day Use**: una fotografía grande del yate real, “El río, ahora parte de tus planes.”, una descripción breve y **DESCUBRIR LA EXPERIENCIA**.
- Conservar la sección actual de piscinas, coworking y otros servicios de los edificios: no mezclarla con los paseos ni repetirla en EXPERIENCIAS.

## Página de la experiencia
- Mostrar **SKY STAYS ON THE RIVER** claramente desde la primera pantalla, junto al título y descripción del brief.
- Video silencioso del yate, adaptado para web, con fotografía de respaldo cuando no se reproduzca y opción de pausar.
- Tres datos destacados: duración según modalidad, capacidad de **4 a 6 personas para Business Sunset** y servicios incluidos según modalidad. No asignar esa capacidad a Private Moments sin confirmación.
- Sección editorial con las fotografías recibidas, paisajes, privacidad y momentos compartidos; sin imágenes de otras embarcaciones.
- Dos tarjetas: **SKY BUSINESS SUNSET** y **SKY PRIVATE MOMENTS**, con los precios, horarios, duración y servicios del brief.
- **CONSULTAR DISPONIBILIDAD** en cada modalidad abrirá WhatsApp al número actual del sitio, identificando la modalidad elegida. No se consultará Guesty.

## Administración y validación comercial
- Crear un espacio de edición para miembros autorizados del equipo que ya ingresan a Lovable, sin otro formulario de registro o inicio de sesión.
- Permitir editar fotos, video, descripciones, modalidades, precios, duración, horarios, capacidad, servicios y disponibilidad comercial.
- Separar **activo/inactivo** de **validado comercialmente**. Los datos iniciales estarán pendientes de validación; no se mostrarán precios o condiciones no validados a visitantes del sitio publicado.
- Permitir revisar el contenido pendiente dentro de la administración antes de activarlo. Un estado inactivo ocultará la experiencia de la Home y del menú público.
- La disponibilidad comercial será un estado editable, no un calendario de disponibilidad en tiempo real.

## Detalles técnicos
- Página pública `/experiencias/sky-stays-on-the-river`, con título, descripción, H1 único y H2 por sección; agregarla al sitemap cuando esté activa.
- Componentes separados para el bloque de Home, la página editorial y la administración; conservar los estilos y controles del sitio.
- Guardar contenido editable en Lovable Cloud con permisos de lectura pública solo para contenido activo y validado; edición y lectura de borradores solo para miembros autorizados.
- Reutilizar identidad de Lovable y verificar permisos en el servidor; no conceder edición a cualquier persona por tener una cuenta de Lovable.
- Optimizar las fotos y el video recibidos, conservar proporciones, cargar las fotos secundarias al acercarse a ellas y alojar los medios mediante los recursos del proyecto.
- Mantener Google Tag Manager, traducción, buscador de alojamientos y navegación actuales sin cambios de funcionamiento.

## Comprobaciones
- Revisar la página y el menú en computadora y celular, reproducción y respaldo del video, fotos, títulos y ausencia de desbordamientos.
- Probar ambos enlaces de WhatsApp y sus mensajes.
- Probar guardar y recuperar cambios con un integrante autorizado; comprobar que un visitante no pueda editar ni leer borradores.
- Añadir pruebas de precios, duración, capacidad de Business Sunset y reglas de publicación/activación.
- No publicar el sitio ni validar comercialmente las modalidades sin autorización.