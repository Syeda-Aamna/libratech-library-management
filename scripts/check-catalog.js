import assert from 'node:assert/strict';
import { starterCatalog } from '../shared/catalog-data.js';

const isValidIsbn13 = (isbn) => {
  if (!/^\d{13}$/.test(isbn)) return false;
  const sum = [...isbn.slice(0, 12)].reduce((total, digit, index) => total + Number(digit) * (index % 2 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(isbn[12]);
};

assert.equal(starterCatalog.length, 25, 'Starter catalog should contain exactly 25 books.');
assert.ok(!starterCatalog.some((book) => /frankenstein/i.test(book.title)), 'Frankenstein must be removed.');
assert.equal(new Set(starterCatalog.map((book) => book.isbn)).size, starterCatalog.length, 'ISBNs must be unique.');
for (const book of starterCatalog) {
  assert.ok(book.title && book.author && book.category, `Missing bibliographic details for ISBN ${book.isbn}.`);
  assert.ok(isValidIsbn13(book.isbn), `Invalid ISBN-13 checksum for ${book.title}: ${book.isbn}.`);
  assert.equal(book.quantity, 0, `${book.title} must not invent physical stock.`);
  assert.equal(book.availableQuantity, 0, `${book.title} must not invent available stock.`);
}
console.log('Catalog check passed: 25 real ISBN-13 records, no Frankenstein, and zero invented stock.');
