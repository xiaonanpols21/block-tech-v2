console.log("Profile")

// const productContainers = document.querySelectorAll('.main-profile section');
// const nxtBtn = document.querySelectorAll('.slider-btns button:last-of-type');
// const preBtn = document.querySelectorAll('.slider-btns button:first-of-type');

// productContainers.forEach((item, i) => {
//     let containerDimensions = item.getBoundingClientRect();
//     let containerWidth = containerDimensions.width;

//     nxtBtn[i].addEventListener('click', () => {
//         item.scrollLeft += containerWidth;
//     })

//     preBtn[i].addEventListener('click', () => {
//         item.scrollLeft -= containerWidth;
//     })
// })

/*
The item() method returns the node at a specified index in a NodeList.
There are two ways to access a node at a specified index:
Bron: https://www.w3schools.com/jsref/met_nodelist_item.asp#:~:text=The%20item()%20method%20returns,item(index)

i is to make sure that i is a number (either float or int). 
Given what the function is doing, it was better to convert i to an non-decimal 
value though, I'm not sure how slice handles decimals.
Bron: https://stackoverflow.com/questions/9533484/what-does-i-i-mean-in-javascript

The getBoundingClientRect() method returns the size of an element and its 
position relative to the viewport.
Bron: https://www.w3schools.com/jsref/met_element_getboundingclientrect.asp#:~:text=The%20getBoundingClientRect()%20method%20returns,position%20relative%20to%20the%20viewport.
*/

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
    });
}, {
    threshold: 1,
});

cards.forEach(card => {

    observer.observe(card);
});
