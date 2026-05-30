function buscarPokemon() {
  const nome = document.getElementById('nome').value.toLowerCase().trim();

  // Limpa tudo antes de uma nova busca
  document.getElementById('nome-exibido').textContent = '';
  document.getElementById('altura').textContent       = '';
  document.getElementById('peso').textContent         = '';
  document.getElementById('exp').textContent          = '';
  document.getElementById('numero').textContent       = '';
  document.getElementById('tipos').innerHTML          = '';
  document.getElementById('sprite').src               = '';
  document.getElementById('erro').textContent         = '';
  document.getElementById('resultado').classList.remove('visivel');

  if (!nome) {
    document.getElementById('erro').textContent = 'Digite o nome de um Pokemon!';
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokemon nao encontrado!');
      }
      return response.json();
    })
    .then(data => {
      const tiposHTML = data.types
        .map(t => `<span class="tipo tipo-${t.type.name}">${t.type.name}</span>`)
        .join('');

      document.getElementById('sprite').src               = data.sprites.front_default;
      document.getElementById('nome-exibido').textContent = data.name;
      document.getElementById('tipos').innerHTML          = tiposHTML;
      document.getElementById('altura').textContent       = data.height / 10 + ' m';
      document.getElementById('peso').textContent         = data.weight / 10 + ' kg';
      document.getElementById('exp').textContent          = data.base_experience + ' pts';
      document.getElementById('numero').textContent       = '#' + String(data.id).padStart(3, '0');

      document.getElementById('resultado').classList.add('visivel');
    })
    .catch(erro => {
      document.getElementById('erro').textContent = erro.message;
    });
}