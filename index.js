const poke_container = document.querySelector('#poke_container')
const pokemons_number = 150;

const colors = {
	fire : '#fddfdf',
	grass : '#defde0',
	electric : '#fcf7de',
	water : '#def3fd',
	ground : '#f4e7da',
	rock : '#d5d5d4',
	fairy : '#fceaff',
	poison : '#98d7a5',
	bug : '#f8d5a3',
	dragon : '#97b3e6',
	psychic : '#eaeda1',
	flying : '#f5f5f5',
	fighting : '#e6e0d4',
	normal : '#f5f5f5'
}

const main_types = Object.keys(colors)
// console.log(main_types)

const fetchAllPokemons = async ()=>{
	for(let i=1; i<=pokemons_number; i++){
		await getPokemon(i)
	}
}

const getPokemon = async id =>{
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const res = await fetch(url)
	const pokemon = await res.json()
	createPokemonCard(pokemon)
}

function createPokemonCard(pokemon){
	const pokemonElement = document.createElement('div')
	pokemonElement.classList.add('pokemon')

	const poke_types = pokemon.types.map((item)=> item.type.name)
	const type = main_types.find(type => poke_types.indexOf(type)>-1)
	const name = pokemon.name[0].toUpperCase()+pokemon.name.slice(1)

	const color = colors[type]

	pokemonElement.style.backgroundColor = color;

	const pokeInnerHtml=`
		<div class="img-container">
			<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
		</div>
		<div class="info">
			<span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
			<h3 class="name">${name}</h3>
			<small class="type">Type:</small>${type}
		</div>
	`
	pokemonElement.innerHTML = pokeInnerHtml
	poke_container.appendChild(pokemonElement)
}

fetchAllPokemons()