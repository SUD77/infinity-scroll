const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];


//Unsplash API
const count = 30;
const apiKey='MKFOduiLnPyjb275zvoEcVgJsfSnkQ6FelveiiSX2vk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Check if all images were loaded
function imageLoaded() {
    
    imagesLoaded++;
    //console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;

        //hiding the loader 
        loader.hidden = true;

        //console.log('ready =',ready);
    }
}




//Helper funtion to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);

    }

}



//Create Elements for links & photos, Add to DOM
function displayPhotos() {

    imagesLoaded=0;
    totalImages = photosArray.length;
    //console.log('total images', totalImages);


    //Run funtion for each object in photosArray
    photosArray.forEach((photo) => {
        // Creating an anchor element (<a>) to link to Unsplash
        const item = document.createElement('a'); 
      
        setAttributes(item, {
            href: photo.links.html,
            target:'_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each is finsihed loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}



//Get pics from unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos();

    } catch (error){
        //Catch error here
    }
}


//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready) {
        ready = false;
        getPhotos();
        
    }
});

//On Load

getPhotos();
