function csvToArray(str, delimiter = '\t') {
  const headers = str.slice(0, str.indexOf('\n')).trim().split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).trim().split('\n');

  return rows.map(row => {
      const values = row.split(delimiter);
      return headers.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
      }, {});
  });
}

function fetchQuotes() {
  return fetch('quotes.csv')
      .then(response => response.text())
      .then(data => csvToArray(data))
      .catch(error => console.error('Error fetching the CSV file:', error));
}

function generateQuote() {
  fetchQuotes().then(quotes => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quoteElement = document.getElementById('quote');
      const authorElement = document.getElementById('author');

      quoteElement.textContent = `"${quotes[randomIndex].quote}"`;
      authorElement.textContent = `- ${quotes[randomIndex].author}`;
  });
}

window.onload = generateQuote;
