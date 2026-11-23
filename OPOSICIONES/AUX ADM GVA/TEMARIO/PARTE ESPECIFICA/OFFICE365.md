
# Excel 365 de escritorio

## Formatos de archivo y gestión del libro

### Formatos de archivo de Excel

Excel admite una amplia variedad de formatos de archivo para guardar, exportar e intercambiar datos. Al guardar en un formato distinto al predeterminado, algunas características, fórmulas o formatos pueden perderse.

#### Formatos nativos de Excel

| Extensión | Nombre | Descripción y usos |
| --- | --- | --- |
| .xlsx | Libro de Excel | Formato predeterminado desde Excel 2007. Basado en XML, sin soporte de macros VBA. Es el más compatible e interoperable. |
| .xlsm | Libro de Excel habilitado para macros | Igual que .xlsx pero permite almacenar y ejecutar macros VBA y hojas de macro de Excel 4.0. Obligatorio cuando el libro contiene macros. |
| .xlsb | Libro binario de Excel | Formato binario (BIFF12). Ocupa menos espacio y abre más rápido que .xlsx en libros muy grandes. Recomendado para archivos con gran volumen de datos. |
| .xltx | Plantilla de Excel | Plantilla sin macros. Al abrirla, Excel crea un nuevo libro basado en ese diseño sin modificar la plantilla original. |
| .xltm | Plantilla de Excel habilitada para macros | Plantilla que admite código VBA. Útil para automatizar flujos de trabajo repetitivos. |
| .xls | Libro de Excel 97-2003 | Formato binario legacy (BIFF8). Usado por versiones antiguas. Abierto en modo de compatibilidad en versiones modernas. |
| .xlt | Plantilla de Excel 97-2003 | Plantilla del formato binario legacy. |
| .xlam | Complemento de Excel | Complemento habilitado para macros y basado en XML. Agrega comandos o funciones personalizadas a Excel. |
| .xla | Complemento de Excel 97-2003 | Versión legacy del complemento; admite proyectos VBA. |
| .xlw | Libro de Excel 4.0 | Formato de Excel 4.0 que guarda solo hojas de cálculo, de gráficos y de macros. Se puede abrir, pero no se puede guardar en este formato. |

#### Formatos de texto e intercambio de datos

| Extensión | Nombre | Descripción y usos |
| --- | --- | --- |
| .csv | Texto separado por comas | Guarda solo la hoja activa como texto plano con comas como delimitador. Sin formato, fórmulas ni hojas múltiples. Universal para importar/exportar datos. |
| .txt | Texto delimitado por tabulaciones | Cada celda separada por un tabulador. Variantes: texto de Windows, texto de MS-DOS, texto Unicode. |
| .prn | Texto con formato (delimitado por espacios) | Formato delimitado por espacios de Lotus; guarda solo la hoja activa. |
| .dif | DIF (Data Interchange Format) | Formato de intercambio de datos; solo hoja activa. |
| .slk | SYLK (Symbolic Link) | Formato de intercambio entre aplicaciones; solo hoja activa. |

#### Formatos de publicación y web

| Extensión | Nombre | Descripción y usos |
| --- | --- | --- |
| .pdf | PDF (Portable Document Format) | Exportación para lectura e impresión. Conserva el formato visual. No editable en Excel. |
| .xps | XPS (XML Paper Specification) | Similar al PDF, basado en XML. Conserva el formato para distribución. |
| .htm / .html | Página web | Exporta el libro como HTML para publicación web. Puede perder funcionalidades avanzadas. |
| .mht / .mhtml | Página web de un solo archivo | Incluye gráficos y elementos vinculados en un único archivo. |

#### Otros formatos compatibles

| Extensión | Nombre | Descripción |
| --- | --- | --- |
| .ods | Hoja de cálculo OpenDocument | Formato abierto compatible con LibreOffice, OpenOffice y Google Sheets. |
| .xml | Hoja de cálculo XML 2003 | Formato XML para interoperabilidad con otros sistemas. |
Nota: Varios formatos antiguos de terceros (Lotus 1-2-3 .wk1-.wk4, Microsoft Works .wks, Quattro Pro .wq1, .wb1 y .wb3, dBase II .dbf) ya no se pueden abrir ni guardar en versiones actuales de Excel. Los archivos dBase III y IV (.dbf) sí se pueden abrir, pero no se puede guardar un libro en formato dBase.

Formatos no importables en Excel: archivos de imagen (.jpg, .png, .gif, .bmp), vídeo (.mp4, .mov, .avi), audio (.mp3, .wav) y ejecutables (.exe) no pueden abrirse como hojas de cálculo. Un archivo .mov, por ejemplo, no es un formato válido para importar datos en Excel.

### Vista Backstage (pestaña Archivo)

La pestaña Archivo abre la vista Backstage, que gestiona el archivo en su conjunto (no el contenido de las celdas). Para volver a la hoja: tecla Esc o botón ← Atrás.

#### Opciones principales de la vista Backstage

| Sección | Descripción |
| --- | --- |
| Inicio | Acceso rápido a libros recientes y plantillas |
| Nuevo | Crear un libro en blanco o desde una plantilla |
| Abrir | Abrir libros guardados localmente, en OneDrive o en otras ubicaciones |
| Información | Propiedades del libro, protección, inspeccionar documento, versiones anteriores y modo de compatibilidad |
| Guardar | Guarda con el nombre y formato actuales |
| Guardar como | Guarda con nombre, ubicación o formato distintos |
| Historial de versiones | Consulta y restaura versiones anteriores (requiere OneDrive/SharePoint) |
| Imprimir | Configuración de impresión y vista previa |
| Compartir | Invitar colaboradores, enviar por correo, publicar |
| Exportar | Crear PDF/XPS o cambiar el tipo de archivo |
| Publicar | Opciones de publicación en Power BI u otros servicios |
| Cerrar | Cerrar el libro actual |
| Cuenta | Información de cuenta de Microsoft y opciones de Office |
| Opciones | Configuración completa de Excel (cálculo, idioma, Autorrecuperación, etc.) |

### Guardar y abrir libros

#### Atajos de teclado para operaciones con archivos

| Atajo | Acción |
| --- | --- |
| Ctrl+G | Guardar (con el nombre y formato actuales) |
| F12 | Guardar como (abre el cuadro de diálogo con selector de formato) |
| Ctrl+A | Abrir libro existente |
| Ctrl+U | Nuevo libro en blanco |
| Ctrl+F4 | Cerrar el libro activo |
| Ctrl+W | Cerrar el libro activo (equivalente a Ctrl+F4) |

#### Guardar o Guardar como

| Acción | Cuándo usar |
| --- | --- |
| Guardar (Ctrl+G) | El libro ya tiene nombre y formato. Sobreescribe el archivo existente con los cambios actuales sin abrir ningún cuadro de diálogo. |
| Guardar como (F12) | Se desea cambiar el nombre, la ubicación o el formato del archivo. Siempre permite elegir una nueva ruta, nombre o tipo antes de guardar. |

#### Guardar como: procedimiento

Archivo > Guardar como (o F12).

Seleccionar la ubicación (OneDrive, equipo local, etc.).

En el cuadro de diálogo, elegir la carpeta de destino.

En Tipo, seleccionar el formato deseado en el menú desplegable.

Escribir o confirmar el nombre del archivo.

Pulsar Guardar.

Al guardar en formato de texto (.csv, .txt, etc.) se pierde todo el formato, las fórmulas y las hojas adicionales. Excel muestra una advertencia antes de continuar.

#### Cambiar el formato de archivo predeterminado

Por defecto Excel guarda en .xlsx. Para cambiar este comportamiento de forma global: Archivo > Opciones > Guardar y en el desplegable Guardar archivos en este formato seleccionar el formato deseado (por ejemplo, .xls para compatibilidad con versiones antiguas, o .ods para interoperabilidad con LibreOffice).

#### Convertir archivos antiguos al formato actual

Para actualizar un .xls (Excel 97-2003) sin hacer "Guardar como": Archivo > Información > Convertir. Esto actualiza el archivo a .xlsx y desactiva el modo de compatibilidad.

#### Modo de compatibilidad

Cuando se abre un archivo .xls (formato antiguo), Excel muestra [Modo de compatibilidad] en la barra de título. En este modo algunas funciones modernas están deshabilitadas para preservar la compatibilidad con versiones anteriores.

Para salir del modo de compatibilidad: Archivo > Información > Convertir (convierte el archivo a .xlsx) o guardar con Guardar como eligiendo el formato .xlsx.

#### Comprobador de compatibilidad

Antes de guardar un libro en formato .xls (Excel 97-2003), es recomendable ejecutar el Comprobador de compatibilidad para identificar qué características o funciones de la versión actual no son compatibles con versiones anteriores.

Acceso: Archivo > Información > Comprobar si hay problemas > Comprobar compatibilidad.

El comprobador genera un informe con dos categorías:

| Categoría | Descripción |
| --- | --- |
| Pérdida significativa de funcionalidad | Elementos que no funcionarán en la versión anterior (por ejemplo, tablas con más de 65.536 filas o funciones nuevas de Excel). |
| Pérdida menor de fidelidad | Elementos que pueden aparecer ligeramente diferentes: formatos condicionales adicionales, efectos gráficos, fuentes no disponibles, etc. |

### Propiedades del libro

Las propiedades del libro (también llamadas metadatos) son información descriptiva sobre el archivo que facilita su búsqueda y organización.

Acceso: Archivo > Información y a la derecha aparece el panel Propiedades.

| Propiedad | Descripción |
| --- | --- |
| Título | Nombre descriptivo del documento (distinto del nombre del archivo en disco) |
| Etiquetas | Palabras clave para facilitar la búsqueda del archivo en el sistema operativo |
| Asunto | Categoría o tema del documento |
| Autor | Persona que creó el documento (se toma del nombre de la cuenta de Microsoft al crear el archivo) |
| Última modificación | Fecha y usuario de la última edición (se actualiza automáticamente) |
| Comentarios | Notas adicionales sobre el contenido del archivo |
Para ver todas las propiedades: en el panel de Información, clic en Mostrar todas las propiedades.

