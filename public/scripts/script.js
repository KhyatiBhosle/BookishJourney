var covers = document.querySelectorAll(".cover");
var finalCover = document.querySelector("#link");
var description = document.querySelector(".description");

covers.forEach((cover)=>{
    cover.addEventListener('load', (event)=>{
        if(event.target.width === 1){
            cover.remove();
        }
    })
    cover.addEventListener("click", (event)=>{
        finalCover.value = cover.src;
        cover.style.transform = 'scale(1.2)';
        cover.style.filter = "brightness(100%)";
    })
});