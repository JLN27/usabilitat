// Crear mapa y establecer la vista inicial
var map = new ol.Map({
  target: 'map', // ID del elemento HTML donde se renderizará el mapa
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM() // Capa de mapa base utilizando OpenStreetMap
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([1.7280967259979765, 41.23137068827359]), // Centro del mapa en coordenadas [longitud, latitud]
    zoom: 18 // Nivel de zoom inicial
  })
});

// Marcador estático
var staticMarker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([1.7280967259979765, 41.23137068827359])) // Coordenadas del marcador estático
});

staticMarker.setStyle(new ol.style.Style({
  image: new ol.style.Icon({
    src: 'https://openlayers.org/en/latest/examples/data/icon.png' // Icono del marcador estático
  }),
  text: new ol.style.Text({
    text: "Ins Joaquim Mir", // Etiqueta de texto del marcador estático
    offsetY: -25, // Desplazamiento vertical del texto
    fill: new ol.style.Fill({
      color: '#000' // Color del texto
    }),
    backgroundFill: new ol.style.Fill({
      color: '#fff' // Color de fondo del texto
    }),
    padding: [5, 5, 5, 5] // Relleno del texto
  })
}));

var vectorSource = new ol.source.Vector({
  features: [staticMarker] // Fuente de datos vectoriales con el marcador estático
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource // Capa vectorial con la fuente de datos vectoriales
});

map.addLayer(vectorLayer); // Agregar la capa vectorial al mapa

// Obtener ubicación actual
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var dynamicMarker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude])) // Coordenadas de la ubicación actual
    });

    dynamicMarker.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png' // Icono del marcador dinámico
      }),
      text: new ol.style.Text({
        text: "Tu ubicación actual", // Etiqueta de texto del marcador dinámico
        offsetY: -25, // Desplazamiento vertical del texto
        fill: new ol.style.Fill({
          color: '#000' // Color del texto
        }),
        backgroundFill: new ol.style.Fill({
          color: '#fff' // Color de fondo del texto
        }),
        padding: [5, 5, 5, 5] // Relleno del texto
      })
    }));

    vectorSource.addFeature(dynamicMarker); // Agregar el marcador dinámico a la fuente de datos vectoriales
  });
}

// Combinación de teclas Ctrl + d
key('ctrl+d', function() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentCoords = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
      var message = "Tus coordenadas actuales son:\nLatitud: " + position.coords.latitude + "\nLongitud: " + position.coords.longitude;
      alert(message);
    });
  } else {
    alert("Geolocalización no está disponible en este navegador.");
  }
});

// Combinación de teclas Ctrl + f
key('ctrl+f', function() {
  var coordenadasInstituto = ol.proj.fromLonLat([1.7280967259979765, 41.23137068827359]); // Coordenadas del instituto
  map.getView().setCenter(coordenadasInstituto); // Establecer el centro del mapa en las coordenadas del instituto
});


// Comprova si el navegador és compatible amb la reconeixença de veu
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  // Crea un objecte de reconeixença de veu
  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Configura les opcions de la reconeixença de veu
  recognition.continuous = true; // Per a una reconeixença de veu contínua
  recognition.lang = 'es-ES'; // Estableix l'idioma de reconeixença de veu (canvia-ho segons el teu idioma)

  // Quan es detecta un resultat de reconeixença de veu
  recognition.onresult = function(event) {
    var result = event.results[event.resultIndex];
    var transcript = result[0].transcript.toLowerCase(); // Obté el text reconegut i converteix-lo a minúscules

    // Comprova les paraules clau i executa l'acció corresponent
    if (transcript.includes('baixar')) {
      // Acció per baixar per la pàgina web
      window.scrollBy(0, 100); // Modifica els valors segons la quantitat que vulguis baixar
    } else if (transcript.includes('pujar')) {
      // Acció per pujar per la pàgina web
      window.scrollBy(0, -100); // Modifica els valors segons la quantitat que vulguis pujar
    } else if (transcript.includes('ampliar')) {
      // Acció per ampliar la mida de la pàgina web
      document.body.style.zoom = '150%'; // Modifica el valor del zoom segons el que vulguis
    } else if (transcript.includes('reduir')) {
      // Acció per reduir la mida de la pàgina web
      document.body.style.zoom = '75%'; // Modifica el valor del zoom segons el que vulguis
    } else if (transcript.includes('restaurar tot')) {
      // Acció per restaurar tot a la configuració inicial
      window.scrollTo(0, 0); // Torna a l'inici de la pàgina
      document.body.style.zoom = '100%'; // Restableix el zoom al 100%
    }
  };

  // Quan es fa clic al botó d'iniciar reconeixença de veu
  document.getElementById('start-listening').addEventListener('click', function() {
    // Inicia la reconeixença de veu
    recognition.start();
  });
} else {
  console.log('La reconeixença de veu no és compatible amb aquest navegador.');
}


// Funció per escoltar el text d'un element
function speakText(element) {
  var text = element.innerText;
  var utterance = new SpeechSynthesisUtterance(text);

  // Inicia la síntesi de veu
  window.speechSynthesis.speak(utterance);
}

// Funció per escoltar el text d'un element i els seus elements fills
function speakTextWithChildren(element) {
  var text = element.innerText;
  var elementsWithText = element.getElementsByTagName('*');
  for (var i = 0; i < elementsWithText.length; i++) {
    text += ' ' + elementsWithText[i].innerText;
  }
  var utterance = new SpeechSynthesisUtterance(text);

  // Inicia la síntesi de veu
  window.speechSynthesis.speak(utterance);
}

// Quan es fa clic a un element
function handleClick(event) {
  var element = event.target;

  // Comprova si és un clic normal o un doble clic
  if (event.detail === 1) {
    speakText(element);
  } else if (event.detail === 2) {
    speakTextWithChildren(element);
  }
}

// Afegir el gestor d'esdeveniments als elements de la pàgina web
var elements = document.querySelectorAll('[onclick],[ondblclick]');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handleClick);
}


// Quan es prem la drecera de teclat
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.altKey && event.key === 'p') {
    speakAllText();
  }
});

// Funció per escoltar tot el text de la pàgina web
function speakAllText() {
  var text = document.body.innerText;
  var utterance = new SpeechSynthesisUtterance(text);

  // Inicia la síntesi de veu
  window.speechSynthesis.speak(utterance);
}
