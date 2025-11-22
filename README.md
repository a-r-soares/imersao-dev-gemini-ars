# Projeto de Cards - Imersão Alura Web

Este é um projeto desenvolvido durante a **Imersão Web da Alura**. A aplicação consiste em uma página web que exibe uma coleção de cards com informações sobre diversos temas, como tecnologia, cultura pop e esportes. Os dados são carregados dinamicamente a partir de arquivos JSON.

## 🚀 Funcionalidades

- **Exibição Dinâmica:** Os cards são gerados dinamicamente a partir de arquivos JSON.
- **Busca em Tempo Real:** À medida que o usuário digita no campo de busca, os cards são filtrados instantaneamente. A busca é _case-insensitive_ (não diferencia maiúsculas de minúsculas).
- **Modo Claro e Escuro:** A interface oferece a opção de alternar entre um tema claro e um escuro, sendo o modo escuro o padrão.
- **Dados Estruturados:** As informações são carregadas de arquivos `.json` locais, facilitando a manutenção e a adição de novos conteúdos.
- **Navegação por Categorias:** O projeto pode ser estendido para suportar filtros por categoria (Tecnologia, Cultura, Esportes).

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web fundamentais:

- **HTML5:** Para a estrutura semântica da página.
- **CSS3:** Para a estilização e o layout dos cards e da interface.
- **JavaScript:** Para a lógica de programação, incluindo a leitura dos arquivos JSON e a renderização dinâmica dos elementos na página.

## 📂 Estrutura do Projeto

A estrutura de arquivos do projeto está organizada da seguinte forma:

```
/
├── 📄 index.html         # Arquivo principal da aplicação
├── 🎨 style.css          # Folha de estilos
├── ⚙️ main.js            # Script principal com a lógica da aplicação
└── 🗃️ data/
    ├── data_dive.json    # Dados sobre cultura pop (filmes, séries, música)
    ├── data_espo.json    # Dados sobre esportes
    └── data_info.json    # Dados sobre tecnologias e ferramentas de dev
```

## 🏃 Como Executar

Para visualizar o projeto em seu navegador, siga os passos abaixo:

1.  Clone ou faça o download deste repositório em sua máquina local.
2.  Navegue até a pasta raiz do projeto.
3.  Abra o arquivo `index.html` diretamente em seu navegador de preferência (como Google Chrome, Firefox ou Microsoft Edge).

E pronto! Os cards serão carregados e exibidos na tela.

---

_Projeto criado como parte do conteúdo educacional da Alura._
