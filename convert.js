const fs = require('fs')
const cheerio = require('cheerio')
const sqlite3 = require('sqlite3').verbose()

const file = fs.readFileSync('./bookmarks.html', {encoding: 'utf8', flag: 'r'})
const $ = cheerio.load(file)
const db = new sqlite3.Database('./bookmarks.db')

let list = []
const bookmarks = $('a').each((_, el) => { 
  const $el = $(el)
  list.push({
    href: $el.attr('href'),
    date: parseInt(($el).attr('add_date')),
    title: $el.text()
  })
})

for (let b of list) {
  //console.log(Object.values(b))
  db.run('insert into bookmarks (href, date, title) values (?, ?, ?)', Object.values(b), (err) => {
    if (err) {
      // show us the duplicates, just in case
      console.error(err)
    }
  })
}
