## Importing
```
node convert.js <path to bookmarks.html>
```

## Running
```
yarn run dev
```

## TODOs:
**Navigation**
  - [ ] dashboard UI w/ XState
  * [ ] filter/sort entries: alpha order, date added, frequency read, frequency suggested, upvotes/downvotes, favorites
  * [ ] search: fuzzy, strict, title, date range, tag, etc
  * [ ] supports ctrl-f for searching on page
  - [ ] show archived

**Per bookmark**
  Details/Metadata
  - [ ] get metadata and store
  - [ ] rename entries
  - [ ] summarize entries in a couple of sentences
  - [ ] add notes
  
  Lists
  - [ ] recommend other bookmarks like the current one
  * [ ] add to lists
  - [ ] generate similar lists, create list from single

**Rest**
  - [ ] latest digest
  - [ ] "Reader View" simplified viewing
  - [ ] support twitter, reddit, youtube bookmarks/saved
  - [ ] support loading PDFs
  - [ ] EXTENSION: update bookmarks as they are added
  - [ ] EXTENSION: highlight and annotate page content

### DONE
- [x] virtual scrolling (perf. enhance long lists)
- [x] link to HN comments
- [x] include MUI
- [x] imports as updates 
  - updated the table to make href UNIQUE constraint
- [x] random entries
