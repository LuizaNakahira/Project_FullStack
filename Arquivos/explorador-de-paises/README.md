# Countries Explorer 🗺️
- Este é um projeto de aplicação web que permite aos usuários explorar informações sobre diferentes países. O projeto foi desenvolvido utilizando React.js e consome dados da API REST Countries. A aplicação foi feita em inglês para seguir a linguagem da API.

## Funcionalidades
- Busca de países por nome.
- Exibição da bandeira, nome, região, idioma e capital.
- Botões para:
  - Exibir todos os países disponíveis.
  - Pesquisar um país específico. 
- Interface responsiva e estilizada com Material-UI.
- Mensagens de erros para buscas inválidas.

### Tecnologias Usadas
- React.js para construção da interface.
- Material-UI para design e estilização dos componentes.
- Axios para realizar requisições HTTP para a API REST Countries.
- gh-pages para o deploy no GitHub Pages.

#### Hooks implementados
- useState: Para gerenciar o estado dos países e mensagens de erro.
- useEffect: Para focar no campo de entrada ao carregar o formulário.
- useMmemo: Para memorizar a lista de países e otimizar a renderização.

##### API Usada
- API: [REST COUNTRIES](https://restcountries.com/)

###### Acesso ao projeto
- [Countries Explorer - GitHub Pages](https://LuizaNakahira.github.io/Fullstack-Project)