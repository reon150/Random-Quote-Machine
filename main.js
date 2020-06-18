let url_API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

let quotesData;
let randomColor

let tweet_quote = document.getElementById("tweet-quote");
let tumblr_quote = document.getElementById("tumblr-quote");
let text_quote = document.getElementById('text');
let author_quote = document.getElementById('author');
let new_quote_button = document.getElementById('new-quote');
let quote_symbol = document.getElementsByClassName("quote-symbol");

async function  start()  {
	await getQuotes();	
	changeQuote();
	var newQuoteButton = document.getElementById("new-quote"); 
	newQuoteButton.addEventListener("click", changeQuote, false); 
}

function getQuotes() {
    return (
        fetch(url_API, {'mode': 'cors'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                quotesData = data;
            })
    );
}

function changeQuote() {
	const {quote: currentQuote, author: currentAuthor} = getRandomQuote();

    tweet_quote.setAttribute("href", 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
	tumblr_quote.setAttribute('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
	
	text_quote.innerHTML = currentQuote;
	author_quote.innerHTML = '-' + currentAuthor;	
	
	changeColor();
}

function changeColor() {
	randomColor = colors[getRandomNumber(Object.keys(colors).length)];
	
	text_quote.style.color = randomColor.color;
	author_quote.style.color = randomColor.color;
	quote_symbol[0].style.color = randomColor.color;
	quote_symbol[1].style.color = randomColor.color;

	tweet_quote.style.backgroundColor = randomColor.color;
	tumblr_quote.style.backgroundColor = randomColor.color;
	new_quote_button.style.backgroundColor = randomColor.color;

	document.body.style.background = randomColor.background;
}

function getRandomQuote() {
	return quotesData.quotes[getRandomNumber(quotesData.quotes.length)];
}

function getRandomNumber(length) {	
	return Math.floor(Math.random() * length);
}

window.onload = start;
