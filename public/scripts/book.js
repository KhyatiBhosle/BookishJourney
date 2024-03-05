var div1 = document.querySelector(".div1");
var div2 = document.querySelector(".div2");
var readMore1 = document.querySelector(".readMore1");
var readMore2 = document.querySelector(".readMore2");
var showLess1 = document.querySelector(".showLess1");
var showLess2 = document.querySelector(".showLess2");

readMore1.addEventListener('click', function(){
    div1.classList.add('visibility');
    readMore1.style.display = 'none';
    showLess1.style.display = 'inline-block';
});

readMore2.addEventListener('click', function(){
    div2.classList.add('visibility');
    readMore2.style.display = 'none';
    showLess2.style.display = 'inline-block';
});

showLess1.addEventListener('click', function(){
    div1.classList.remove('visibility')
    readMore1.style.display = 'inline-block';
    showLess1.style.display = 'none';
});

showLess2.addEventListener('click', function(){
    div2.classList.remove('visibility')
    readMore2.style.display = 'inline-block';
    showLess2.style.display = 'none';
});