const express=require("express");
const fs=require("fs");

// const worker=new TesseractWorker();
const { createWorker } =require( 'tesseract.js');

const worker = createWorker({
  logger: m => console.log(m)
});
const app=express();

app.use(express.json());

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs")



app.get('/',(req,res)=>{
    res.render("imagetotext.ejs");
    
})
app.get('/pdf',(req,res)=>{
    res.render("pdftotext.ejs");
    
})

const upload=require("./fileUpload.js");
app.post("/getText",upload.single("image"),(req,res)=>{
    
    console.log("getter in node js before");
    
    fs.readFile(`./upload/image/${req.file.originalname}`,async (err,data)=>{
        
        if(err)return console.log("this is error in converting to text",err);
        try{
        // console.log("getter in node js after");
    
        
          await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          const { data: { text } } = await worker.recognize(data);
          console.log(text);
        //   await worker.terminate();
          fs.unlinkSync(`./upload/image/${req.file.originalname}`)
        
        }
        catch(err)
        {
            console.log(err);
        }
                  
    })
    
})



app.listen(3000,()=>{
    
    console.log(`server is running at ${3000}`)
})