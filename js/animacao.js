document.addEventListener('DOMContentLoaded',() =>{
    new TypeIt(".animated", {
        speed:200,
        waitUntilVisible: true
    }).type('', {delay:1000})
    
    .go();
})