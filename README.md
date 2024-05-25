## Importing
```
node utils/convert.js <path to bookmarks.html>
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
  
**Lists**
  - [ ] 1st-class spotify-style lists modal
  - [ ] top level "lists" panel
  - [ ] drag-n-drop to add to list
  - [ ] recommend other bookmarks like the current one
  - [ ] generate similar lists, create list from single

**Rest**
  - [ ] latest digest
  - [ ] export database into chrome format
  - [ ] "Reader View" simplified viewing
  - [ ] support twitter, reddit, youtube bookmarks/saved
  - [ ] support loading PDFs
  - [ ] EXTENSION: update bookmarks as they are added
  - [ ] EXTENSION: highlight and annotate page content
  - [ ] EXTENSION: load lists into tab groups
  - [ ] EXTENSION: bookmark tabs in groups

### DONE
- [x] upvote/downvote
- [x] updated to Next.js 14
- [x] replaced mui w/ franken/ui
- [x] virtual scrolling (perf. enhance long lists)
- [x] link to HN comments
- [x] include MUI
- [x] imports as updates 
  - updated the table to make href UNIQUE constraint
- [x] random entries
