import { createClient } from 'pexels';
import refs from "./refs.js";
const { videoGallery, form } = refs;
console.log(videoGallery);
console.log(form);
const key = "563492ad6f917000010000015719382006214cf38ab2830e968ef884";
const client = createClient(key);
console.log(client);

let per_page = 1;
let locale = "uk-UA";
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchItem = event.target.elements.search.value;
    getFetch(searchItem);
  });
  
  // Якщо співпадають назви ключі і значень
  function getFetch(query) {
    client.videos.search({ query, per_page, locale }).then((response) => {
      // console.log(response);
      console.log(response.videos);
      response.videos.map((video) => {
        console.log(video);
        const videoWrapper = document.createElement("li");
        const videoItem = document.createElement("video");
        videoItem.setAttribute("src", video.video_files[0].link);
        videoItem.setAttribute("controls", null);
        videoItem.setAttribute("poster", video.image);
        const imageItem = document.createElement("img");
        imageItem.src = video.image;
        const picturesList = document.createElement("ul");
        picturesList.classList.add("picturesList");
            const items = video.video_pictures.map((image) => {
            // console.log(image);
            const item = document.createElement("li");
            const picture = document.createElement("img");
            picture.src = image.picture;
            item.appendChild(picture);
            return item;
          });
          // console.log("items", items);
          picturesList.append(...items);
          videoWrapper.append(videoItem, picturesList);
          videoGallery.append(videoWrapper);
        });
      });
    }