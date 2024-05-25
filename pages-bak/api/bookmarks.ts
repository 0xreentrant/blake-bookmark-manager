import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./bookmarks.db')

export default function handler(req, res) {
  const allBookmarks = `
    select * from bookmarks
    where archived = 0
    order by date desc
    limit 15
  `

  db.all(allBookmarks, (err, data) => {
    if (err) {
      console.error(err)
      res.status(500)
      return; 
    }

    console.log('showing results:\n', data)

    res.status(200).json(data)
  })
}
