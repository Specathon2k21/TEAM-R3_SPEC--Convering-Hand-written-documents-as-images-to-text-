
const multer=require("multer");

const maxSize = 1 * 1000 * 22000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/image")
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname)
  },
})


const uploadStorage = multer({ 
    
    storage: storage ,
    
    limits: { fileSize: maxSize },
    // fileFilter: function (req, file, cb){ 
    
        
    //     const ext=file.originalname.split(".")[1];
        
    //     if(ext=="pdf" || ext=="docx" || ext=="txt")
    //     {
    //         return cb(null, true);
    //     }
    //     cb("Error: File upload only supports the "
    //             + "following filetypes - pdf/docx/txt" ); 
    //   } 
    
    
})

module.exports=uploadStorage;