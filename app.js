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
  dateStrings:"date"
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
  let title = req.body.title;
  let file = req.body.file;
  let memo = req.body.memo;
  // console.log(type,name,email,title,file,memo);
  let sql = `INSERT INTO contact.contacts (type,name,email,title,file,memo,regadate)
  VALUES ('${type}','${name}','${email}','${title}','${file}','${memo}', DATE_FORMAT(now(), '%y/%m/%d'))`;

  //query 실행명령
  conn.query(sql,function(err, results, fields) {
      if(err) throw error;
      console.log('정상적으로 데이터가 입력되었습니다.');
      res.send("<script>alert('등록되었습니다'); location.href='/';</script>");
    });
})

//삭제용 쿼리클 작성:/3000contactDel?id=1
app.get("/contactDel", (req,res)=>{
  //삭제할 문의 id ==>예 1번 문의를 삭제한다면? 1을 전달
  // let id = req
  let del_no = req.query.id;
  console.log("삭제하려는 문의 번호 :" + del_no);
  let sql = `DELETE from contact,cotacts WHERE id=${del_no}`;
   //query 실행명령 
  conn.query(sql,function(err, results, fields) {
    if (err) throw error;
    console.log('정상적으로 데이터가 입력되었습니다.');
    res.send("<script>alert('삭제 되었습니다'); location.href='/contactList';</script>");
  });
})
app.get("/contactlist",(req,res)=>{ // http://locahost/contactlist
  let sql = "SELECT * FROM contact.contacts ORDER BY id DESC;";
  conn.query(sql,function(err, results, fields) {
      //console.log(results); // results contains rows returned by server
      res.render("contactList",{dataset: results})
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});