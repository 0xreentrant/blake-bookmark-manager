import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./bookmarks.db')

export default function handler(req, res) {
  const query = `
  select * from (
      select * from bookmarks
      where archived = 0
      order by RANDOM()
      limit 10
    )
    order by date desc
  `

  db.all(query, (err, data) => {
    if (err) {
      console.error(err)
      res.status(500)
      return; 
    }

    console.log('showing results:\n', data)

    res.status(200).json(data)
  })
}
