const items = document.querySelectorAll('.item');
const dropzones = document.querySelectorAll('.dropzone');
const checkButton = document.getElementById('checkButton');
const resultDiv = document.getElementById('result');
const descriptionDiv = document.getElementById('description');
const layerDefinitionDiv = document.getElementById('layerDefinition');

// Funciones para drag & drop
items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('click', showDescription); // Muestra la descripción al hacer clic
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', dropItem);
  zone.addEventListener('dragenter', dragEnter);
  zone.addEventListener('dragleave', dragLeave);
  zone.addEventListener('click', showLayerDefinition); // Muestra la definición al hacer clic
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => e.target.classList.add('hidden'), 0);
}

function dragOver(e) {
  e.preventDefault();
}

function dropItem(e) {
  const id = e.dataTransfer.getData('text');
  const item = document.getElementById(id);
  e.target.appendChild(item);
  item.classList.remove('hidden');
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('hover');
}

function dragLeave(e) {
  e.target.classList.remove('hover');
}

// Mostrar descripción al hacer clic en un ítem
function showDescription(e) {
  const description = e.target.getAttribute('data-description');
  descriptionDiv.textContent = description;
}

// Mostrar definición al hacer clic en una capa embrionaria
function showLayerDefinition(e) {
  const layer = e.currentTarget.getAttribute('data-type');
  let definition = '';

  switch (layer) {
    case 'endodermo':
      definition = 'El endodermo es la capa más interna del embrión. Da origen a órganos como los pulmones, el hígado, y el sistema digestivo.';
      break;
    case 'mesodermo':
      definition = 'El mesodermo es la capa intermedia del embrión. Da origen a los músculos, huesos, sistema circulatorio y órganos como el corazón y los riñones.';
      break;
    case 'ectodermo':
      definition = 'El ectodermo es la capa más externa del embrión. Forma estructuras como la piel, el sistema nervioso y el cabello.';
      break;
  }

  layerDefinitionDiv.textContent = definition;
}

// Validar si los ítems están en la zona correcta
checkButton.addEventListener('click', () => {
  let correct = true;
  dropzones.forEach(zone => {
    const expectedType = zone.getAttribute('data-type');
    const itemsInZone = zone.querySelectorAll('.item');
    
    itemsInZone.forEach(item => {
      const itemType = item.getAttribute('data-type');
      if (itemType !== expectedType) {
        correct = false;
      }
    });
  });

  if (correct) {
    resultDiv.textContent = "¡Correcto! Todas las partes están en el tejido embrionario correcto.";
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = "Algunas partes están incorrectas. Intenta de nuevo.";
    resultDiv.style.color = "red";
  }
});

  
