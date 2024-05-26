// quotes.js
const quotes = [
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { quote: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
  { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { quote: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { quote: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  // Add more quotes as needed
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');

  quoteElement.textContent = `"${quotes[randomIndex].quote}"`;
  authorElement.textContent = `- ${quotes[randomIndex].author}`;
}

// Generate a quote when the page loads
window.onload = generateQuote;
