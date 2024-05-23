import Elysia from "elysia"


const app =  new Elysia()
  .get('/', (req, res) => {
    res.send('Hello World')
  })
app.listen(3333, () => {
  console.log('Server is running on port 3333')
})