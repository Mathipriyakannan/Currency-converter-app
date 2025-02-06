import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
const [currencies, setCurrencies] = useState([]);
const [fromCurrency, setFromCurrency] = useState('USD');
const [toCurrency, setToCurrency] = useState('EUR');
const [amount, setAmount] = useState(1);
const [result, setResult] = useState(null);

useEffect(() => {
axios.get('https://api.exchangerate-api.com/v4/latest/USD').then(response => {
const currencyKeys = Object.keys(response.data.rates);
setCurrencies(currencyKeys);
})
.catch(error => console.error('Error fetching the currency data:', error));
}, []);

const convertCurrency = () => {

if (fromCurrency !== toCurrency) {
axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`).then(response => {
const rate = response.data.rates[toCurrency];
setResult((amount * rate).toFixed(2));
})
.catch(error => console.error('Error converting the currency: ', error));
} else {
setResult(amount);
}
};

return (
<div>
<h2>Currency Converter</h2>
<div>
<input
type="number"
value={amount}
onChange={e => setAmount(e.target.value)}
/>
<select
value={fromCurrency}
onChange={e => setFromCurrency(e.target.value)}
>
{currencies.map(currency => (
<option key={currency} value={currency}>
{currency}
</option>
))}
</select>

<span>to </span> 
<select
value={toCurrency}
onChange={e => setToCurrency(e.target.value)}
>
{currencies.map(currency => (
<option key={currency} value={currency}>
{currency}
</option>
))}
</select>
</div>
<button onClick={convertCurrency}>Convert</button>
{result && <h3>{amount} {fromCurrency} = {result} {toCurrency}</h3>}
</div>
);
};

export default CurrencyConverter;