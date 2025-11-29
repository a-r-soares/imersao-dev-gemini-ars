document.addEventListener("DOMContentLoaded", () => {
  const temaSelect = document.getElementById("tema-select");
  const campoBusca = document.getElementById("campo-busca");
  const botaoBusca = document.getElementById("botao-busca");
  const cardContainer = document.getElementById("card-container");
  const mensagemNaoEncontrado = document.getElementById(
    "mensagem-nao-encontrado"
  );
  const themeToggle = document.getElementById("theme-toggle");
  const anoAtualSpan = document.getElementById("ano-atual");

  const dataUrls = {
    info: "data_info.json",
    espo: "data_espo.json",
    dive: "data_dive.json",
  };

  let currentData = [];

  // --- LÓGICA DE TEMA ---
  // Verifica o tema salvo no localStorage ou a preferência do sistema
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  const currentTheme = localStorage.getItem("theme");

  // Define o tema claro como padrão se não houver preferência ou se for a preferência do sistema
  if (currentTheme === "light" || (!currentTheme && prefersLight)) {
    document.body.classList.add("light-mode");
    themeToggle.checked = false;
  } else {
    // O padrão (sem classe) já é escuro
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
    let theme = document.body.classList.contains("light-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", theme);
  });

  // --- LÓGICA DE CARREGAMENTO E EXIBIÇÃO DE DADOS ---
  async function carregarDados(tema, exibir = false) {
    try {
      const response = await fetch(dataUrls[tema]);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      currentData = await response.json();
      // Exibe os cards apenas se o parâmetro 'exibir' for verdadeiro
      exibirCards(exibir ? currentData : []);
    } catch (error) {
      console.error("Não foi possível carregar os dados:", error);
      cardContainer.innerHTML =
        "<p>Erro ao carregar conteúdo. Tente novamente mais tarde.</p>";
    }
  }

  function exibirCards(dados, buscaRealizada = false) {
    cardContainer.innerHTML = "";
    mensagemNaoEncontrado.style.display = "none";

    if (dados.length === 0 && buscaRealizada) {
      mensagemNaoEncontrado.style.display = "block";
      return;
    }

    dados.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <h2>${item.titulo}</h2>
                <p class="card-subtitulo">${item.subtitulo || ""}</p>
                <p>${item.descricao}</p>                
                <p>Para saber mais <a href="${
                  item.link
                }" target="_blank">clique neste link.</a></p>
            `;
      cardContainer.appendChild(card);
    });
  }

  // --- LÓGICA DE BUSCA ---
  function realizarBusca() {
    const termoBusca = campoBusca.value.trim().toLowerCase();

    if (termoBusca.length === 0) {
      alert("Por favor, digite algo para realizar a busca.");
      return;
    }

    const resultados = currentData.filter(
      (item) =>
        item.titulo.toLowerCase().includes(termoBusca) ||
        item.descricao.toLowerCase().includes(termoBusca) ||
        (item.subtitulo && item.subtitulo.toLowerCase().includes(termoBusca))
    );

    exibirCards(resultados, true); // Passa true para indicar que uma busca foi feita
  }

  // --- ATUALIZAR ANO NO RODAPÉ ---
  function atualizarAno() {
    if (anoAtualSpan) {
      anoAtualSpan.textContent = new Date().getFullYear();
    }
  }

  // --- EVENT LISTENERS ---
  temaSelect.addEventListener("change", (e) => {
    campoBusca.value = ""; // Limpa o campo de busca ao trocar de tema
    carregarDados(e.target.value, true); // Exibe os cards do novo tema imediatamente
  });

  botaoBusca.addEventListener("click", realizarBusca);

  campoBusca.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      realizarBusca();
    } else {
      // Busca dinâmica a cada caractere digitado (após o primeiro)
      if (campoBusca.value.trim().length >= 1) {
        realizarBusca();
      } else if (campoBusca.value.trim().length === 0) {
        // Repõe todos os cards do tema atual se a busca for limpa
        exibirCards(currentData);
      }
    }
  });

  // --- INICIALIZAÇÃO ---
  carregarDados(temaSelect.value, true); // O 'true' força a exibição dos cards iniciais
  atualizarAno();
});