Para editar el nombre de autor usado en nuevos documentos: Archivo > Opciones > General y modificar el campo Nombre de usuario.

### Inspector de documentos

El Inspector de documentos busca y elimina datos ocultos e información personal del libro antes de compartirlo.

Acceso: Archivo > Información > Comprobar si hay problemas > Inspeccionar documento.

Puede detectar y eliminar:

Comentarios y anotaciones

Propiedades del documento e información personal (autor, empresa)

Datos en filas, columnas y hojas ocultas

Contenido invisible (objetos con visibilidad desactivada)

Datos XML personalizados

Se recomienda trabajar sobre una copia del libro, ya que algunos datos eliminados por el Inspector no pueden restaurarse.

### Exportar a PDF

Excel permite exportar el libro (o parte de él) a PDF de forma nativa, sin software adicional.

Acceso principal: Archivo > Exportar > Crear documento PDF/XPS > clic en Crear PDF/XPS.

Acceso alternativo: Archivo > Guardar como y seleccionar el tipo PDF (*.pdf).

#### Opciones de exportación

| Opción | Descripción |
| --- | --- |
| Libro completo | Exporta todas las hojas del libro en un único archivo PDF |
| Hoja activa | Exporta únicamente la hoja seleccionada en ese momento |
| Selección | Exporta solo el rango de celdas que estaba seleccionado antes de abrir el cuadro de diálogo |
| Tabla | Exporta solo la tabla de Excel activa (si el cursor está dentro de una tabla estructurada) |

#### Calidad del archivo

| Opción | Uso recomendado |
| --- | --- |
| Estándar (publicación en línea e impresión) | Calidad óptima; recomendado para imprimir o visualizar en pantalla con alta fidelidad |
| Tamaño mínimo (publicación en línea) | Reduce el tamaño del archivo; puede disminuir ligeramente la calidad visual |
El PDF generado conserva el formato visual exacto del libro pero no es editable en Excel. Para volver a editar hay que recurrir al archivo .xlsx original.

### Hipervínculos en Excel

Un hipervínculo es un enlace en una celda que, al hacer clic, lleva al usuario a otra ubicación: una página web, un archivo, una celda del mismo libro o un cliente de correo electrónico.

#### Insertar un hipervínculo

Acceso: Insertar > Vínculos > Insertar vínculo (o atajo Ctrl+K).

El cuadro de diálogo Insertar hipervínculo presenta en su panel izquierdo la sección Vincular a:, con cuatro opciones válidas:

| Opción "Vincular a:" | Descripción |
| --- | --- |
| Archivo o página web existente | Enlaza a un sitio web (URL) o a un archivo guardado localmente o en red |
| Lugar de este documento | Enlaza a una celda o rango con nombre dentro del mismo libro (se indica la hoja y la referencia de celda, por ejemplo A1) |
| Crear nuevo documento | Crea un archivo nuevo en el momento de insertar el vínculo y enlaza a él |
| Dirección de correo electrónico | Abre el cliente de correo predeterminado con un destinatario y asunto prellenados al hacer clic |
"Vincular a Fórmula" no existe como opción en el cuadro de diálogo de hipervínculos. Las cuatro opciones válidas son exclusivamente las indicadas en la tabla anterior.

#### Editar o eliminar un hipervínculo

Editar: clic derecho sobre la celda > Editar vínculo, que abre el cuadro de diálogo Editar hipervínculo (o Ctrl+Alt+K con la celda seleccionada).

Eliminar: clic derecho sobre la celda > Quitar vínculo. Elimina el enlace pero conserva el texto de la celda.

### Gestión de hojas de cálculo

Cada libro puede contener múltiples hojas de cálculo (pestañas en la parte inferior). Las operaciones sobre hojas se acceden haciendo clic derecho sobre la pestaña de la hoja.

#### Operaciones sobre hojas

| Operación | Acceso principal | Atajo / método alternativo |
| --- | --- | --- |
| Insertar hoja | Clic en el botón + junto a las pestañas | Menú contextual > Insertar > Hoja |
| Eliminar hoja | Clic derecho sobre pestaña > Eliminar | — |
| Cambiar nombre | Doble clic sobre la pestaña | Clic derecho > Cambiar nombre |
| Mover o copiar | Clic derecho > Mover o copiar | Arrastrar la pestaña a la nueva posición |
| Color de pestaña | Clic derecho > Color de pestaña | Seleccionar color del selector |
| Ocultar hoja | Clic derecho > Ocultar | — |
| Mostrar hoja oculta | Clic derecho sobre cualquier pestaña > Mostrar | Seleccionar la hoja a mostrar en el cuadro de diálogo |
| Proteger hoja | Revisar > Proteger hoja | Establece contraseña y permisos de edición |

#### Restricciones en los nombres de hojas

Los nombres de hojas tienen las siguientes limitaciones:

No pueden estar en blanco.

Longitud máxima: 31 caracteres.

Caracteres no permitidos: / \ ? * : [ ]

Ejemplo válido: 17-02-2026 | Ejemplo inválido: 17/02/2026

