const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//db.serialize(() => {
   // db.run(`
     //   CREATE TABLE IF NOT EXISTS locais (
      //      id INTEGER PRIMARY KEY AUTOINCREMENT,
      //      name TEXT,
     //       address TEXT,
       //     address2 TEXT,
       //     state TEXT,
       //     city TEXT,
       //     items TEXT
     //   );
 //   `)

  //  const query = `
      //  INSERT INTO locais (
          //  name,address,address2,state,city,items
      //  ) VALUES(?,?,?,?,?,?);
  //  `
  //  const values =[
      //      "ATA Coleta",
     //       "Araça",
     //       "Número 0",
      //      "São Paulo",
       //     "Araçatuba",
    //        "Resíduos Eletrônicos, Lampadas"
 //   ]

 //   function afterInsertDate(err) {
     //   if(err) {
        //    return console.log(err)
      //  }
      //  console.log("Cadastrado com Sucesso")
      //  console.log(this)
   // }
    //db.run(query, values, afterInsertDate)
   // db.all(`SELECT * FROM locais`, function(err, rows){
        //if(err) {
           // return console.log(err)
       // }
       // console.log("Locais de Coletas")
       // console.log(rows)
   //})

   // db.run(`DELETE FROM locais WHERE id = ?`, [9], function(err){
        //if(err) {
           //return console.log(err)
       // }
      //  console.log("Registro deletado!")
  // })
//})