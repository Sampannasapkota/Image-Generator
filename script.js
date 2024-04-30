const accessKey="LIn0hN-r2e767MjZFa5fv-fTB4XjTsgy1WbNhnmPr90"
const formE1= document.querySelector("form")
const inputE1= document.getElementById("search-input")
const searchResults= document.querySelector(".search-results")
const showMore= document.getElementById("show-more-button")

let inputData= ""
let page = 1;

async function searchImages()
{
 try{
    
    inputData= inputE1.value;
    const url = `https://api.unsplash.com/photos?page=${page}&query=${inputData}&client_id=${accessKey}`


    const response = await fetch(url)
    const data = await response.json()
    // console.log(data); // Log the response data to inspect its structure
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid or missing results data');
    }
       
    const results= data.results

    if(page === 1)
    {
        searchResults.innerHTML = ""

    }
    // if (data.results && Array.isArray(data.results)) {
    //     const results = data.results;}
    results.map((result) =>
    {
       const imageWrapper = document.createElement('div')
       imageWrapper.classList.add("search-result") 
       const image = document.createElement('img')
       image.src= result.urls.small
       image.alt= result.alt_description
       const imageLink = document.createElement('a')
       imageLink.href = result.links.html;

       imageLink.target = '_blank'
       imageLink.textContent = result.alt_description

       imageWrapper.appendChild(image)
       imageWrapper.appendChild(imageLink)
       searchResults.appendChild(imageWrapper)

    });
    page++
    if(page > 1)
    {
        showMore.style.display= 'block'

    }
    
    }
    catch (error) {
        console.error('Error fetching data:', error);
   
}
}
        

formE1.addEventListener("submit", (event) =>
{
    event.preventDefault()
    page=1;
    searchImages()

})

showMore.addEventListener("click", () =>
{
    
    searchImages()

})