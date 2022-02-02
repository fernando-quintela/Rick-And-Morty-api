// crear las referencia
const rowCards = document.querySelector('#rowCards');
const formData = document.querySelector('#formData');

// inicio de las peticiones al api
const getCharacters = async () => {
try {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return data;
} catch (error) {
  console.log(error);
}
};

const getCharacterForName = async(nameCharacter) => {
try {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nameCharacter}`);
  const data = await response.json();
  return data;
} catch (error) {
  throw error;
}
}

const cleanRow = () => {
  rowCards.innerHTML = '';
}

const init = async () => {
  const characters = await getCharacters();
  // console.log(characters.results); //aqui ya estan en el 
  createCards(characters.results);
}
init();


/*  fin de las peticiones  */


// crear la targetas de boostrap (card)

cardCharacter = (character) => {
  // creamos los elemntos html
  const cardBoostrap = document.createElement('div');
  const imgCard = document.createElement('img');
  const cardBody = document.createElement('div');
  const titleCharacter = document.createElement('h5');
  const btnByIdcharacter = document.createElement('a');

  //texto de los elementos
  const nameCharacter = document.createTextNode(character.name);
  const textButtonCharacter = document.createTextNode('ir al personaje');

// añadir sus clases
cardBoostrap.classList.add('card', 'mt-4');
imgCard.classList.add('card-img-top', 'mt-2');
cardBody.classList.add('card-body');
titleCharacter.classList.add('card-title', 'text-center');
btnByIdcharacter.classList.add('btn','btn-secondary', 'mb-2');

// añadir href
{/* <a class="btn btn-secondary" href=""></a> */}
 btnByIdcharacter.href=`pesrsonajes.html?id=${character.id}`;

// console.log(character.image);
titleCharacter.appendChild(nameCharacter);
btnByIdcharacter.appendChild(textButtonCharacter);
imgCard.src=character.image;

// el renderizado 
cardBoostrap.append(imgCard, cardBody, btnByIdcharacter);
cardBody.append(titleCharacter);
rowCards.append(cardBoostrap);

}
//creacion de card
createCards = (characters) => {
  console.log(characters);
  characters.map(element =>cardCharacter(element));
}


// llamar al formulario
// event implicito
formData.addEventListener('submit', handleSubmit );

function handleSubmit(event) {
  event.preventDefault();
  // console.log(this);
  const form = new FormData(this);
  cleanRow();
  // console.log(form.get('character'));
  getCharacterForName(form.get('character')).then( data => createCards(data.results)).catch(err => console.log(err))

}









{/* <div class="card" style="width: 18rem;">
<img src="..." class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
 
</div>
<a href="#" class="btn btn-primary">Go somewhere</a>
</div> */}