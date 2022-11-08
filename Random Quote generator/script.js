// variables
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading and hide quote

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading and show quote
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// GEt quote from API

async function getQuote() {
  loading();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);

    // If there is no author name, then put "unknown"

    if (data.quoteAuthor === "") {
      authorText.innerText = "- Unknown";
    } else {
      authorText.innerText = "- " + data.quoteAuthor;
    }

    // If quote is long, then reduce font size

    if (data.quoteText.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // After quote is completely loaded then show the quote
    complete();
  } catch (error) {
    // console.log("Eror, no quote", error);
    getQuote();
  }
}

// Tweet Quote

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
}

// Event Listener

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// ON load
getQuote();
