
let image=document.querySelector("#upload-file");
let result=document.querySelector(".result-img");
let hide=document.querySelector(".hide");
let cropper="";
let save=document.querySelector(".save");
let download=document.querySelector(".download");
let options=document.querySelector(".options");
let width=document.querySelector(".width");
let height=document.querySelector(".heigth")
image.addEventListener("change",(e)=>{
    
    if(e.target.files.length)
    {
        
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
    
    let imgSrc=cropper.getCroppedCanvas({
        width:width.value,
        height:height.value
    }).toDataURL();
    download.classList.remove("hide");
    
    console.log("image src",imgSrc)
    download.download="imagename.png";
    download.setAttribute("href",imgSrc);
    
    
})
