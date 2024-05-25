import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./bookmarks.db')

export default function handler(req, res) {
  console.log('got', req.query.id)

  const query = `
    update bookmarks
    set archived = 1
    where id = ?
  `

  db.all(query, [req.query.id], (err, data) => {
    if (err) {
      res.status(500)
      return; 
    }

    res.json(data)
  })
}
