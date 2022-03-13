var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyparser=require('body-parser')
var app = express();
const multer = require("multer");

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const upload = multer({ dest: "public/files" });
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single("upfile"),(req,res)=>{
  console.log(req.file);
  const {originalname,mimetype,size}=req.file
  res.json({"name":originalname,"type":mimetype,"size":size})
  
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
