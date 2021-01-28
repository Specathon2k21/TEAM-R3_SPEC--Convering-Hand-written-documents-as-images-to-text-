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

const upload=require("./fileUpload.js");
app.post("/getText",upload.single("image"),(req,res)=>{
    
    
    fs.readFile(`./upload/image/${req.file.originalname.split(".")[0]+".png"}`, (err,data)=>{
        
        if(err)return console.log("this is error in converting to text",err);
        try{
        
        (async () => {
          await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          const { data: { text } } = await worker.recognize(data);
          console.log(text);
          await worker.terminate();
        })();
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