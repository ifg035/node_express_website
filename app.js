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
  host: "http://icetea1.dothome.co.kr",
  user: "icetea1",
  database: "dpdms74101!"
});

// simple query
conn.query(
  SELECT * FROM `contact`,
  function(err, results, fields) {
    console.log(results); // 서버로부터 반환되는 결과행
    console.log(fields); //  결과에 따른 메타데이터(지원이 된다면)
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

app.post('/contactAdd', (req, res)=>{ 
  //등록 하려는 문의 정보를 서버로 전송!
  const type = req.body.type;
  const name = req.bpdy.name;
  const email = req.body.email;
  const title= req.body.title;
  const file= req.body.file;
  const memo= req.body.memo;
  console.log(type,title,name,email,title,file,memo);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});