const mysql = require('mysql2');
const express = require('express')
const app = express()
const port = 3000

// view template engine
app.set("view engine", "pug");
app.set("views", __dirname+"/views");

app.use(express.static('public'));
app.use(express.urlencoded({ extended:'flase' }));

const conn = mysql.createConnection({
  host: "localhost",
  user: "ifg.035",
  password:"dpdms74101!",
  database: "contact",
  dateString:"date"
});

// simple query
conn.query(
  'SELECT * FROM contact.contacts;',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
  }
);

app.get('/', (req, res) => {
  res.render("home");
});

app.get('/about', (req, res) => {
  res.render("about");
});

app.get('/portfolio', (req, res) => {
  res.render("portfolio");
});

app.get('/contact', (req, res)=>{
    res.render("contact"); //help.pug 찾아서 서버에서 렌더링해라!
});

app.post("/contactAdd", (req, res)=>{ 
  //등록 하려는 문의 정보를 서버로 전송!
  let type = req.body.type == 1 ? "요청" : "문의"; //구분
  let name = req.body.name;
  let email = req.body.email;
  let title= req.body.title;
  let file= req.body.file;
  let memo= req.body.memo;
  // console.log(type,name,email,title,file,memo);
  let sql = `INSERT INTO contact.contacts (type,name,email,title,file,memo,regadate)
  VALUES ('${type}','${name}','${email}','${title}','${file}','${memo}',current_date())`

  //query 실행명령
  conn.query(
    sql,
    function(err, results, fields) {
      if(err) throw error;
      console.log('정상적으로 데이터가 입력되었습니다.');
      res.send("<script>alert('등록되었습니다'); location.href='/';</script>");
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});