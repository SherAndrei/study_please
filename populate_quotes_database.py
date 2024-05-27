import requests
from bs4 import BeautifulSoup
import csv
import re

url = 'https://bright-culture.com/exam-tips-for-students/202-motivational-quotes-for-students-studying'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/'
}

response = requests.get(url, headers=headers)
response.raise_for_status()

soup = BeautifulSoup(response.content, 'html.parser')

quote_spans = soup.find_all('span')

delimiter_pattern = re.compile(r'\s*[-–—]\s*')
quote_mark_pattern = re.compile(r'^“(.*?)”$')

quotes = []
for span in quote_spans:
    text = span.get_text(strip=True)
    match = delimiter_pattern.search(text)
    if match:
        quote, author = text[:match.start()].strip(
        ), text[match.end():].strip()
        match = quote_mark_pattern.search(quote)
        if match:
            quote = match.group(1)  # Extract text inside quotation marks
        quotes.append([quote, author])

# Write the quotes to a CSV file
with open('quotes.csv', 'w', newline='', encoding='utf-8') as csvfile:
    csvwriter = csv.writer(csvfile, delimiter='\t')
    # Write the header
    csvwriter.writerow(['quote', 'author'])
    # Write the quotes
    csvwriter.writerows(quotes)

print(f'Successfully saved {len(quotes)} quotes to quotes.csv')
