let adminAgeTopicNumber = 0;
window.adminAgeBlocks = [
  { name: 'I · Organización del Estado y de la Administración pública', topics: [
    ['Constitución Española de 1978', 'Estructura y contenido; derechos y deberes fundamentales, garantías y suspensión; Tribunal Constitucional; Defensor del Pueblo; reforma constitucional.'],
    ['La Jefatura del Estado. La Corona', 'Funciones constitucionales del Rey; sucesión y regencia.'],
    ['Las Cortes Generales', 'Composición, atribuciones y funcionamiento del Congreso de los Diputados y del Senado.'],
    ['El Poder Judicial', 'Consejo General del Poder Judicial; Tribunal Supremo; organización judicial española.'],
    ['El Gobierno y la Administración', 'Presidencia del Gobierno; Consejo de Ministros; designación, cese y responsabilidad; funciones del Gobierno y relaciones con las Cortes Generales.'],
    ['Gobierno Abierto y Agenda 2030', 'Concepto y principios del Gobierno Abierto; Agenda 2030 y Objetivos de Desarrollo Sostenible.'],
    ['Transparencia y buen gobierno', 'Ley 19/2013: transparencia de la actividad pública, acceso a la información y buen gobierno.'],
    ['Administración General del Estado', 'Órganos centrales, superiores y directivos; organización territorial; Administración del Estado en el exterior.'],
    ['Organización territorial del Estado', 'Comunidades Autónomas; constitución y distribución de competencias; Estatutos de Autonomía.'],
    ['Administración local', 'Entidades locales; provincia, municipio e isla.'],
    ['Unión Europea', 'Consejo Europeo, Consejo, Parlamento Europeo, Comisión y Tribunal de Justicia; efectos de la integración europea en la organización del Estado español.']
  ]},
  { name: 'II · Organización de oficinas públicas', topics: [
    ['Atención al público', 'Atención a personas con discapacidad; servicios de información administrativa; información general y particular; iniciativas, reclamaciones, quejas y peticiones.'],
    ['Documentos, registros y archivos', 'Concepto y funciones; clases de archivo y criterios de ordenación.'],
    ['Administración electrónica y servicios a la ciudadanía', 'Páginas web públicas y servicios telemáticos; oficinas integradas; Ventanilla Única Empresarial; Punto de Acceso General de la AGE.'],
    ['Protección de datos personales', 'Principios y derechos; responsable y encargado del tratamiento; delegado y autoridades de protección de datos; derechos digitales.']
  ]},
  { name: 'III · Derecho administrativo general', topics: [
    ['Fuentes del derecho administrativo', 'Jerarquía de fuentes; ley; decretos-leyes y decretos legislativos; concepto, clases y límites del reglamento; otras fuentes.'],
    ['El acto administrativo', 'Concepto, clases y elementos; eficacia y validez; motivación y notificación.'],
    ['Procedimiento administrativo y régimen jurídico', 'Leyes 39/2015 y 40/2015; iniciación, ordenación, instrucción y terminación; revisión de oficio y recursos administrativos; jurisdicción contencioso-administrativa, actividad impugnable, partes, capacidad, legitimación, representación y defensa.'],
    ['Contratos del sector público', 'Concepto y clases; preparación, adjudicación, efectos, cumplimiento y extinción; revisión de precios y otras modificaciones; invalidez y recursos.'],
    ['Actividad administrativa', 'Actividad de limitación, arbitral, de servicio público y de fomento; formas de gestión de los servicios públicos.'],
    ['Responsabilidad patrimonial', 'Concepto y clases de responsabilidad patrimonial de las Administraciones públicas; requisitos generales y efectos.'],
    ['Igualdad, diversidad y protección social', 'Políticas de igualdad y contra la violencia de género; igualdad de trato y no discriminación de personas LGTBI; discapacidad y dependencia.']
  ]},
  { name: 'IV · Gestión de personal', topics: [
    ['Personal al servicio de las Administraciones públicas', 'Concepto y clases; Estatuto Básico del Empleado Público y normativa aplicable; competencias en materia de personal; Registro Central de Personal.'],
    ['Selección y acceso al empleo público', 'Procesos selectivos y su relación con la Oferta de Empleo Público; principios constitucionales; acceso y provisión de puestos para personas con discapacidad.'],
    ['Personal funcionario', 'Funcionarios de carrera e interinos; selección de funcionarios.'],
    ['Adquisición, pérdida y situaciones administrativas', 'Adquisición y pérdida de la condición de funcionario; situaciones administrativas, supuestos y efectos.'],
    ['Provisión, derechos y carrera', 'Provisión de puestos; deberes y derechos; carrera administrativa y promoción interna.'],
    ['Incompatibilidades y régimen disciplinario', 'Incompatibilidades; faltas, sanciones y procedimiento disciplinario.'],
    ['Seguridad Social del personal funcionario', 'Régimen de Seguridad Social; MUFACE y clases pasivas.'],
    ['Personal laboral de las Administraciones públicas', 'Selección, derechos, deberes e incompatibilidades; IV Convenio colectivo único de la AGE: ámbito de aplicación y clasificación.'],
    ['Seguridad Social del personal laboral', 'Acción protectora; tipos y características de las prestaciones.']
  ]},
  { name: 'V · Gestión financiera', topics: [
    ['El presupuesto público', 'Concepto y principios presupuestarios; ciclo presupuestario; presupuesto por programas, concepto y fases; terminología y desarrollo del proceso.'],
    ['Presupuesto del Estado', 'Concepto y estructura; clasificación de créditos; gastos plurianuales; modificaciones presupuestarias: créditos extraordinarios, suplementos, ampliaciones, generaciones, transferencias e incorporaciones; anticipos de tesorería.'],
    ['Ejecución y control del gasto', 'Procedimiento administrativo de ejecución; órganos, fases y documentos contables; compromisos plurianuales; ordenación y realización del pago; perceptores; control del gasto, legalidad y Tribunal de Cuentas.'],
    ['Retribuciones y nóminas', 'Retribuciones e indemnizaciones; estructura y confección de nóminas; altas y bajas; sueldos, trienios, pagas extraordinarias y complementos; devengo, liquidación y pago.'],
    ['Gastos, pagos y anticipos', 'Compras e inversiones; transferencias corrientes y de capital; pagos y obligaciones presupuestarias; anticipos de caja fija; pagos a justificar y justificación de libramientos.'],
    ['Gestión financiera de contratos y subvenciones', 'Gestión económica y financiera de los contratos del sector público y de las subvenciones.']
  ]},
  { name: 'VI · Informática básica y ofimática', topics: [
    ['Informática básica y seguridad', 'Conceptos de hardware y software; almacenamiento de datos; sistemas operativos; nociones básicas de seguridad de la información.'],
    ['Sistema operativo Windows', 'Fundamentos y entorno gráfico; ventanas, iconos, menús contextuales y cuadros de diálogo; escritorio y elementos; menú Inicio.'],
    ['Explorador de Windows', 'Gestión de carpetas y archivos; búsquedas; Este equipo y Acceso rápido; accesorios y herramientas del sistema.'],
    ['Word 365', 'Funciones y utilidades; creación y estructura de documentos; gestión, guardado, recuperación e impresión de archivos; personalización del entorno.'],
    ['Excel 365', 'Libros, hojas y celdas; configuración; introducción y edición de datos; fórmulas, funciones, gráficos, gestión de datos y personalización.'],
    ['Access 365', 'Funciones y utilidades; tablas, consultas, formularios, informes y relaciones.'],
    ['Outlook 365, Teams y OneDrive', 'Correo electrónico: crear, enviar, recibir, responder y reenviar; reglas y libreta de direcciones; entorno colaborativo Microsoft Teams y OneDrive.'],
    ['Internet e inteligencia artificial', 'Funciones básicas de los navegadores web; asistentes de IA en el puesto de trabajo, uso responsable y riesgos.']
  ]}
].map((block, blockIndex) => ({
  ...block,
  topics: block.topics.map(([title, scope], index) => ({
    n: ++adminAgeTopicNumber,
    block: block.name,
    title,
    scope
  }))
}));
