const rates={};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementKZT = document.querySelector('[data-value="KZT"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
 get();
async function get() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;
    console.log(data);
    rates.USD = result.Valute.USD;
    rates.KZT = result.Valute.KZT;
    rates.EUR = result.Valute.EUR;
    console.log(rates);
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementKZT.textContent = rates.KZT.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
}