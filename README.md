# Funil de Vendas (Sales Funnel)

Este projeto é um exemplo de um funil de vendas simples com três etapas principais:

1. **Landing Page**: Página de apresentação do produto
2. **Validação de Compra**: Simulação de processo de compra com verificação de token
3. **Área de Membro**: Página protegida com acesso ao produto

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx (Landing Page)
│   ├── page.css (Estilos da Landing Page)
│   ├── comprar/
│   │   ├── page.tsx (Página de validação de compra)
│   │   └── comprar.css (Estilos da página de compra)
│   └── acesso/
│       ├── page.tsx (Página de acesso ao produto)
│       └── acesso.css (Estilos da página de acesso)
├── components/
│   └── ui/ (Componentes do shadcn/ui)
└── lib/
    └── utils.ts (Utilitários)
```

## Tecnologias Utilizadas

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI

## Como Funciona

1. O usuário visita a Landing Page e clica em "Comprar Agora"
2. É redirecionado para a página de compra com um token de acesso na URL (`?token=abc123`)
3. Se o token for válido, o acesso é liberado e o usuário é redirecionado para a área de membros
4. Se não, vai mostrar "acesso negado" podendo ser testado com a seguinte URL : http://localhost:3000/comprar?token=123456
5. Ao apertar em "voltar para home" acesso permanece válido por 24 horas usando localStorage podendo ir pra pagina de acesso sem token
6. Ao apertar em sair, o acesso é automaticamente removido

## Simulação de envio para backend/Zapier

 const onSubmit = (data: FormData) => {
     Simulação de envio para backend/Zapier
    console.log("Dados enviados:", data);
    setFormSubmitted(true); 
    
    // Em uma aplicação real, aqui você enviaria os dados para seu backend ou Zapier
    // fetch('/api/submit-form', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
  };

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar servidor de produção
npm start
```

Acesse a aplicação em http://localhost:3000
