var express = require('express');
var bodyParser = require('body-parser');

var multer = require('multer');
const {request} = require("express");
const {text} = require("body-parser");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    var UrlLink = Date.now()+ Math.random() + file.originalname;
    setUrlIMG(UrlLink);
    cb(null, UrlLink );
    setUrlIMG(file.originalname);
  },

});


var upload = multer({
  storage:storage,
  limits: {fileSize: 2 * 1024 * 1024},
  fileFilter: function (req, file, cb){
    // Kiem Tra Duoi File  hoac cac yeu cau tuy y
    var TenFile = file.originalname;
    var KichThuoc = file.length;
    if(TenFile.toString().indexOf('.jpg') >- 1)
    {
      console.log("> -1");
      cb(null,true);
    }else {
      console.log("< -1");
      cb(new Error("Duoi File Phai La JPG"),false);
    }
  }
}).array('file',6);
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));
var ArrayForm = [{
  "title_":"HAB",
  "MoTa_":"mota1",
  "URLIMG_":"https://raw.githubusercontent.com/zewstudio/Lab5_a/master/uploads/1658933301349.0752abc.jpg",
}];
var title_;
var mota_;
var urlIMG_;
function myFuncion(){
  let ArrayForm_ = {
    "title_":title_,
    "MoTa_":mota_,
    "URLIMG_":"https://raw.githubusercontent.com/zewstudio/Lab5_a/master/uploads/"+urlIMG_,
  }
  ArrayForm.unshift(ArrayForm_);
}
function setTitle(txt)
{
  title_ = txt;
}
function setMota(txt)
{
  mota_ = txt;
}
function setUrlIMG(txt)
{
  urlIMG_ = txt;
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/404', function(req, res, next) {
  res.render('404', { title: 'Express' });
});
router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'Express' });
});
router.get('/buttons', function(req, res, next) {
  res.render('buttons', { title: 'Express' });
});
router.get('/cards', function(req, res, next) {
  res.render('cards', { title: 'Express' });
});
router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Express' });
});
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Express' });
});
router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Express' });
});

router.get('/utilities-animation', function(req, res, next) {
  res.render('utilities-animation', { title: 'Express' });
});
router.get('/utilities-border', function(req, res, next) {
  res.render('utilities-border', { title: 'Express' });
});
router.get('/utilities-color', function(req, res, next) {
  res.render('utilities-color', { title: 'Express' });
});
router.get('/utilities-other', function(req, res, next) {
  res.render('utilities-other', { title: 'Express' });
});
router.get('/uploads',function(req, res, next) {
  res.render('uploads', { title: 'Uploads' , ArrayForm_0:ArrayForm});
});
router.post('/uploads',upload,function (req,res){
  var title_a = req.body.title;
  var mota_a = req.body.text;
  console.log(title_a+"-"+mota_a);
  setTitle(title_a);
  setMota(mota_a);
  myFuncion();
  upload(req,res,function (err)
  {
    if(err instanceof multer.MulterError)
    {
      res.send("Co Loi Xay Ra")
    }else {

      res.render('uploads', { title: 'Uploads' , ArrayForm_0:ArrayForm});

    }
  });
});
module.exports = router;
