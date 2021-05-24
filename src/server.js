const express = require("express")
const server = express()

const BancoDados = require("./database/db")

const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

server.get("/", (req, res) =>{
    return res.render("index.html")
})

server.get("/ponto", (req, res) =>{

    //req.query
    return res.render("ponto.html")
})

server.post("/salvaPonto", (req, res) => {
    const query = `
      INSERT INTO locais (
          name,
          address,
          address2,
          state,
          city,
          items
      ) VALUES(?,?,?,?,?,?);
   `
   const values = [
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertDate(err) {
    if(err) {
       console.log(err)
       return res.send("Erro no casdastro!")
        }
        console.log("Cadastrado com Sucesso")
        console.log(this)

    //return res.send("Ponto de coleta cadastrado!")
    return res.render("ponto.html", {saved: true})

    }

    BancoDados.run(query, values, afterInsertDate)

})

server.get("/listapontos", (req, res) =>{

    const search = req.query.search

    if (search == "") {
        return res.render("listaPontos.html",{total: 0})  
    }

    BancoDados.all(`SELECT * FROM locais WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
           return console.log(err)
        }
        const total = rows.length
        //console.log("Locais de Coletas")
        //console.log(rows)
        return res.render("listaPontos.html",{locais: rows, total: total})
    })
})

server.listen(3000)