# Documentação do Projeto Organizze

## Descrição

Este projeto foi criado utilizando **Next.js**, **Tailwind CSS** e **Chart.js**. Ele está integrado ao repositório [ORGANIZZE-BK](https://github.com/RodriguesEmerson/organizze-bk), que serve como backend desenvolvido em PHP. O objetivo principal é estudar e praticar integração entre frontend moderno e backend em PHP.

## Estrutura do Projeto

- **app/**: Contém os arquivos principais do frontend, incluindo páginas, componentes, hooks, serviços e gerenciamento de estado com Zustand.
- **public/**: Arquivos públicos como imagens, ícones e gifs.
- **db/**: Possível armazenamento de dados locais ou mocks.
- **.next/**: Arquivos gerados pelo Next.js após o build.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização SSR/SSG.
- **Tailwind CSS**: Utilitário para estilização rápida e responsiva.
- **Chart.js**: Biblioteca para gráficos dinâmicos.
- **PHP (backend)**: Integração com o repositório ORGANIZZE-BK.

## Como Executar

1. Clonne o repositório
   ```sh
   git clone https://github.com/RodriguesEmerson/organizze.git

2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
4. Certifique-se de que o backend ORGANIZZE-BK está rodando e configurado para aceitar requisições deste frontend.

## Estrutura de Pastas

- `app/`: Páginas, componentes e lógica do frontend.
- `public/`: Recursos estáticos.
- `db/`: Dados locais ou mocks.
- `.next/`: Build do Next.js.

## Observações

- Este projeto é para fins de estudo e integração entre tecnologias modernas de frontend e backend em PHP.
- Para mais detalhes sobre o backend, consulte o repositório [ORGANIZZE-BK](https://github.com/RodriguesEmerson/organizze-bk).
