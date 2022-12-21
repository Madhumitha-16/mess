var express = require('express');
var router = express.Router();
const mysql=require('mysql2')

const conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root',      
  database: 'stock' 
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});


//api calls
router.post('/add', function (req, res) {
  let date;
  let item=req.body.item;
  let category=req.body.category;//give the select dropdown name as same as category
  let quantity=req.body.quantity;
  let amountkg=req.body.amountkg;
  let amount=quantity*amountkg;
  let sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,NOW())`;
  conn.query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
module.exports = router;
