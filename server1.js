var express = require('express')
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

var app = express()
app.set('view engine','ejs')
app.set('views', './views')
app.listen(3004, () => console.log(`Server started at port`));


app.get('/', function(req, res){
  res.render('index');
})

app.post('/upload', upload.single('avatar'), function (req, res, next) {
  console.log(req.file);
  res.send('Upload file successfully');
  res.json({success: true, message: 'Enter creaet post API'});
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
