##### Atenção, ainda estou realizando modificações no projeto, dentre eles incluir o StoryBook, AWS S3 Local Bucket, Upload de Imagem, Deshboard com Métricas e gráficos, incluindo as integração de edit, delete, update e create em algumas partes.

# Para rodar o projeto em localhost via Docker:

```bash
  docker-compose build
```

```bash
  docker-compose up
```


#### para popular o banco de dados:

```bash
  docker exec -it {NOME_DO_CONTAINER_BACKEND} yarn ts-node --require tsconfig-paths/register src/shared/seed/seed.ts
```

---

# Arquitetura e Boas Práticas (Backend - Nest.Js + Typescript)

Este projeto foi desenvolvido seguindo princípios de *Domain Driven Design (DDD)* e outras boas práticas de desenvolvimento. A seguir, estão descritos os principais conceitos e padrões utilizados, bem como a estrutura de pastas adotada.

## Domain Driven Design (DDD)

- **Separação de Domínios:**  
  A lógica do domínio (regras de negócio, entidades, regras de validação) foi isolada em módulos específicos, garantindo que cada parte do sistema seja responsável por uma área de domínio bem definida (por exemplo, `products`).

- **Camadas de Abstração:**  
  O projeto está estruturado em diferentes camadas, permitindo uma melhor manutenção e escalabilidade:
  - **Entidades:** Representam os modelos de domínio (e.g., `Product`) que encapsulam as regras e atributos do negócio.
  - **DTOs (Data Transfer Objects):** São utilizados para a comunicação entre camadas, garantindo que somente os dados necessários sejam trafegados. Eles auxiliam na validação e tipificação dos dados.
  - **Repositórios:** Responsáveis pelo acesso a dados, encapsulando a lógica de persistência (por exemplo, usando *Mongoose* para interagir com o MongoDB).  
  - **Serviços:** Contêm a lógica de negócio que pode ser compartilhada entre vários casos de uso.  
  - **Use Cases:** Representam operações de negócio específicas (como criação, consulta, atualização ou deleção de produtos). Eles delegam a execução para os repositórios e serviços, seguindo a ideia de que cada caso de uso tem uma única responsabilidade.

## Uso de DTOs

- **Validação e Tipagem:**  
  Os DTOs são utilizados para garantir a integridade dos dados que trafegam pela aplicação (e.g., `CreateProductDTO`, `DeleteProductDTO`, `GetProductByIdDTO`).  
- **Separação de Responsabilidade:**  
  Ao usar DTOs, isolamos a camada de transporte de dados da lógica do domínio, impedindo que alterações na interface afetem diretamente as regras de negócio.

## Repositórios

- **Responsabilidade Única:**  
  Os repositórios encapsulam toda a lógica de acesso a dados, isolando a aplicação dos detalhes de implementação de persistência.
- **Interface Clara:**  
  Cada repositório, como o `ProductsRepository`, oferece métodos bem definidos para operações como criação, deleção, atualização e consulta de produtos.  
- **Facilidade de Teste:**  
  A abstração proporcionada pelos repositórios facilita a escrita de testes unitários, pois possibilita a criação de mocks para os métodos de acesso a dados.

## Serviços

- **Lógica de Negócio Compartilhada:**  
  Os serviços, como o `ProductsService`, centralizam as regras de negócio e podem ser facilmente reutilizados por múltiplos controladores ou outros casos de uso.
- **Isolamento da Lógica de Persistência:**  
  Os serviços interagem com os repositórios para realizar operações, mantendo clara a separação entre regras de negócio e lógica de acesso a dados.

## Use Cases

- **Operações de Negócio Específicas:**  
  Os use cases, como `CreateProductUseCase`, `DeleteProductUseCase`, `GetProductByIdUseCase` e `UpdateProductByIdUseCase`, representam operações específicas do domínio.  
- **Centralização de Regras:**  
  Cada caso de uso concentra todos os passos necessários para cumprir uma ação de negócio, garantindo um único ponto de responsabilidade.
- **Teste Facilitado:**  
  A separação dos use cases torna a aplicação mais modular e facilita a criação de testes unitários para cada operação específica.

## Estrutura de Pastas

A estrutura de pastas está organizada de forma a refletir os conceitos do DDD, mantendo uma separação clara entre as diversas camadas e responsabilidades:

```
backend/
├── src/
│   ├── modules/
│   │   └── products/
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   └── products.entity.ts      // Definição da entidade Product e regras do domínio
│   │       │   ├── infra/
│   │       │   │   └── repositories/
│   │       │   │       └── products/
│   │       │   │           └── products.repository.ts  // Lógica de acesso a dados (MongoDB via Mongoose)
│   │       │   └── interface/
│   │       │       ├── controllers/
│   │       │       │   └── products/
│   │       │       │       └── products.controller.ts  // Exposição dos endpoints HTTP
│   │       │       └── dtos/
│   │       │           └── products/
│   │       │               ├── create-product.dto.ts   // DTOs para criação
│   │       │               ├── delete-product.dto.ts   // DTOs para deleção
│   │       │               └── get-product-by-id.dto.ts  // DTOs para consulta
│   │       ├── application/
│   │       │   ├── services/
│   │       │   │   └── products/
│   │       │   │       └── products.service.ts           // Lógica de negócio compartilhada
│   │       │   └── usecases/
│   │       │       ├── products/
│   │       │       │   ├── create-product.usecase.ts     // Casos de uso específicos
│   │       │       │   ├── delete-product.usecase.ts
│   │       │       │   ├── get-product-by-id.usecase.ts
│   │       │       │   └── update-product-by-id.usecase.ts
│   │       └── products.module.ts                         // Módulo do produto, integração dos componentes
│   └── main.ts                                            // Ponto de entrada da aplicação
```

