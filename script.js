//Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Cotação de moedas do dia.
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

// Manipulando o input amount para receber apenas números
amount.addEventListener("input", (event) => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Manipulando o evento de submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Atualizando a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    let total = amount * price;

    // Verifica se o resultado não é um número.
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente.");
    }

    // Formatar o valor total.
    total = formatCurrencyBRL(total).replace("R$", "");
    result.textContent = `${total} Reais`;

    // Aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result");
  } catch (error) {
    console.error(error);

    // Remove a classe do footer removendo ele da tela.
    footer.classList.remove("show-result");
    alert("Não foi possível converter. Tente novamente mais tarde!");
  }
}

// Formata a moeda em Real
function formatCurrencyBRL(value) {
  // converte pra número para ultilizar o toLocaleString e formata no padrão BRL(R$ 00,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
