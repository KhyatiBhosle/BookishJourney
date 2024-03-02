var next1 = document.querySelector("#next1");
var next2 = document.querySelector("#next2");

var part1 = document.querySelector("#part1");
var part2 = document.querySelector("#part2");
var part3 = document.querySelector("#part3");

var previous1 = document.querySelector("#previous1");
var previous2 = document.querySelector("#previous2");

var ratings = document.querySelectorAll(".rating");

ratings.forEach((rating, index) => {
     rating.addEventListener('click', ()=>{
        document.getElementById("rating").value = index + 1;
        for(var i = 0; i <= index; i++){
            ratings[i].classList.add("fa-solid")
        }
        for(var j = index+1; j<5; j++){
            ratings[j].classList.remove("fa-solid");
        }
     })
})

console.log(part2);
if(part2!= null){
    next1.addEventListener("click", ()=>{
        part1.style.display = "none";
        part2.style.display = "block";
    })
    
    next2.addEventListener("click", () => {
        part2.style.display = "none";
        part3.style.display = "block";
    })
    
    previous1.addEventListener("click", () =>{
        part1.style.display = "block";
        part2.style.display = "none";
    })
    
    previous2.addEventListener("click", () => {
        part2.style.display = "block";
        part3.style.display = "none";
    })
}else if(part2 === null){
    next1.addEventListener("click", ()=>{
        part1.style.display = "none";
        part3.style.display = "block";
    })

    previous2.addEventListener("click", () => {
        part1.style.display = "block";
        part3.style.display = "none";
    })
}
