function buscarPokemon() {
  const input = document.getElementById("pokemonInput").value.toLowerCase().trim();
  if (!input) {
    document.getElementById("resultado").innerHTML = `<p class="text-danger">Si no ingresas Algo No funca Wacho.</p>`;
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Ese Pokémon no existe todavia br@");
      return response.json();
    })
    .then(data => {
      const nombre = data.name;
      const imagen = data.sprites.front_default;

      // Si no hay imagen
      if (!imagen) {
        document.getElementById("resultado").innerHTML = `<p class="text-danger">No hay imagen disponible para este Pokémon.</p>`;
        return;
      }

      const stats = data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("");

      document.getElementById("resultado").innerHTML = `
        <h2>${nombre.toUpperCase()}</h2>
        <img src="${imagen}" alt="${nombre}" />
        <ul style="list-style: none; padding-left: 0;">${stats}</ul>
      `;
    })
    .catch(error => {
      document.getElementById("resultado").innerHTML = `<p class="text-danger">${error.message}</p>`;
    });
}

