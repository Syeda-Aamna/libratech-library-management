# Real starter-catalog sources

## Metadata, ISBN editions, and covers

Open Library distinguishes a literary work from a specific edition. These records pair each real title and author with an ISBN-backed edition. `publicationYear` records the work's original publication year, not the printing date of the linked edition. Edition-specific cover images use Open Library's Covers API format `https://covers.openlibrary.org/b/isbn/{ISBN}-M.jpg?default=false`; if a cover is unavailable, LibraTech uses a neutral book icon. Edition links open the matching ISBN record.

Open Library documentation: [Books API](https://openlibrary.org/dev/docs/api/books), [Search API](https://openlibrary.org/dev/docs/api/search), and [Covers API](https://openlibrary.org/dev/docs/api/covers). The ISBN lookup pattern is `https://openlibrary.org/isbn/{ISBN}.json`.

## Verified real titles

| Title | Author | ISBN-13 | Original publication year | Category | ISBN edition record |
|---|---|---:|---:|---|---|
| *Pride and Prejudice* | Jane Austen | 9780141439518 | 1813 | Classic fiction · Romance | [Open Library ISBN record](https://openlibrary.org/isbn/9780141439518.json) |
| *The Adventures of Sherlock Holmes* | Arthur Conan Doyle | 9780141034355 | 1892 | Classic fiction · Mystery | [Open Library ISBN record](https://openlibrary.org/isbn/9780141034355.json) |
| *Dracula* | Bram Stoker | 9780141439846 | 1897 | Gothic fiction · Horror | [Open Library ISBN record](https://openlibrary.org/isbn/9780141439846.json) |
| *The Great Gatsby* | F. Scott Fitzgerald | 9780743273565 | 1925 | Classic fiction · Literary | [Open Library ISBN record](https://openlibrary.org/isbn/9780743273565.json) |
| *The Hobbit* | J. R. R. Tolkien | 9780547928227 | 1937 | Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9780547928227.json) |
| *Little Women* | Louisa May Alcott | 9780140300765 | 1868 | Classic fiction · Family | [Open Library ISBN record](https://openlibrary.org/isbn/9780140300765.json) |
| *Anne of Green Gables* | Lucy Maud Montgomery | 9780141321592 | 1908 | Classic fiction · Coming of age | [Open Library ISBN record](https://openlibrary.org/isbn/9780141321592.json) |
| *The Secret Garden* | Frances Hodgson Burnett | 9780141321066 | 1911 | Classic fiction · Children | [Open Library ISBN record](https://openlibrary.org/isbn/9780141321066.json) |
| *A Little Princess* | Frances Hodgson Burnett | 9780141325583 | 1905 | Classic fiction · Children | [Open Library ISBN record](https://openlibrary.org/isbn/9780141325583.json) |
| *Heidi* | Johanna Spyri | 9780141322568 | 1881 | Classic fiction · Children | [Open Library ISBN record](https://openlibrary.org/isbn/9780141322568.json) |
| *The Call of the Wild* | Jack London | 9780141321059 | 1903 | Classic fiction · Adventure | [Open Library ISBN record](https://openlibrary.org/isbn/9780141321059.json) |
| *Black Beauty* | Anna Sewell | 9781840228175 | 1877 | Classic fiction · Animal story | [Open Library ISBN record](https://openlibrary.org/isbn/9781840228175.json) |
| *The Wind in the Willows* | Kenneth Grahame | 9781517455224 | 1908 | Classic fiction · Children | [Open Library ISBN record](https://openlibrary.org/isbn/9781517455224.json) |
| *The Jungle Book* | Rudyard Kipling | 9780008514440 | 1894 | Classic fiction · Adventure | [Open Library ISBN record](https://openlibrary.org/isbn/9780008514440.json) |
| *The Wonderful Wizard of Oz* | L. Frank Baum | 9781541326149 | 1900 | Classic fiction · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9781541326149.json) |
| *Alice's Adventures in Wonderland* | Lewis Carroll | 9781402716522 | 1865 | Classic fiction · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9781402716522.json) |
| *Treasure Island* | Robert Louis Stevenson | 9780141321004 | 1883 | Classic fiction · Adventure | [Open Library ISBN record](https://openlibrary.org/isbn/9780141321004.json) |
| *The Swiss Family Robinson* | Johann David Wyss | 9780008514532 | 1812 | Classic fiction · Adventure | [Open Library ISBN record](https://openlibrary.org/isbn/9780008514532.json) |
| *Charlotte's Web* | E. B. White | 9780061228742 | 1952 | Children · Animal story | [Open Library ISBN record](https://openlibrary.org/isbn/9780061228742.json) |
| *The Lion, the Witch and the Wardrobe* | C. S. Lewis | 9780060765446 | 1950 | Children · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9780060765446.json) |
| *Matilda* | Roald Dahl | 9780142410370 | 1988 | Children · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9780142410370.json) |
| *Charlie and the Chocolate Factory* | Roald Dahl | 9780142410318 | 1964 | Children · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9780142410318.json) |
| *The BFG* | Roald Dahl | 9780142410387 | 1982 | Children · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9780142410387.json) |
| *The Little Prince* | Antoine de Saint-Exupéry | 9780156012195 | 1943 | Classic fiction · Fable | [Open Library ISBN record](https://openlibrary.org/isbn/9780156012195.json) |
| *The Phantom Tollbooth* | Norton Juster | 9780375869037 | 1961 | Children · Fantasy | [Open Library ISBN record](https://openlibrary.org/isbn/9780375869037.json) |

The previously listed *Frankenstein* record has been removed from the starter catalog. The new default catalog contains 25 titles total: five of the original books and 20 additions.

## Inventory integrity and upgrades

Bibliographic metadata does not establish physical holdings. Every starter record uses `quantity: 0` and `availableQuantity: 0` until library staff confirm actual copies. A title cannot be issued until its physical stock count is recorded. A fresh library receives the catalog only when its books, members, and loans collections are all empty. `SEED_STARTER_CATALOG=false` disables initialization.

A database initialized by the earlier v1 starter catalog is upgraded with the 20 new ISBN records using insert-only writes, which do not overwrite staff-entered inventory. The obsolete *Frankenstein* starter record is removed during that upgrade only if it has no physical copies and no loan history. Existing copies or loan history are preserved rather than silently deleted.
