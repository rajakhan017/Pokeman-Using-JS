// Magic begins here! 🌟
const pokeTypeURL = 'https://pokeapi.co/api/v2/type/';
const pokeQueryParams = new URLSearchParams(window.location.search);
// Unleash the power of Pokémon types! 🚀
const typeParams = new URLSearchParams(window.location.search);
const typeSearch = typeParams.get('type');
// Summoning the Poké-gateway! 🌐
const pokedex = document.getElementById('pokedex');
const pokemonSearchForm = document.querySelector('#pokemon-search-form');
const pokemonTypeFilter = document.querySelector('.type-filter');
// Assemble the Pokémon squad! 🤖
let pokemonArray = [];
let uniqueTypes = new Set();
// Fetching Pokémon from the digital wilderness! 🕹️
const fetchPokemon = () => {
   const promises = [];
   for (let i = 1; i <= 151; i++) {
       const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
       console.log(`Casting the Pokéball: ${pokemonURL}`);
       promises.push(fetch(pokemonURL).then(response => response.json()));
   }
   // Pokémon evolution in progress! 🌈
   Promise.all(promises)
       .then(allPokemon => {
           const firstGenPokemon = allPokemon.map(pokemon => ({
               // Pokémon metamorphosis!
               frontImage: pokemon.sprites['front_default'],
               pokemon_id: pokemon.id,
               name: pokemon.name,
               type: pokemon.types[0].type.name,
               abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
               description: pokemon.species.url,
           }));
           pokemonArray = firstGenPokemon;
           // Pokémon world awakening! 🌍
           console.log('Pokémon discovered:', firstGenPokemon);
           createPokemonCards(firstGenPokemon);
       })
       .then(generateTypes);
};
// Invoking the Poké-fetch spell! 🧙
fetchPokemon();
// Magic words: "Listen to the whispers of Pokémon!" 🗣️
pokemonSearchForm.addEventListener('input', (event) => {
   // Secret incantation for filtering Pokémon! 🔍
   const filterPokemon = pokemonArray.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase()));
   clearPokedex();
   createPokemonCards(filterPokemon);
});
// Clear the Pokedex with a magical sweep! 🌪️
function clearPokedex() {
   let section = document.querySelector('#pokedex');
   section.innerHTML = '';
}
// The summoning circle for Pokémon cards! 🌀
function createPokemonCards(pokemons) {
   let currentPokemon = pokemons;
   if (typeSearch) {
       // Type-filtered Pokémon enchantment! ✨
       currentPokemon = pokemons.filter(pokemon => pokemon.type.includes(typeSearch.toLowerCase()));
   }
   currentPokemon.forEach(pokemon => {
       // Pokémon card crafting ritual! 🎨
       createPokemonCard(pokemon);
   });
}
// Crafting the sacred Pokémon card! 🃏
function createPokemonCard(pokemon) {
   // Total Number of card: A magical portal for Pokémon! 🚪
   const flipCard = document.createElement("div");
   flipCard.classList.add("flip-card");
flipCard.id = `${pokemon.name}`;
   pokedex.append(flipCard);
   // Front & back container: The mystical realm of Pokémon! 🌌
   const flipCardInner = document.createElement("div");
   flipCardInner.classList.add("flip-card-inner");
    flipCardInner.id = `${pokemon.type}`;
   flipCard.append(flipCardInner);
   // Front of card: The face of Pokémon magic! 😮
   const frontCard = document.createElement("div");
   frontCard.classList.add('front-pokemon-card');
   const frontImage = document.createElement('img');
   frontImage.src = `${pokemon.frontImage}`;
   frontImage.classList.add("front-pokemon-image");
   const frontPokeName = document.createElement('h2');
   frontPokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`;
   const frontPokeID = document.createElement('p');
   frontPokeID.textContent = `#${pokemon.pokemon_id}`;
   frontPokeID.classList.add("front-poke-id");
   const frontDescription = document.createElement("p");
   const frontPokeType = document.createElement('p');
   frontPokeType.textContent = `${pokemon.type.toUpperCase()}`;
   frontPokeType.classList.add("front-pokemon-type");
   frontCard.append(frontImage, frontPokeID, frontPokeName, frontDescription, frontPokeType);
   // Back of card: Revealing the mystical details! 🧙‍♂️
   const backCard = document.createElement("div");
   
   backCard.classList.add('back-pokemon-card');
   const backImage = document.createElement('img');
   backImage.src = `${pokemon.backImage}`; // Back image nhi aa rha hai
   const backPokeID = document.createElement('p');
   backPokeID.textContent = `#${pokemon.pokemon_id}`;
   backPokeID.classList.add("back-poke-id");
   const backPokeName = document.createElement('h2');
   backPokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`;
   backPokeName.classList.add("back-pokemon-name");
   const backPokeAbilities = document.createElement("p");
   backPokeAbilities.innerHTML = `<p>Abilities:<br>${pokemon.abilities}<p>`;
   backPokeAbilities.classList.add("back-pokemon-abilities");
   backCard.append(backImage, backPokeID, backPokeName, backPokeAbilities);
   flipCardInner.append(frontCard, backCard);
   // Pokémon type collection: Adding to the magical archive! 📚
   uniqueTypes.add(pokemon.type);
}
// Summoning the Pokémon types for filtering! 🌈
function generateTypes() {
   uniqueTypes.forEach(type => {
       const typeOption = document.createElement('option');
       typeOption.textContent = type.charAt(0).toUpperCase() + type.slice(1);
       // The magical dropdown of Pokémon types! 🎭
       typeOption.value = type;
       pokemonTypeFilter.append(typeOption);
   });
}
// The grand finale: The Pokémon magic circle is complete! 🎉