function myFunction(x){
    if(x.matches){
        document.body.style.zoom="100%";
    }else{
    	document.body.style.zoom="80%";
    }   
} 
if (matchMedia) {
	    const x = window.matchMedia("(max-width: 1020px)");
        x.addListener(myFunction);
        myFunction(x);
}

TweenMax.to(".loader", 2.2, {
    delay: 5,
    top: "-100%",
    ease: Expo.easeInOut
});

TweenMax.from(".scrollIndicator", 2, {
    delay: 10,
    y: -10,
    opacity: 0,
    ease: Expo.easeInOut
});