## Benefícios e Conclusão

- **Manutenibilidade:**  
  A clara separação de responsabilidades facilita a manutenção e expansão do sistema, já que alterações em uma camada (por exemplo, a persistência) não afetam diretamente as regras de negócio.

- **Testabilidade:**  
  A separação em DTOs, repositórios, serviços e use cases facilita a elaboração de testes unitários e integrados, garantindo maior confiabilidade no sistema.

- **Escalabilidade:**  
  Um projeto organizado segundo os princípios DDD permite que novas funcionalidades sejam adicionadas sem comprometer o código existente, promovendo uma evolução sustentável do sistema.

Essas boas práticas garantem um código mais limpo, modular e alinhado com os princípios de engenharia de software modernos, facilitando tanto a leitura quanto a manutenção do projeto.

---

# Arquitetura e Boas Práticas (Frontend - Next + TypeScript)

Este projeto foi desenvolvido seguindo princípios de *Component-Driven Development (CDD)* e outras boas práticas de desenvolvimento como Atomic Design. A seguir, estão descritos os principais conceitos e padrões utilizados, bem como a estrutura de pastas adotada.

## Component-Driven Development (CDD)

- **Separação de Componentes**:  
  A interface do usuário é dividida em componentes reutilizáveis, garantindo que cada parte do sistema seja responsável por uma funcionalidade específica (por exemplo, `ProductList`).

- **Camadas de Abstração**:  
  O projeto está estruturado em diferentes camadas, permitindo uma melhor manutenção e escalabilidade:
  - **Componentes**: Representam as unidades básicas da interface do usuário (e.g., `Button`, `Card`) que encapsulam a lógica e a apresentação.
  - **Hooks**: Utilizados para gerenciar o estado e os efeitos colaterais, promovendo a reutilização de lógica entre componentes.
  - **Context API**: Fornece um meio de compartilhar dados entre componentes sem a necessidade de passar props manualmente em cada nível da árvore de componentes.
  - **Serviços**: Contêm a lógica de comunicação com APIs externas, centralizando as chamadas de rede e o tratamento de dados.

## Uso de Hooks

- **Gerenciamento de Estado e Efeitos**:  
  Os hooks são utilizados para gerenciar o estado local e os efeitos colaterais nos componentes funcionais (e.g., `useState`, `useEffect`).

- **Custom Hooks**:  
  Hooks personalizados são criados para encapsular e reutilizar lógica complexa, como a busca de dados ou a manipulação de formulários.

## Context API

- **Gerenciamento de Estado Global**:  
  O Context API é utilizado para gerenciar o estado global da aplicação, permitindo que dados como o usuário autenticado ou o tema sejam acessados por qualquer componente.

- **Facilidade de Integração**:  
  A integração com hooks como `useContext` facilita o acesso e a manipulação do estado global.

## Serviços

- **Comunicação com APIs**:  
  Os serviços centralizam as chamadas de rede, utilizando `fetch` para interagir com APIs RESTful.

- **Tratamento de Erros e Dados**:  
  Os serviços são responsáveis por tratar erros de rede e formatar dados antes de passá-los para os componentes.


## Estrutura de Pastas

A estrutura de pastas está organizada de forma a refletir os conceitos do CDD, mantendo uma separação clara entre as diversas camadas e responsabilidades:

```
frontend/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   └── Button.tsx                // Componentes básicos e reutilizáveis
│   │   ├── molecules/
│   │   │   └── ProductCard.tsx           // Componentes compostos por átomos
│   │   └── organisms/
│   │       └── ProductList.tsx           // Componentes complexos compostos por moléculas
│   ├── hooks/
│   │   ├── useProducts.ts                // Hooks personalizados para lógica de negócios
│   │   └── useAuth.ts
│   ├── context/
│   │   └── ProductContext.tsx            // Contextos para gerenciamento de estado global
│   ├── services/
│   │   └── api.ts                        // Serviços para comunicação com APIs
│   ├── pages/
│   │   └── Home.tsx                      // Páginas da aplicação
│   └── App.tsx                           // Componente raiz da aplicação
```

## Benefícios e Conclusão

- **Manutenibilidade**:  
  A clara separação de responsabilidades facilita a manutenção e expansão do sistema, já que alterações em um componente não afetam diretamente outros componentes.

- **Reutilização**:  
  Componentes e hooks reutilizáveis promovem a consistência e reduzem a duplicação de código.

- **Escalabilidade**:  
  Um projeto organizado segundo os princípios CDD permite que novas funcionalidades sejam adicionadas sem comprometer o código existente, promovendo uma evolução sustentável do sistema.
