

// console.log("start of image to text");
let image=document.querySelector("#upload-file");
let result=document.querySelector(".result-img");
let hide=document.querySelector(".hide");
let cropper="";
let save=document.querySelector(".save");
// let download=document.querySelector(".download");
let options=document.querySelector(".options");
let width=document.querySelector(".width");
let height=document.querySelector(".heigth")
let cropped_image=document.querySelector(".cropped_image");
let convert=document.querySelector(".convert")


let name="";
let file;

image.addEventListener("change",(e)=>{
    
    if(e.target.files.length)
    {
         name=e.target.files[0].name;
       
        const reader=new FileReader();
        reader.onload=(e)=>{
            
            if(e.target.result)
            {
                let img=document.createElement("img");
                img.src=e.target.result;
                img.id="uploaded-image";
                result.innerHtml="";
                result.appendChild(img);
                save.classList.remove("hide");
                options.classList.remove("hide");
                cropper=new Cropper(img);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        
        
    }
    
    
})



save.addEventListener("click",(e)=>{
    e.preventDefault();
    let imgSrc=cropper.getCroppedCanvas({
        width:width.value,
        height:height.value
    }).toDataURL();
   
    convert.classList.remove("hide");
    
    file=dataURLtoFile(imgSrc,name)

    
})



convert.addEventListener("click",(e)=>{
    
    let formData=new FormData();
   formData.append("image",file);
   
   axios.post("https://revanth-kumar-1.paiza-user-free.cloud:3000/getText",formData).then((data)=>{
       
       console.log("done successfully");
       
   }).catch((err)=>{
       console.log("eeror in save click",err);
   })
   

})

function dataURLtoFile(dataurl, filename) {
var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}


