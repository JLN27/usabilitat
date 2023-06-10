const audioPlayerJesus = document.getElementById('audioPlayerJesus'); // Obtiene el elemento de audio con el ID "audioPlayerJesus"

const jesusImage = document.querySelector('.jesus'); // Obtiene el elemento con la clase "jesus"
jesusImage.addEventListener('mouseover', () => { // Agrega un evento al pasar el ratón por encima de la imagen de "Jesus"
  if (audioPlayerJesus.paused) { // Verifica si el reproductor de audio de "Jesus" está en pausa
    audioPlayerJesus.play(); // Reproduce el audio de "Jesus" si está en pausa
  } else {
    audioPlayerJesus.play(); // Reproduce el audio de "Jesus" si ya se estaba reproduciendo
  }
});

jesusImage.addEventListener('mouseout', () => { // Agrega un evento al quitar el ratón de la imagen de "Jesus"
  audioPlayerJesus.pause(); // Pausa la reproducción del audio de "Jesus"
});


const audioPlayerArnau = document.getElementById('audioPlayerArnau'); // Obtiene el elemento de audio con el ID "audioPlayerArnau"

const arnauImage = document.querySelector('.arnau'); // Obtiene el elemento con la clase "arnau"
arnauImage.addEventListener('mouseover', () => { // Agrega un evento al pasar el ratón por encima de la imagen de "Arnau"
  if (audioPlayerArnau.paused) { // Verifica si el reproductor de audio de "Arnau" está en pausa
    audioPlayerArnau.play(); // Reproduce el audio de "Arnau" si está en pausa
  } else {
    audioPlayerArnau.play(); // Reproduce el audio de "Arnau" si ya se estaba reproduciendo
  }
});

arnauImage.addEventListener('mouseout', () => { // Agrega un evento al quitar el ratón de la imagen de "Arnau"
  audioPlayerArnau.pause(); // Pausa la reproducción del audio de "Arnau"
});


let dragSrcElement = null;

function handleDragStart(e) { // Función para manejar el inicio del arrastre de un elemento
  dragSrcElement = this; // Almacena el elemento arrastrado
  e.dataTransfer.effectAllowed = 'move'; // Establece el efecto permitido para el arrastre
  e.dataTransfer.setData('text/html', this.innerHTML); // Establece los datos que se transfieren durante el arrastre
}

function handleDragOver(e) { // Función para manejar el arrastre sobre un elemento
  e.preventDefault(); // Evita el comportamiento predeterminado del arrastre
  e.dataTransfer.dropEffect = 'move'; // Establece el efecto de soltar permitido
}

function handleDrop(e) { // Función para manejar el soltar un elemento arrastrado
  e.stopPropagation(); // Detiene la propagación del evento
  if (dragSrcElement !== this) { // Verifica si el elemento arrastrado es diferente al elemento de destino
    [dragSrcElement.innerHTML, this.innerHTML] = [this.innerHTML, dragSrcElement.innerHTML]; // Intercambia el contenido HTML entre los elementos arrastrado y de destino
  }
}

function handleDragEnd() { // Función para manejar el final del arrastre
  this.classList.remove('over'); // Elimina la clase 'over' del elemento
}

const teamMembers = document.querySelectorAll('.team-member'); // Obtiene todos los elementos con la clase "team-member"
teamMembers.forEach(member => {
  member.addEventListener('dragstart', handleDragStart); // Agrega un evento al iniciar el arrastre de un miembro del equipo
  member.addEventListener('dragover', handleDragOver); // Agrega un evento al arrastrar sobre un miembro del equipo
  member.addEventListener('drop', handleDrop); // Agrega un evento al soltar un miembro del equipo
  member.addEventListener('dragend', handleDragEnd); // Agrega un evento al finalizar el arrastre de un miembro del equipo
});