No pueden empezar ni terminar con apóstrofo ('), aunque puede aparecer en el interior del nombre.

El nombre Historial está reservado por Excel y no puede usarse.

#### Mover y copiar hojas

Mover: arrastrar la pestaña al lugar deseado (incluso a otro libro abierto).

Copiar: arrastrar con Ctrl pulsado, o usar clic derecho > Mover o copiar y activar la casilla Crear una copia.

Es posible mover o copiar hojas entre libros distintos desde el cuadro de diálogo "Mover o copiar", seleccionando el libro de destino en el desplegable "Al libro".

#### Color de la pestaña

El color de la pestaña ayuda a organizar visualmente las hojas. Se asigna desde clic derecho sobre la pestaña > Color de pestaña y se elige en el selector de colores. La pestaña de la hoja activa muestra el color atenuado; el color completo es visible en las pestañas inactivas.

### Proteger libro y hojas

Excel ofrece dos niveles de protección distintos e independientes:

#### Proteger una hoja

Impide que otros usuarios modifiquen el contenido de una hoja concreta. Se puede permitir o restringir acciones específicas (seleccionar celdas, insertar filas, ordenar, usar filtros, etc.).

Acceso: Revisar > Proteger hoja (o clic derecho sobre la pestaña > Proteger hoja).

Se puede definir una contraseña opcional para desproteger.

La protección se aplica solo a la hoja activa.

Para desproteger: Revisar > Desproteger hoja e introducir la contraseña si se estableció una.

#### Proteger la estructura del libro

Impide que otros usuarios modifiquen la estructura del libro: agregar, eliminar, mover, ocultar u mostrar hojas, o cambiar el nombre de las hojas.

Acceso: Revisar > Proteger libro.

No impide editar el contenido de las celdas (eso lo hace "Proteger hoja").

Se puede definir una contraseña para desproteger la estructura.

#### Cifrar con contraseña

Para requerir una contraseña al abrir el archivo: Archivo > Información > Proteger libro > Cifrar con contraseña. Esta protección es independiente de la protección de hoja o de estructura del libro.

### Macros

Una macro es una secuencia de comandos almacenados en código VBA (Visual Basic for Applications) que automatiza tareas repetitivas. Las macros se ejecutan cuando el usuario las llama, ya sea desde un atajo de teclado, un botón o el cuadro de diálogo de macros.

#### Crear una macro con la grabadora

Activar la pestaña Programador si no está visible: Archivo > Opciones > Personalizar cinta de opciones > activar Programador.

Pulsar Programador > Grabar macro (o Alt+F8 para abrir el cuadro de macros).

Asignar un nombre (debe empezar por letra; usar guiones bajos en lugar de espacios).

Opcionalmente asignar un atajo de teclado (precaución: puede sobrescribir atajos de Excel existentes como Ctrl+Z).

Elegir la ubicación de almacenamiento:

Este libro — la macro solo está disponible en el libro actual.

Libro de macros personal — crea o actualiza el archivo oculto Personal.xlsb, disponible en todas las sesiones de Excel.

Libro nuevo — almacena la macro en un libro nuevo.

Añadir una descripción opcional.

Realizar las acciones a grabar.

Pulsar Detener grabación en la pestaña Programador.

La grabadora registra todos los pasos, incluidos los errores. Se recomienda practicar la secuencia antes de grabar.

#### Atajos de teclado para macros

| Atajo | Acción |
| --- | --- |
| Alt+F8 | Abrir el cuadro de diálogo de macros (ejecutar, editar, eliminar) |
| Alt+F11 | Abrir el Editor de Visual Basic (VBA) |

#### Seguridad de macros

Las macros no se pueden deshacer con Ctrl+Z. Para proteger el sistema:

Los libros con macros deben guardarse en formato .xlsm (o .xlsb/.xltm). Un libro .xlsx no puede contener macros VBA activas.

Excel dispone de niveles de seguridad de macros configurables en Archivo > Opciones > Centro de confianza > Configuración del Centro de confianza > Configuración de macros:

Deshabilitar macros de VBA sin notificación

Deshabilitar macros de VBA con notificación (predeterminado recomendado)

Deshabilitar macros de VBA excepto las macros firmadas digitalmente

Habilitar macros de VBA (no recomendado)

### Vínculos externos (referencias externas)

Un vínculo externo (también llamado referencia externa) es una fórmula en un libro que hace referencia a celdas, rangos con nombre o tablas de otro libro diferente. La sintaxis incluye el nombre del libro fuente entre corchetes (si el libro fuente está cerrado, delante va también su ruta y el conjunto ruta + libro + hoja va entre comillas simples, por ejemplo ='C:\Informes\[Libro1.xlsx]Hoja1'!$A$1):

=[Libro1.xlsx]Hoja1!$A$1

#### Tipos de vínculos externos

Vínculos en fórmulas de celda: referencias directas a celdas de otro libro.

Vínculos en nombres definidos: rangos con nombre que apuntan a otro libro.

Vínculos en gráficos: series de datos procedentes de otro libro.

Vínculos en tablas dinámicas: origen de datos en otro archivo.

#### Gestionar vínculos

Acceso: Datos > Consultas y conexiones > Vínculos de libro (panel que sustituye al comando heredado Editar vínculos; este solo puede recuperarse añadiéndolo a un grupo personalizado de la cinta o a la barra de herramientas de acceso rápido).

Opciones del cuadro de diálogo:

| Opción | Efecto |
| --- | --- |
| Actualizar valores | Actualiza los datos del vínculo seleccionado con el valor actual del libro fuente |
| Cambiar origen | Redirige el vínculo a otro libro de origen |
| Abrir origen | Abre el libro fuente |
| Romper vínculo | Convierte todas las fórmulas vinculadas al libro fuente en sus valores actuales (constantes estáticas). Esta acción es irreversible sin deshacer. |
| Comprobar estado | Verifica si el origen está accesible y actualizado |
| Pregunta de inicio | Controla si Excel pregunta al abrir si se deben actualizar los vínculos automáticamente |
Al romper un vínculo, todas las fórmulas que lo usan se reemplazan por su valor calculado en el momento de romperlo. Si el libro fuente no está disponible, se usa el último valor conocido.

#### Advertencia al abrir libros con vínculos

Al abrir un libro con vínculos externos a libros cerrados, Excel muestra una barra de seguridad con el botón Habilitar contenido o pregunta si se desean actualizar los vínculos. Esto permite controlar si los datos se actualizan desde los archivos fuente.

### Autorrecuperación y Autoguardado

#### Autorrecuperación

La Autorrecuperación guarda automáticamente una copia temporal del libro a intervalos regulares. Si Excel se cierra inesperadamente, al volver a abrirlo aparece el Panel de recuperación de documentos con los archivos que se pueden restaurar.

Configuración: Archivo > Opciones > Guardar

| Parámetro | Descripción |
| --- | --- |
| Guardar información de Autorrecuperación cada X minutos | Intervalo de guardado automático (predeterminado: 10 minutos) |
| Mantener la última versión autoguardada si cierro sin guardar | Conserva el archivo temporal al cerrar sin guardar |
| Ubicación del archivo de Autorrecuperación | Carpeta donde se guardan los archivos temporales |
Los archivos de Autorrecuperación son temporales. Si el libro se cierra correctamente (con "Guardar" o "No guardar" deliberado), los archivos temporales se eliminan. Solo se conservan ante un cierre inesperado.

Recuperar un archivo no guardado: Archivo > Información > Administrar libro > Recuperar libros no guardados.

#### Autoguardado

El Autoguardar es una función distinta de la Autorrecuperación, disponible para libros almacenados en OneDrive o SharePoint. Guarda los cambios de forma continua y casi instantánea, habilitando la coautoría en tiempo real. Se activa con el interruptor Autoguardar en la esquina superior izquierda de la ventana.

| Característica | Autorrecuperación | Autoguardar |
| --- | --- | --- |
| Destino | Carpeta local temporal | OneDrive / SharePoint |
| Intervalo | Configurable (min. 1 min) | Continuo (segundos) |
| Requiere OneDrive | No | Sí |
| Historial de versiones | No | Sí |
| Coautoría | No | Sí |

### Compartir libros y coautoría

#### Compartir desde OneDrive

Cuando un libro está guardado en OneDrive o SharePoint, se puede compartir directamente desde Excel:

Archivo > Compartir (o botón Compartir en la esquina superior derecha).

Escribir la dirección de correo del colaborador.

Elegir el nivel de acceso: Puede editar o Puede ver.

Opcionalmente añadir un mensaje y pulsar Enviar.

Los colaboradores reciben un enlace y pueden abrir el libro en Excel o en Excel para la Web.

#### Coautoría en tiempo real

La coautoría permite que varias personas editen el mismo libro simultáneamente. Requiere:

El libro guardado en OneDrive o SharePoint.

El Autoguardar activado.

Las celdas que otros usuarios están editando se resaltan con un color asociado a cada colaborador. Los cambios son visibles en tiempo real para todos los participantes.

#### Historial de versiones

Con Autoguardar activo, Excel guarda versiones automáticamente en la nube. Para consultar o restaurar una versión anterior: Archivo > Historial de versiones. Cada versión muestra fecha, hora y autor de los cambios.

### Cambiar entre libros abiertos

| Acción | Método |
| --- | --- |
| Ver todos los libros abiertos | Vista > Cambiar ventanas (lista de libros abiertos) |
| Cambiar entre ventanas de libro | Ctrl+F6 (entre dos ventanas) · Ctrl+Mayús+F6 (entre todas las ventanas de Excel) |
| Nueva ventana del mismo libro | Vista > Nueva ventana (crea una segunda vista; no duplica el archivo) |
| Organizar ventanas en pantalla | Vista > Organizar todo (en mosaico, horizontal, vertical o cascada) |

## Atajos de teclado esenciales

### Atajos más usados

| Atajo | Acción |
| --- | --- |
| Ctrl+C | Copiar selección |
| Ctrl+X | Cortar selección |
| Ctrl+V | Pegar selección |
| Ctrl+Z | Deshacer última acción |
| Ctrl+Y | Rehacer acción |
| Ctrl+G | Guardar libro |
| Ctrl+P | Imprimir libro |
| Ctrl+A | Abrir libro |
| Ctrl+U | Nuevo libro en blanco |
| Ctrl+W | Cerrar libro |
| Ctrl+B | Buscar |
| Ctrl+L | Reemplazar |
| Ctrl+H | Convención INGLESA de Reemplazar (Replace). En el Excel instalado en español la tecla es Ctrl+L; Ctrl+H aparece como distractor típico. |
| Ctrl+E | Seleccionar toda la hoja |
| Alt+= | Insertar fórmula SUMA automática (autosuma) |
| F12 | Guardar como |
| Supr | Eliminar contenido de celda |
| Mayús+F10 / Tecla menú | Abrir menú contextual |
| Ctrl+9 | Ocultar filas seleccionadas |
| Ctrl+Mayús+9 | Mostrar filas ocultas en la selección |
| Ctrl+0 | Ocultar columnas seleccionadas |
| Ctrl+Mayús+0 | Mostrar columnas ocultas en la selección |
| Ctrl+Mayús+G | Abrir cuadro de diálogo Estadísticas del libro |
| Ctrl+F1 | Mostrar u ocultar la cinta de opciones |

### Navegación

| Atajo | Acción |
| --- | --- |
| Ctrl+Inicio | Ir al inicio de la hoja (celda A1) |
| Ctrl+Fin | Ir a la última celda usada |
| Ctrl+Flecha | Saltar al borde del bloque de datos actual |
| Fin, Flecha | Moverse a la siguiente celda no vacía (modo Fin) |
| Inicio | Ir al principio de la fila |
| Av.Pág | Desplazar una pantalla hacia abajo |
| Re.Pág | Desplazar una pantalla hacia arriba |
| Alt+Av.Pág | Desplazar una pantalla a la derecha |
| Alt+Re.Pág | Desplazar una pantalla a la izquierda |
| Ctrl+Av.Pág | Ir a la hoja siguiente |
| Ctrl+Re.Pág | Ir a la hoja anterior |
| F5 / Ctrl+I | Cuadro de diálogo Ir a |
| Tab | Moverse a la celda de la derecha |
| Mayús+Tab | Moverse a la celda de la izquierda |
| Esc | Cancelar entrada o cerrar cuadro de diálogo |
| Alt+Flecha abajo | Abrir lista desplegable de validación de datos |
| Ctrl+Alt+= | Acercar zoom |
| Ctrl+Alt+- | Alejar zoom |
| Ctrl+Mayús+Despl (rueda) | Desplazamiento horizontal |

### Edición de celdas

| Atajo | Acción |
| --- | --- |
| F2 | Editar celda activa (coloca cursor al final) |
| F4 | Repetir última acción / alternar tipo de referencia ($A$1, A$1, $A1, A1) |
| Alt+Intro | Salto de línea dentro de la misma celda |
| Ctrl+Intro | Rellenar el rango seleccionado con la entrada actual |
| Mayús+Intro | Completar entrada y seleccionar celda superior |
| Ctrl+D | Rellenar hacia abajo (desde celda superior del rango) |
| Ctrl+R | Rellenar hacia la derecha |
| Ctrl+- (guión) | Abrir cuadro de diálogo Eliminar celdas/filas/columnas |
| Ctrl+Mayús+signo más (+) | Abrir cuadro de diálogo Insertar celdas/filas/columnas |
| Supr | Borrar contenido de celda (sin borrar formato ni comentarios) |
| Retroceso | Borrar carácter a la izquierda en barra de fórmulas; vaciar celda activa |
| Ctrl+` (acento grave) | Mostrar u ocultar fórmulas en todas las celdas |
| Ctrl+' (apóstrofe) | Copiar fórmula de la celda superior a la celda actual |
| Ctrl+Mayús+" | Copiar el valor (no la fórmula) de la celda superior |
| Ctrl+Alt+V | Abrir cuadro de diálogo Pegado especial |
| Ctrl+Q | Mostrar opciones de Análisis rápido |
| Mayús+F2 | Agregar o editar nota de celda |
| Ctrl+Mayús+F2 | Insertar o responder comentario encadenado |

#### Pegado especial

| Tecla | Acción |
| --- | --- |
| A | Pegar todo (contenido y formato) |
| F | Pegar solo fórmulas |
| V | Pegar solo valores |
| T | Pegar solo formato |
| C | Pegar solo comentarios y notas |
| N | Pegar solo configuración de validación de datos |
| H | Pegar todo el contenido y formato |
| X | Pegar todo excepto bordes |
| W | Pegar solo anchos de columna |
| R | Pegar solo fórmulas y formatos de número |
| U | Pegar solo valores y formatos de número |

### Formato de celdas

| Atajo | Acción |
| --- | --- |
| Ctrl+1 | Abrir cuadro de diálogo Formato de celdas |
| Ctrl+Mayús+F / Ctrl+Mayús+P | Establecer fuentes en cuadro Formato de celdas |
| Ctrl+N (o Ctrl+2) | Negrita |
| Ctrl+K (o Ctrl+3) | Cursiva |
| Ctrl+S (o Ctrl+4) | Subrayado |
| Ctrl+5 | Tachado |
| Ctrl+6 | Alternar ocultar/mostrar objetos |
| Ctrl+8 | Mostrar u ocultar símbolos de esquema |
| Ctrl+Mayús+~ | Formato General (sin formato específico) |
| Ctrl+Mayús+$ | Formato Moneda (2 decimales, símbolo €/$) |
| Ctrl+Mayús+% | Formato Porcentaje (sin decimales) |
| Ctrl+Mayús+^ | Formato Científico (notación exponencial) |
| Ctrl+Mayús+# | Formato Fecha |
| Ctrl+Mayús+@ | Formato Hora |
| Ctrl+Mayús+! | Formato Número (2 decimales, separador de miles) |
| Ctrl+Mayús+& | Aplicar borde de contorno a las celdas seleccionadas |
| Ctrl+Mayús+_ | Quitar borde de contorno de las celdas seleccionadas |
| Ctrl+Alt+K | Abrir cuadro de diálogo Insertar hipervínculo |
| Ctrl+L / Ctrl+T | Abrir cuadro de diálogo Crear tabla |
| F7 | Revisar ortografía de la hoja activa |

### Selección

| Atajo | Acción |
| --- | --- |
| Ctrl+E / Ctrl+Mayús+Barra espaciadora | Seleccionar toda la hoja de cálculo |
| Ctrl+Barra espaciadora | Seleccionar columna completa |
| Mayús+Barra espaciadora | Seleccionar fila completa |
| Ctrl+Mayús+Barra espaciadora | Seleccionar todos los objetos de la hoja |
| Mayús+Flecha | Ampliar la selección una celda en la dirección indicada |
| Ctrl+Mayús+Flecha | Ampliar selección hasta la última celda no vacía de la columna/fila |
| Ctrl+Mayús+Fin | Ampliar selección hasta la última celda usada |
| Ctrl+Mayús+Inicio | Ampliar selección hasta el inicio de la hoja |
| Ctrl+Mayús+Re.Pág | Seleccionar la hoja actual y la anterior |
| Ctrl+Mayús+Av.Pág | Seleccionar la hoja actual y la siguiente |
| Ctrl+Mayús+* | Seleccionar la región actual alrededor de la celda activa |
| F8 | Activar/desactivar modo de selección extendida |
| Mayús+F8 | Agregar un rango no adyacente a la selección |
| Ctrl+clic | Seleccionar celdas o rangos no adyacentes |

### Fórmulas

| Atajo | Acción |
| --- | --- |
| Mayús+F3 | Abrir asistente Insertar función |
| F3 | Abrir cuadro de diálogo Pegar nombre (si hay nombres definidos) |
| F9 | Calcular todas las hojas de todos los libros abiertos |
| Mayús+F9 | Calcular solo la hoja activa |
| Ctrl+Alt+F9 | Forzar recálculo completo de todos los libros |
| Ctrl+Alt+Mayús+F9 | Verificar fórmulas dependientes y recalcular todas las celdas |
| Alt+= | Insertar fórmula SUMA (autosuma) |
| Ctrl+Mayús+U | Expandir o contraer la barra de fórmulas |
| Ctrl+Mayús+A | Insertar paréntesis y nombres de argumentos al escribir una función |
| Ctrl+Mayús+E | Aplicar Relleno rápido para reconocer patrones en columnas |
| Alt+Mayús+F10 | Mostrar menú del botón de comprobación de errores |
| Ctrl+F1 | Mostrar u ocultar la cinta de opciones |

### Insertar fecha y hora

| Atajo | Acción |
| --- | --- |
| Ctrl+; (punto y coma) | Insertar la fecha actual |
| Ctrl+Mayús+: (dos puntos) | Insertar la hora actual |

### Libro y hojas

| Atajo | Acción |
| --- | --- |
| Ctrl+Av.Pág | Ir a la hoja siguiente |
| Ctrl+Re.Pág | Ir a la hoja anterior |
| Ctrl+Mayús+Av.Pág | Seleccionar hoja actual y la siguiente |
| Ctrl+Mayús+Re.Pág | Seleccionar hoja actual y la anterior |
| Ctrl+F6 | Cambiar entre ventanas abiertas de Excel |
| Ctrl+Mayús+F6 | Cambiar entre todas las ventanas de Excel |
| F11 | Crear gráfico en una hoja de gráfico separada |
| Alt+F1 | Crear gráfico incrustado en la hoja activa |
| Alt+F8 | Abrir cuadro de diálogo Macros |
| Alt+F11 | Abrir editor de Visual Basic para Aplicaciones (VBA) |
| Alt+F12 | Abrir editor de Power Query |
| Mayús+F11 | Insertar nueva hoja de cálculo |

### Actualización de datos externos

| Atajo | Acción |
| --- | --- |
| Esc | Detener la operación de actualización |
| Ctrl+F5 | Actualizar datos de la hoja activa |
| Ctrl+Alt+F5 | Actualizar todos los datos del libro |

### Teclas de función F1–F12

| Tecla | Sola | Mayús | Ctrl | Alt |
| --- | --- | --- | --- | --- |
| F1 | Mostrar panel de Ayuda de Excel | Alt+Mayús+F1: nueva hoja | Mostrar/ocultar cinta de opciones | Crear gráfico incrustado |
| F2 | Editar celda activa | Agregar o editar nota de celda | Editar en barra de fórmulas | — |
| F3 | Mostrar cuadro Pegar nombre | Abrir cuadro Insertar función | — | — |
| F4 | Repetir última acción / alternar referencia $ | — | Cerrar ventana del libro seleccionado | Cerrar Excel |
| F5 | Abrir cuadro de diálogo Ir a | — | Restaurar tamaño ventana del libro | — |
| F6 | Cambiar foco: hoja/cinta/panel/zoom | Orden inverso | Cambiar entre ventanas de Excel | — |
| F7 | Revisar ortografía | — | Ejecutar comando Mover (ventana no maximizada) | — |
| F8 | Activar/desactivar modo selección extendida | Agregar rango no adyacente a selección | Ejecutar comando Tamaño | Abrir cuadro de diálogo Macro |
| F9 | Calcular todos los libros abiertos | Calcular solo la hoja activa | Minimizar ventana del libro | — |
| F10 | Activar KeyTips (= Alt) | Mostrar menú contextual | Maximizar/restaurar ventana seleccionada | Menú comprobación de errores |
| F11 | Crear gráfico en hoja de gráfico nueva | Insertar nueva hoja de cálculo | — | Abrir editor VBA |
| F12 | Guardar como | — | — | — |

### Teclas de acceso a la cinta (KeyTips)

Pulsa Alt para mostrar los KeyTips sobre cada pestaña y luego la letra indicada:

| Atajo | Acción |
| --- | --- |
| Alt+H | Ir a la pestaña Inicio |
| Alt+N | Ir a la pestaña Insertar |
| Alt+P | Ir a la pestaña Diseño de página |
| Alt+M | Ir a la pestaña Fórmulas |
| Alt+A | Ir a la pestaña Datos |
| Alt+R | Ir a la pestaña Revisar |
| Alt+W | Ir a la pestaña Vista |
| Alt+Q | Cuadro de búsqueda Información / Dígame |

### Otras teclas de uso frecuente

| Tecla | Descripción |
| --- | --- |
| Alt | Mostrar KeyTips en la cinta (Alt+W+P: vista Diseño de página; Alt+W+L: Normal; Alt+W+I: Vista previa de salto de página) |
| Teclas de dirección | Moverse una celda. Ctrl+Flecha: borde del bloque de datos. Mayús+Flecha: ampliar selección. Ctrl+Mayús+Flecha: hasta última celda no vacía |
| Retroceso | Eliminar carácter a la izquierda en barra de fórmulas; vaciar celda activa; borrar carácter izquierdo del cursor en modo edición |
| Supr | Eliminar contenido de la celda sin afectar formato ni comentarios |
| Fin | Activar/desactivar modo Fin para navegación; Ctrl+Fin: última celda; Ctrl+Mayús+Fin: ampliar selección |
| Intro | Completar entrada y bajar; Alt+Intro: nueva línea en celda; Ctrl+Intro: rellenar rango seleccionado; Mayús+Intro: completar y subir |
| Esc | Cancelar entrada en celda o barra de fórmulas; cerrar menús, submenús, cuadros de diálogo o mensajes |
| Inicio | Ir al principio de la fila; Ctrl+Inicio: inicio de hoja; Ctrl+Mayús+Inicio: ampliar selección al inicio |
| Av.Pág | Bajar una pantalla; Alt+Av.Pág: derecha; Ctrl+Av.Pág: hoja siguiente; Ctrl+Mayús+Av.Pág: seleccionar hoja siguiente |
| Re.Pág | Subir una pantalla; Alt+Re.Pág: izquierda; Ctrl+Re.Pág: hoja anterior; Ctrl+Mayús+Re.Pág: seleccionar hoja anterior |
| Mayús | Mantener pulsado al arrastrar fila/columna/celdas seleccionadas para mover y reposicionar |
| Barra espaciadora | Ejecutar botón en cuadro de diálogo; Ctrl+Barra esp.: columna entera; Mayús+Barra esp.: fila entera; Ctrl+Mayús+Barra esp.: todos los objetos |
| Tab | Mover a celda derecha; desplazarse entre celdas desbloqueadas en hoja protegida; siguiente opción de diálogo; Mayús+Tab: celda izquierda |
Fuente oficial: Métodos abreviados de teclado en Excel — Microsoft Support

## Tablas dinámicas y segmentación

### Tablas dinámicas

Una tabla dinámica resume, analiza y explora grandes conjuntos de datos de forma interactiva sin necesidad de fórmulas. Se crea desde Insertar > Tabla dinámica.

#### Requisitos del origen de datos

El rango de origen debe cumplir estas condiciones:

Organizado en columnas con una fila de encabezado única (sin encabezados en blanco ni duplicados)

Sin filas ni columnas completamente vacías dentro del conjunto

Cada columna debe contener datos del mismo tipo (no mezclar fechas con texto)

Sin subtotales ni totales intermedios en los datos fuente

Sin celdas combinadas en el área de datos

Toda la información debe estar en la misma hoja (para origen de rango)

#### Crear una tabla dinámica

Seleccionar cualquier celda del rango de datos

Ir a Insertar > Tabla dinámica

Confirmar el rango detectado o ajustarlo

Elegir destino: Nueva hoja de cálculo (recomendado) o hoja existente

Hacer clic en Aceptar

Configurar campos en el panel Campos de tabla dinámica

#### Zonas de la tabla dinámica

| Zona | Función | Qué se coloca aquí |
| --- | --- | --- |
| Filas | Define las categorías en filas (eje vertical) | Campos de texto o categóricos (ej. Departamento, Producto) |
| Columnas | Define las categorías en columnas (eje horizontal) | Campos de fecha o categorías secundarias |
| Valores | Calcula el resumen numérico | Campos numéricos (ej. Ventas, Cantidad) |
| Filtros | Filtra toda la tabla dinámica desde una lista desplegable | Campos por los que se quiere segmentar globalmente |
Excel coloca automáticamente los campos no numéricos en Filas y los numéricos en Valores. Las jerarquías de fecha/hora se agrupan automáticamente en Columnas.

#### Diseños de informe

Disponibles en Diseño > Diseño de informe:

| Diseño | Descripción |
| --- | --- |
| Compacto | Predeterminado. Todos los campos de fila en una única columna |
| Esquema | Cada campo de fila en su propia columna; puede mostrar subtotales en la parte superior de cada grupo |
| Tabular | Formato de tabla plana. Facilita copiar datos y análisis externos |
La opción Repetir etiquetas de elementos (Diseño > Diseño de informe > Repetir todas las etiquetas de elementos / No repetir las etiquetas de elementos) decide si la etiqueta de cada elemento se muestra en todas sus filas o solo una vez. El formato numérico no es un aspecto del diseño de informe — se configura desde Configuración de campo de valor.

#### Subtotales y totales generales

Subtotales (Diseño > Subtotales): No mostrar, Mostrar todos los subtotales al principio del grupo, Mostrar todos los subtotales al final del grupo.

Totales generales (Diseño > Totales generales): Desactivados para filas y columnas, Activados para filas y columnas, Activados solo para filas, Activados solo para columnas.

#### Configuración de campos de valor

##### Resumir valores por

Acceso: hacer clic derecho sobre un campo en la zona Valores > Configuración de campo de valor > pestaña Resumir valores por.

| Función | Calcula |
| --- | --- |
| Suma | Suma de todos los valores (predeterminada para números) |
| Cuenta | Número de celdas no vacías (predeterminada para texto) |
| Promedio | Media aritmética |
| Máx | Valor máximo |
| Mín | Valor mínimo |
| Producto | Producto (multiplicación) de todos los valores |
| Contar números | Solo cuenta celdas con valores numéricos |
| Desv.est | Desviación estándar muestral |
| Desvestp | Desviación estándar de la población |
| Var | Varianza muestral |
| Varp | Varianza de la población |

##### Mostrar valores como

Pestaña Mostrar valores como en la misma ventana de configuración. Permite presentar los valores en formato calculado en lugar de como cifras brutas:

| Opción | Descripción |
| --- | --- |
| Sin cálculo | Valor bruto (predeterminado) |
| % del total general | Porcentaje sobre el gran total |
| % del total de columnas | Porcentaje sobre el total de la columna |
| % del total de filas | Porcentaje sobre el total de la fila |
| % de | Porcentaje respecto a un elemento base específico |
| % del total de filas principales | % respecto al subtotal de la fila padre |
| % del total de columnas principales | % respecto al subtotal de la columna padre |
| % del total principal | % respecto al total del campo padre |
| Diferencia de | Diferencia numérica respecto a un elemento base |
| % de la diferencia de | Diferencia porcentual respecto a un elemento base |
| Total en | Total acumulado (running total) por campo |
| % del total en | Total acumulado como porcentaje |
| Clasificar de menor a mayor | Rango ascendente |
| Clasificar de mayor a menor | Rango descendente |
| Índice | Índice que pondera el valor respecto al total general |

#### Campos y elementos calculados

##### Campo calculado

Un campo calculado crea una nueva columna de datos basada en fórmulas que operan sobre otros campos del origen. No añade datos al origen; opera dentro de la tabla dinámica.

Ruta: Con la tabla dinámica seleccionada > Analizar > Campos, elementos y conjuntos > Campo calculado

Sintaxis: Las fórmulas utilizan nombres de campo entre comillas simples si contienen espacios, y no admiten referencias a celdas ni funciones de hoja de cálculo que dependan de referencias:

= Ventas - Costes

= Beneficio / Ventas

= Unidades * 'Precio unitario'

Limitaciones:

No se pueden usar referencias a celdas individuales

No se pueden referenciar elementos específicos de otro campo

El campo calculado aparece disponible como un campo más en el panel de campos

##### Elemento calculado

Un elemento calculado añade un nuevo elemento dentro de un campo existente, calculado a partir de otros elementos de ese mismo campo.

Ruta: Seleccionar un elemento del campo en la tabla dinámica > Analizar > Campos, elementos y conjuntos > Elemento calculado

Ejemplo: En el campo Región con elementos Norte, Sur y Este, crear un elemento calculado «Centro» = Norte + Sur.

Diferencias con campo calculado:

El campo calculado opera sobre campos completos; el elemento calculado opera sobre elementos concretos dentro de un campo.

Los elementos calculados no están disponibles cuando el campo está agrupado.

#### Agrupación de datos

##### Agrupar fechas

Al añadir un campo de fecha a la zona de Filas o Columnas, Excel agrupa automáticamente por Años, Trimestres y Meses. Para personalizar:

Hacer clic derecho sobre cualquier fecha en la tabla > Agrupar

En el cuadro de diálogo, seleccionar los intervalos: Segundos, Minutos, Horas, Días, Meses, Trimestres, Años

Para días: definir el número de días por grupo

Hacer clic en Aceptar

##### Agrupar números

Hacer clic derecho sobre un valor numérico en la tabla > Agrupar

Definir Desde, Hasta e Intervalo

Hacer clic en Aceptar

Ejemplo: agrupar edades en tramos de 10 en 10 (0-9, 10-19, 20-29...)

##### Agrupar elementos seleccionados

Seleccionar varios elementos con Ctrl + clic > clic derecho > Agrupar. Excel crea un grupo personalizado que puede renombrarse.

##### Desagrupar

Clic derecho sobre cualquier elemento del grupo > Desagrupar.

#### Ordenar y filtrar

Ordenar: Hacer clic en la flecha de encabezado de fila o columna y elegir orden ascendente o descendente. También disponible en Analizar > Ordenar.

Filtros de etiqueta: Filtran por el texto del elemento (contiene, comienza por, etc.).

Filtros de valor: Filtran por la cifra calculada (mayor que, entre, top 10, etc.).

Filtros de fecha: Filtran por período cuando el campo es de tipo fecha (este mes, trimestre anterior, etc.).

Buscar en la lista de filtros: El cuadro de búsqueda dentro de la lista de elementos permite localizar valores rápidamente en campos con muchos elementos.

#### Opciones de tabla dinámica

Acceso: clic derecho en la tabla dinámica > Opciones de tabla dinámica, o Analizar > Tabla dinámica > Opciones.

| Pestaña | Opciones destacadas |
| --- | --- |
| Diseño y formato | Combinar y centrar celdas de etiquetas, sangría, mostrar filas/columnas vacías, mostrar elementos sin datos |
| Totales y filtros | Mostrar totales generales de filas/columnas, subtotales de elementos filtrados, ordenar listas personalizadas |
| Mostrar | Mostrar botones de expandir/contraer, encabezados de campo, lista de campos |
| Impresión | Repetir etiquetas de filas en cada página impresa |
| Datos | Actualizar al abrir el archivo, número de elementos por campo a conservar |
| Texto alternativo | Título y descripción de la tabla para accesibilidad |

#### Actualizar los datos

Cuando cambian los datos de origen, la tabla dinámica no se actualiza automáticamente. Métodos de actualización:

| Método | Acción |
| --- | --- |
| Actualizar (manual) | Clic derecho en la tabla > Actualizar, o Alt + F5 |
| Actualizar todo | Ctrl + Alt + F5, o Analizar > Actualizar > Actualizar todo |
| Actualizar al abrir | Analizar > Tabla dinámica > Opciones > pestaña Datos > activar «Actualizar al abrir el archivo» |
| Cambiar origen de datos | Analizar > Cambiar origen de datos — para apuntar a un rango diferente o más amplio |

#### Segmentación de datos

Las segmentaciones (Insertar > Segmentación de datos) son controles visuales con botones que filtran la tabla dinámica de forma interactiva, mostrando en todo momento qué filtros están activos.

##### Insertar una segmentación

Hacer clic en cualquier celda de la tabla dinámica

Ir a Insertar > Segmentación de datos

Marcar los campos que se desean como segmentaciones

Hacer clic en Aceptar

Cada campo seleccionado genera su propia segmentación independiente.

##### Selección múltiple

Clic en el primer elemento

Ctrl + clic para añadir elementos individuales

O activar el botón de selección múltiple dentro de la segmentación

##### Conectar una segmentación a varias tablas dinámicas

Requisito: todas las tablas dinámicas deben compartir el mismo origen de datos.

Hacer clic derecho sobre la segmentación

Seleccionar Conexiones de informe (o Configurar conexiones de informe)

Marcar todas las tablas dinámicas a las que debe aplicarse el filtro

Hacer clic en Aceptar

##### Desconectar una segmentación

Desde la tabla dinámica de destino: Analizar > Conexiones de filtro > desmarcar la segmentación.

##### Limpiar un filtro

Botón Borrar filtro (embudo con aspa, esquina superior derecha de la segmentación). ⚠️ En Microsoft 365, Alt + C abre el panel de Copilot: la ayuda de Microsoft sobre segmentaciones no documenta ningún atajo de teclado para borrar el filtro.

#### Escala de tiempo

Insertar > Escala de tiempo: filtro temporal visual específico para campos de fecha. Permite seleccionar intervalos de tiempo (días, meses, trimestres, años) con un control deslizante. Se conecta a múltiples tablas dinámicas igual que las segmentaciones (clic derecho > Conexiones de informe).

### Tablas de Excel

Una tabla de Excel es un rango de datos formateado como objeto estructurado. No debe confundirse con una tabla dinámica: la tabla de Excel es el origen de datos estructurado; la tabla dinámica es el resumen interactivo construido sobre ese origen (u otros).

#### Crear una tabla

Seleccionar cualquier celda del rango de datos

Ir a Insertar > Tabla (o Ctrl + T)

Confirmar el rango y si la tabla tiene encabezados

Hacer clic en Aceptar

Excel asigna un nombre automático (Tabla1, Tabla2...) que puede cambiarse en Diseño de tabla > Nombre de tabla.

#### Requisitos del rango de origen

Toda la información debe estar en la misma hoja

Sin celdas combinadas en el área de datos

Una fila de encabezados única y sin duplicados

Las filas en blanco no impiden que el rango sea una tabla: una tabla puede tenerlas (se localizan filtrando por (Espacios en blanco))

#### Ventajas de las tablas estructuradas

| Ventaja | Descripción |
| --- | --- |
| Autoexpansión | Al escribir en la fila inmediatamente inferior o en la columna adyacente, la tabla se amplía automáticamente |
| Referencias estructuradas | Las fórmulas usan nombres de tabla y columna en lugar de referencias de celda, haciéndolas más legibles y robustas |
| Fila de totales | Activar en Diseño de tabla > Fila de totales: agrega una fila al pie con función seleccionable por columna (Suma, Promedio, Cuenta, Máx, Mín...) |
| Filtros automáticos | Encabezados con flechas de filtro habilitadas desde el momento de crear la tabla |
| Estilos rápidos | Galería de estilos en Diseño de tabla > Estilos de tabla para formatear con un clic |
| Columnas calculadas | Al introducir una fórmula en una celda de una columna vacía, se propaga automáticamente a todas las filas de esa columna |
| Compatibilidad con tablas dinámicas | Al usar una tabla de Excel como origen, la tabla dinámica se actualiza automáticamente cuando el rango cambia de tamaño (sin necesidad de redefinir el origen) |

#### Referencias estructuradas

| Sintaxis | Referencia |
| --- | --- |
| Tabla1[Columna1] | Todas las celdas de datos de Columna1 |
| Tabla1[[#Encabezados],[Columna1]] | Solo el encabezado de Columna1 |
| Tabla1[[#Totales],[Columna1]] | Solo el total de Columna1 |
| Tabla1[#Todas] | Toda la tabla incluidos encabezados y totales |
| [@Columna1] | La celda de la misma fila en Columna1 (referencia de fila actual) |

#### Convertir una tabla en rango

Diseño de tabla > Convertir en rango: elimina la estructura de tabla pero conserva el formato.

### Gráficos dinámicos

Un gráfico dinámico es una representación visual vinculada a una tabla dinámica. Ambos están sincronizados: cualquier cambio en los campos, filtros o segmentaciones de la tabla dinámica se refleja inmediatamente en el gráfico.

#### Crear un gráfico dinámico

Desde una tabla dinámica existente:

Seleccionar cualquier celda de la tabla > Analizar > Gráfico dinámico
Desde datos en bruto (sin tabla dinámica previa):

Insertar > Gráfico dinámico — crea simultáneamente la tabla y el gráfico

#### Tipos de gráfico compatibles

Columnas, barras, líneas, áreas, circular y anillos. No se puede usar un gráfico xy (dispersión), de cotizaciones ni de burbujas. Los tipos de mapa de árbol, estadísticos y combinados no son compatibles con tablas dinámicas.

#### Comportamiento y sincronización

Los filtros de campo del gráfico y los de la tabla dinámica están sincronizados bidireccionalmente

Las segmentaciones de datos conectadas a la tabla también filtran el gráfico automáticamente

Mover un gráfico dinámico a otra hoja no rompe el vínculo con la tabla dinámica

#### Actualización

El gráfico se actualiza junto con la tabla dinámica al ejecutar Actualizar (Alt + F5).

### Análisis rápido

Análisis rápido (atajo: Ctrl + Q al seleccionar un rango) es un menú contextual que aparece en la esquina inferior derecha de cualquier selección y propone visualizaciones y análisis en un clic.

#### Categorías disponibles

| Categoría | Opciones principales |
| --- | --- |
| Formato | Barras de datos, escalas de color, conjuntos de iconos, valores mayores/menores que |
| Gráficos | Gráficos recomendados según los datos seleccionados |
| Totales | Suma, Promedio, Recuento, % del total, Total acumulado — no incluye Producto |
| Tablas | Tabla de Excel, Tabla dinámica, Tablas dinámicas recomendadas |
| Minigráficos | Línea, Columna, Pérdidas y ganancias (sparklines en celdas) |
Al pasar el cursor sobre cada opción se obtiene una vista previa en tiempo real antes de aplicar.

### Límites de las tablas dinámicas

| Característica | Límite |
| --- | --- |
| Elementos únicos por campo | 1.048.576 |
| Filtros de informe | 256 |
| Campos de valores | 256 |

### Power Pivot

Power Pivot es un complemento de Excel que extiende las capacidades de análisis de datos más allá de las tablas dinámicas estándar.

#### Activación

Archivo > Opciones > Complementos > Complementos COM > Ir > marcar Microsoft Power Pivot para Excel

Tras activarlo, aparece la pestaña Power Pivot en la cinta.

#### Diferencias respecto a las tablas dinámicas estándar

| Característica | Tabla dinámica estándar | Power Pivot |
| --- | --- | --- |
| Fuentes de datos | Un solo rango/tabla | Múltiples fuentes simultáneas |
| Relaciones | No soporta | Sí, entre tablas distintas |
| Límite de filas | 1.048.576 por hoja | Millones de filas (in-memory) |
| Fórmulas | Campos calculados simples | DAX (lenguaje completo) |
| Modelo de datos | No | Sí, en el modelo de datos del libro |

#### Modelo de datos

El modelo de datos del libro almacena tablas en memoria con relaciones definidas entre ellas (similar a una base de datos relacional). Power Pivot permite crear y gestionar estas relaciones desde la vista de diagrama.

#### DAX (Data Analysis Expressions)

DAX es el lenguaje de fórmulas de Power Pivot. Se usa para crear columnas calculadas y medidas:

Columna calculada: se evalúa fila a fila (contexto de fila)

Margen = [Ventas] - [Costes]

Medida: se evalúa según el contexto del filtro de la tabla dinámica

Total Ventas := SUM(Ventas[Importe])

Ventas YTD := TOTALYTD(SUM(Ventas[Importe]), Calendario[Fecha])

Funciones DAX clave: SUM, CALCULATE, FILTER, RELATED, TOTALYTD, DIVIDE, IF

### Power Query (Obtener y transformar datos)

Power Query es la herramienta de importación y transformación de datos de Excel, accesible desde la pestaña Datos > Obtener y transformar datos.

#### Fases del flujo de trabajo

Conectar — Conectarse a una fuente (archivo Excel, CSV, base de datos, web, SharePoint, etc.)

Transformar — Dar forma a los datos en el Editor de Power Query sin modificar el origen

Combinar — Unir consultas (Anexar o Combinar)

Cargar — Volcar el resultado a una hoja o al modelo de datos

#### Transformaciones principales

| Transformación | Descripción |
| --- | --- |
| Quitar columnas | Elimina columnas innecesarias |
| Cambiar tipo | Convierte tipos de datos (texto, número, fecha, etc.) |
| Filtrar filas | Elimina filas según condición |
| Dividir columna | Separa valores por delimitador o posición |
| Anular dinamización (Unpivot) | Convierte columnas en filas — clave para normalizar datos en formato cruzado |
| Dinamizar columna (Pivot) | Convierte filas en columnas |
| Combinar consultas (Merge) | Une dos tablas por columna común (equivalente a BUSCARV/XLOOKUP) |
| Anexar consultas (Append) | Apila filas de varias consultas en una |
| Agrupar por | Agrupa y agrega datos |
| Rellenar | Propaga valores hacia abajo/arriba para rellenar celdas vacías |

#### Actualización

Las consultas de Power Query se actualizan con Datos > Actualizar todo (Ctrl + Alt + F5) o individualmente desde el panel de consultas.

#### Almacenamiento de pasos

Power Query guarda cada transformación como un paso aplicado. Se pueden reordenar, editar o eliminar pasos sin repetir el proceso.

Actualización automática de tablas dinámicas (programa Insider)
Microsoft está incorporando en las versiones más recientes de Excel una actualización automática de las tablas dinámicas que se alimentan de datos del propio libro: al cambiar esos datos, la tabla dinámica se pondría al día sola. De momento esa función solo la tienen quienes participan en el programa Microsoft 365 Insider. Para el resto de usuarios sigue valiendo lo de arriba: tras modificar los datos de origen hay que actualizar la tabla dinámica (clic derecho > Actualizar, o Alt + F5), o marcar que se actualice al abrir el archivo.

Fuente: Microsoft Support — Actualizar datos de tabla dinámica

Función de resumen predeterminada: Suma o Contar
Al arrastrar un campo al área Valores de una tabla dinámica, Excel elige por sí mismo la función con la que lo resume, y la elección depende de lo que contenga el campo:

Si sus valores son numéricos, usa Suma.

Si el campo contiene espacios en blanco o valores no numéricos (texto, fecha o booleanos), la tabla dinámica usa la función Contar para el campo.

Basta, por tanto, con que un campo de cifras tenga algún valor de texto o alguna celda vacía para que la tabla dinámica muestre un recuento en lugar de una suma.

La función de resumen Contar funciona del mismo modo que la función CONTARA (cuenta los valores que no están vacíos). No hay que confundirla con Contar números, que cuenta solo los valores que son números y funciona igual que la función CONTAR de la hoja de cálculo.

Cómo cambiarla: clic con el botón derecho en un valor del campo > Resumir valores por y elegir la función; o bien Analizar tabla dinámica > Campo activo > Configuración de campo, y en el cuadro Configuración de campo de valor, pestaña Resumir valores por. Si después de colocar el campo se cambia la función a Suma, los valores en blanco o no numéricos se cambian a 0 en la tabla dinámica para que se puedan sumar.

## Herramientas de análisis de datos

Herramientas avanzadas disponibles principalmente en la pestaña Datos para analizar, auditar y resumir información.

### Análisis de hipótesis

Ruta: Datos > Previsión > Análisis de hipótesis

El análisis de hipótesis permite cambiar valores en celdas para observar cómo afectan esos cambios al resultado de fórmulas. Excel ofrece tres herramientas dentro de este menú.

#### Administrador de escenarios

Datos > Análisis de hipótesis > Administrador de escenarios

Guarda y compara diferentes conjuntos de valores de entrada (escenarios) para analizar múltiples situaciones sin modificar manualmente la hoja. La dirección del análisis es hacia adelante: se definen las entradas y se observan las salidas.

Características y límites:

Cada escenario puede tener un máximo de 32 celdas cambiantes

Se pueden crear tantos escenarios como sea necesario en una hoja

Permite crear, editar, eliminar y combinar escenarios

La opción Combinar importa escenarios desde otras hojas o libros

Informe de resumen: genera una hoja aparte con todos los escenarios y sus resultados; los informes no se actualizan automáticamente si se modifican los valores posteriormente

Tipos de informe: Resumen de escenarios (tabla estática) e Informe de tabla dinámica de escenarios (tabla dinámica interactiva)

Pasos básicos:

Datos > Análisis de hipótesis > Administrador de escenarios

Clic en Agregar para crear un escenario nuevo

Dar un nombre al escenario y seleccionar las celdas cambiantes

Introducir los valores para cada celda cambiante

Repetir para cada escenario; usar Mostrar para aplicar un escenario a la hoja

Usar Resumen... para generar el informe comparativo

#### Buscar objetivo

Datos > Análisis de hipótesis > Buscar objetivo

Determina qué valor debe tomar una celda de entrada para que una celda de resultado (con fórmula) alcance un valor concreto. Trabaja hacia atrás: conoces el resultado deseado y quieres saber qué entrada lo produce.

Cuadro de diálogo — tres campos:

| Campo | Descripción |
| --- | --- |
| Definir la celda | La celda que contiene la fórmula (el resultado que quieres controlar) |
| Con el valor | El valor numérico que quieres que tenga esa celda |
| Cambiando la celda | La celda de entrada que Excel ajustará (debe contener un valor, no una fórmula) |
Limitación crítica: solo trabaja con una única variable. Para múltiples variables simultáneas o con restricciones, usar Solver.

Ejemplo típico: calcular el tipo de interés necesario para que la cuota mensual de un préstamo sea exactamente 500 €.

#### Tablas de datos

Datos > Análisis de hipótesis > Tabla de datos

Calcula múltiples resultados variando uno o dos valores de entrada y muestra todos los resultados en formato tabular. Se recalculan automáticamente con el resto de la hoja (salvo que se deshabilite el recálculo automático).

Tabla de una variable:

Examina cómo afecta una variable a una o varias fórmulas

Orientación en columna: los valores de entrada en una columna; la(s) fórmula(s) en la fila superior, a la derecha; se especifica una celda de entrada de columna

Orientación en fila: los valores de entrada en una fila; la(s) fórmula(s) en la columna izquierda, debajo; se especifica una celda de entrada de fila

Tabla de dos variables:

Examina cómo afectan dos variables simultáneamente a una sola fórmula

La fórmula va en la esquina superior izquierda del rango de la tabla

Una lista de valores debajo de la fórmula (entrada de columna)

Otra lista de valores a la derecha de la fórmula (entrada de fila)

Excel rellena el resto de celdas con los resultados

Límite: una tabla de datos no puede analizar más de dos variables. Para tres o más, usar el Administrador de escenarios.

### Solver

Datos > Análisis > Solver

Solver es un complemento que debe estar habilitado antes de usarlo: Archivo > Opciones > Complementos > Complementos de Excel > Ir... > marcar Solver > Aceptar. Una vez activado, aparece en la pestaña Datos, grupo Análisis.

Solver es una herramienta de optimización avanzada que busca el valor óptimo (máximo, mínimo o un valor concreto) para una celda objetivo, ajustando un conjunto de celdas variables y respetando restricciones definidas por el usuario.

Diferencia clave con Buscar objetivo:

| Buscar objetivo | Solver |
| --- | --- |
| Variables | 1 sola | Hasta 200 celdas de variables |
| Restricciones | Ninguna | Ilimitadas |
| Optimización | No (solo alcanzar un valor) | Sí (maximizar, minimizar o fijar) |
| Complejidad | Problemas simples | Problemas complejos y de optimización |
Componentes del modelo:

| Componente | Descripción |
| --- | --- |
| Celda objetivo | Celda con fórmula cuyo valor se desea maximizar, minimizar o fijar a un valor concreto. Debe contener una fórmula que dependa de las celdas de variables. |
| Celdas de variables (celdas de decisión) | Celdas que Solver modifica para alcanzar el objetivo. Pueden especificarse hasta 200 celdas de variables. |
| Restricciones | Condiciones que deben cumplirse: ≤, =, ≥, ent (valor entero), bin (valor binario 0/1), dif (todos diferentes entre sí). |
Métodos de resolución:

| Método | Uso recomendado |
| --- | --- |
| GRG No lineal | Problemas no lineales con funciones suaves y continuas. Es el método predeterminado. |
| Simplex LP | Problemas de programación lineal (función objetivo y todas las restricciones son lineales). Es el más rápido para este tipo. |
| Evolutivo | Problemas no suaves o discontinuos; usa algoritmos genéticos y evolutivos. El más lento pero el más general. |
Pasos básicos:

Datos > Solver

Establecer la celda objetivo e indicar si se maximiza, minimiza o se fija a un valor concreto

Especificar el rango de celdas de variables

Agregar restricciones con el botón Agregar

Seleccionar el método de resolución adecuado

Clic en Resolver; Excel muestra el resultado y permite mantenerlo o restaurar los valores originales

### Herramientas para análisis (Analysis ToolPak)

El Analysis ToolPak (Herramientas para análisis) es un complemento de Excel que proporciona herramientas estadísticas y de análisis avanzado. Debe activarse antes de usarlo.

Cómo activarlo: Archivo > Opciones > Complementos > Complementos de Excel > Ir... > marcar Herramientas para análisis > Aceptar. Una vez activado, aparece el comando Análisis de datos en la pestaña Datos, grupo Análisis.

Principales herramientas incluidas:

| Herramienta | Descripción |
| --- | --- |
| Estadística descriptiva | Media, mediana, moda, desviación típica, varianza, mínimo, máximo, etc. de un conjunto de datos |
| Histograma | Frecuencias y representación gráfica de la distribución de datos |
| Regresión | Análisis de regresión lineal simple o múltiple |
| Correlación | Coeficiente de correlación entre dos o más conjuntos de datos |
| Covarianza | Medida de la variación conjunta entre dos conjuntos de datos |
| Media móvil | Suavizado de series temporales calculando medias sobre ventanas de datos |
| Suavización exponencial | Pronóstico basado en medias ponderadas de valores anteriores |
| Análisis de Fourier | Transformada de Fourier para análisis de señales periódicas |
| Muestreo | Selección aleatoria o periódica de una muestra de un rango |
| Prueba t / Prueba F / ANOVA | Pruebas estadísticas de hipótesis para comparar medias o varianzas |
| Generación de números aleatorios | Genera números aleatorios con distribuciones estadísticas específicas |
| Rango y percentil | Tabla de valores con su rango y percentil dentro del conjunto |
Nota: el Analysis ToolPak genera resultados estáticos en una hoja de cálculo; no se actualizan si cambian los datos de entrada.

### Consolidar datos

Datos > Herramientas de datos > Consolidar

Combina datos de múltiples rangos (distintas hojas o libros) aplicando una función de resumen (Suma, Promedio, Contar, Máx, Mín, etc.). Los datos de origen pueden estar en libros externos. En Excel se denomina también resumir los resultados de hojas de cálculo independientes mediante una hoja de cálculo maestra.

Funciones disponibles: Suma, Contar, Promedio, Máx, Mín, Producto, Contar números, Desv.Est, Desv.Est.P, Var, VarP.

Dos métodos de consolidación:

| Método | Cuándo usarlo |
| --- | --- |
| Por posición | Los rangos de origen tienen la misma estructura: mismas etiquetas, mismo orden. Ejemplo: hojas creadas desde la misma plantilla. |
| Por categoría | Los rangos tienen las mismas etiquetas pero diferente orden o disposición. Excel usa las etiquetas de filas/columnas para emparejar datos. |
No existe un método "por grupo": los dos únicos métodos son por posición y por categoría.

Requisitos de los rangos de origen:

Formato de lista con encabezados en la primera fila

Sin filas ni columnas en blanco dentro del rango

Los rangos de origen deben estar en hojas distintas a la hoja de destino

Vínculos a datos de origen: si se activa "Crear vínculos a datos de origen", el rango consolidado se actualiza automáticamente cuando cambian los datos originales. Esta opción no está disponible si el origen y el destino están en la misma hoja. Los datos de origen no tienen que estar obligatoriamente en el mismo libro que la hoja de destino.

### Subtotales (comando de datos)

Datos > Esquema > Subtotal

El comando Subtotal inserta filas de subtotal automáticas en una lista de datos, agrupando por un campo y aplicando una función de resumen. Genera además un esquema (outline) que permite mostrar u ocultar los niveles de detalle.

Requisito fundamental: el rango de datos debe estar ordenado previamente por el campo sobre el que se van a calcular los subtotales.

Funciones disponibles: Suma, Contar, Promedio, Máx, Mín, Producto, Contar números, Desv.Est, Desv.Est.P, Var, VarP.

Pasos:

Ordenar la lista por la columna de agrupación

Datos > Esquema > Subtotal

Seleccionar "Para cada cambio en:" (campo de agrupación)

Elegir la función (Suma, Promedio, Contar, Máx, Mín, etc.)

Marcar las columnas sobre las que calcular el subtotal

Aceptar

Niveles de agrupación: Excel genera un esquema con botones numéricos (1, 2, 3...) y botones +/− para mostrar u ocultar los distintos niveles de detalle (datos, subtotales, gran total).

Subtotales anidados: para agregar un segundo nivel, ejecutar Subtotal de nuevo desmarcando "Reemplazar subtotales actuales".

Diferencia con tabla dinámica: el comando Subtotal actúa directamente sobre los datos en su lugar, mientras que una tabla dinámica crea un resumen independiente en otra ubicación. La tabla dinámica es más flexible pero no modifica los datos originales.

Eliminar subtotales: Datos > Esquema > Subtotal > botón Quitar todos.

### Función SUBTOTALES

Sintaxis: =SUBTOTALES(núm_función; ref1; [ref2]; ...)

Calcula un subtotal de una lista o base de datos. A diferencia de funciones como SUMA o PROMEDIO, ignora automáticamente otras celdas con SUBTOTALES para evitar el doble recuento. También permite controlar si se incluyen o no las filas ocultas manualmente.

Argumentos:

núm_función: número del 1 al 11 (incluye filas ocultas manualmente) o del 101 al 111 (excluye filas ocultas manualmente)

ref1, ref2...: hasta 254 rangos o referencias

Tabla completa de códigos:

| Incluye ocultas | Excluye ocultas | Función equivalente |
| --- | --- | --- |
| 1 | 101 | PROMEDIO |
| 2 | 102 | CONTAR |
| 3 | 103 | CONTARA |
| 4 | 104 | MAX |
| 5 | 105 | MIN |
| 6 | 106 | PRODUCTO |
| 7 | 107 | DESVEST (muestra) |
| 8 | 108 | DESVESTP (población) |
| 9 | 109 | SUMA |
| 10 | 110 | VAR (muestra) |
| 11 | 111 | VARP (población) |
Notas importantes:

Las filas filtradas (por Autofiltro) se excluyen siempre, independientemente del código usado (1-11 o 101-111)

El código 3 / 103 equivale a CONTARA (cuenta celdas no vacías); el código 2 / 102 equivale a CONTAR (cuenta solo celdas con números)

Solo está diseñada para rangos verticales (columnas); no para rangos horizontales

Los subtotales anidados dentro de los rangos referenciados se ignoran para evitar el doble recuento

### Texto en columnas

Datos > Herramientas de datos > Texto en columnas

Divide el contenido de una celda o columna en varias columnas. Útil cuando se importan datos externos (CSV, TXT) que llegan en una sola columna.

Dos tipos de datos:

| Tipo | Descripción |
| --- | --- |
| Delimitado | Los campos están separados por un carácter especial (tabulación, punto y coma, coma, espacio u otro carácter personalizado). Es el más habitual con datos exportados de bases de datos o CSV. |
| De ancho fijo | Cada campo ocupa un número fijo de caracteres. Se definen líneas de separación manualmente. |
Tipos de delimitadores (cuando se elige Delimitado):

Tabulación

Punto y coma

Coma

Espacio

Otro (cualquier carácter personalizado)

Paso 3 del asistente — Formato de los datos por columna: permite especificar el tipo de dato de cada columna resultante: General (Excel decide), Texto, Fecha (con formato DMY, MDY, YMD, etc.) o No importar columna (omitir).

Usos habituales:

Separar nombre y apellidos que llegan en una sola celda

Dividir una columna de fechas en día, mes y año

Importar ficheros CSV con separadores no estándar

### Quitar duplicados

Datos > Herramientas de datos > Quitar duplicados

Elimina filas duplicadas de un rango o tabla, dejando solo la primera aparición de cada combinación de valores.

Cómo funciona:

Muestra un cuadro de diálogo con todas las columnas del rango

El usuario selecciona qué columnas se comparan para determinar si una fila es duplicada

Dos filas se consideran duplicadas solo si tienen el mismo valor en todas las columnas marcadas

Se elimina la fila duplicada y se conserva la primera aparición

Comportamiento:

La comparación no distingue entre mayúsculas y minúsculas (Excel trata "Madrid" y "madrid" como iguales)

Los valores se comparan por lo que aparece en la celda (su apariencia formateada), no por el valor subyacente almacenado

Excel muestra un resumen indicando cuántas filas duplicadas se eliminaron y cuántas únicas quedan

La operación se puede deshacer con Deshacer (Ctrl+Z); aun así, conviene copiar antes el rango original a otra hoja o libro

Diferencia con Filtro avanzado (solo únicos): Quitar duplicados elimina permanentemente las filas; el Filtro avanzado con la opción "Solo registros únicos" solo oculta los duplicados sin eliminarlos.

### Agrupar y crear esquemas

Datos > Esquema > Agrupar / Desagrupar / Autoesquema

Permite crear una estructura jerárquica (esquema) de filas o columnas para mostrar u ocultar niveles de detalle con los botones +/− y los botones de nivel numérico (1, 2, 3...).

Agrupación manual:

Seleccionar las filas o columnas a agrupar

Datos > Esquema > Agrupar

Aparecen los botones +/− en el margen y los botones de nivel en la esquina

Autoesquema:

Datos > Esquema > Agrupar > Autoesquema

Excel detecta automáticamente la estructura basándose en las fórmulas de resumen (totales, subtotales)

Solo funciona bien si la hoja tiene fórmulas que resumen rangos adyacentes

Características:

Máximo 8 niveles de agrupación

Los botones numéricos (1, 2, 3...) muestran solo hasta ese nivel de detalle

Los botones +/− expanden o contraen un grupo concreto

Se puede agrupar tanto filas como columnas

Eliminar grupos: Datos > Esquema > Desagrupar > Borrar esquema (elimina todos los grupos).

### Auditoría de fórmulas

Fórmulas > grupo Auditoría de fórmulas

Conjunto de herramientas para rastrear relaciones entre celdas y fórmulas, localizar errores y comprender el flujo de cálculo.

#### Rastrear precedentes

Muestra flechas azules desde las celdas que alimentan a la celda seleccionada (las celdas de las que depende la fórmula activa). Cada clic adicional añade un nivel más de precedentes.

#### Rastrear dependientes

Muestra flechas azules hacia las celdas que dependen de la celda seleccionada (fórmulas que la usan como entrada).

#### Quitar flechas

Elimina las flechas de rastreo: todas, solo de precedentes o solo de dependientes.

#### Comprobación de errores

Recorre todas las celdas con error en la hoja activa y ofrece opciones para cada una: ver el origen del error, ignorarlo, editar la fórmula, etc. Es la herramienta adecuada cuando se quiere revisar todas las fórmulas que contienen un error en la hoja.

#### Evaluar fórmula

Ejecuta la fórmula de la celda seleccionada paso a paso, mostrando el valor de cada parte intermedia. Útil para depurar fórmulas complejas o anidadas, como =SI(PROMEDIO(F2:F5)>50;SUMA(G2:G5);0).

#### Ventana Inspección

Muestra en un panel flotante los valores y fórmulas de celdas seleccionadas, aunque no estén visibles en la pantalla (por ejemplo, en otra hoja). Permite supervisar celdas críticas mientras se trabaja en otras partes del libro sin necesidad de desplazarse hasta ellas.

### Análisis rápido

Se activa al seleccionar un rango de celdas con datos (aparece el icono en la esquina inferior derecha de la selección). También con Ctrl+Q.

Categorías disponibles:

| Categoría | Qué ofrece |
| --- | --- |
| Formato | Formato condicional (barras de datos, escalas de color, iconos) |
| Gráficos | Tipos de gráfico recomendados para los datos seleccionados |
| Totales | Fórmulas de resumen: Suma, Promedio, Recuento, % del total, Total acumulado (por filas y columnas) |
| Tablas | Crear tabla de Excel o tabla dinámica |
| Minigráficos | Insertar minigráficos de línea, columna o pérdidas y ganancias |
Nota sobre la categoría Totales: incluye Suma, Promedio, Recuento, % del total y Total acumulado. No incluye Máximo, Mínimo ni Producto.

### Administrador de nombres

Fórmulas > grupo Nombres definidos > Administrador de nombres

Gestiona todos los rangos con nombre del libro: crear, editar, eliminar y filtrar por ámbito. El ámbito puede ser el libro completo o una hoja individual, lo que permite usar el mismo nombre en hojas distintas sin conflicto.

### Power Pivot

Complemento que permite combinar grandes volúmenes de datos de diversos orígenes (bases de datos relacionales, tablas de Excel, feeds web, archivos de texto) en un modelo de datos unificado dentro de Excel, habilitando el análisis con millones de filas y la creación de relaciones entre tablas sin necesidad de fórmulas BUSCARV.

