const express = require("express");
const app = express();
const path=require('path');
const port = process.env.PORT || 3000;
const fs=require('fs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'pulic')))  //use to modiied and updae css and js 
app.set("view engine",'ejs')





app.get('/',function(req,res)
{
  fs.readdir('./files' ,function(err,files){
  res.render("index",{files: files});
})
})






app.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'files', req.params.filename);

  fs.readFile(filePath, 'utf-8', (err, fileData) => {

    res.render('show', { filename: req.params.filename, fileData });
  });
});




app.get('/edit/:filename',function(req,res){
  res.render('edit',{filename:req.params.filename});
})

app.post('/edit',function(req,res)
{
fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.New}.txt `,function(err)
{
 res.redirect('/'); 
})
})


app.post('/create',function(req,res){
  fs.writeFile(`./files/${req.body.title.split(' ').join('') }.txt` , req.body.details,function(err)
  {
   res.redirect('/')
  });
  });


  app.get('/del/:filename',function(req,res){
    res.render('del',{filename:req.params.filename});
  })


app.post('/del',function(req,res){
    fs.unlink(`./files/${req.body.d1}`,function(err)
    {
     res.redirect('/')
   
});
    
    });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
