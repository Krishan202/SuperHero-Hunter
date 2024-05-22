const resultContainer = document.getElementById("result-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const myFavorite = [];
const favSpan = document.getElementById("favorite-list");
const listData = document.getElementById("list-data");
let url = `
    https://gateway.marvel.com:443/v1/public/characters?ts=1715725383803&apikey=f409b6f99fb4bff92ff1537cf1ff0c8f&hash=22bc84df8146ffdacdb20f01655d1780
    `;

document.addEventListener("DOMContentLoaded", async () => {
  const fetchData = await fetch(url);
  const res = await fetchData.json();
  const result = res.data.results;
  // console.log(result);
  const resultLength = result.length;
  for (let i = 0; i < resultLength; i++) {
    const div = document.createElement("div");
    div.classList.add("superhero-div");
    const img = document.createElement("img");
    img.classList.add("superhero-img");
    img.src = result[i].thumbnail.path + ".jpg";
    div.appendChild(img);
    const name = document.createElement("h3");
    name.classList.add("name");
    name.textContent = result[i].name;
    div.appendChild(name);
    const description = document.createElement("p");
    description.classList.add("description");
    if (result[i].description === "") {
      description.textContent = `Empty description...`;
    } else {
      description.textContent = result[i].description;
    }
    div.appendChild(description);
    const favorite = document.createElement("div");
    favorite.classList.add("favorite");
    const para = document.createElement("span");
    para.classList.add("para");
    para.textContent = `add to favlist`;
    favorite.appendChild(para);
    const icon = document.createElement("span");
    icon.classList.add("icon", "blank");
    icon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    favorite.appendChild(icon);
    div.appendChild(favorite);
    const knowMore = document.createElement("p");
    knowMore.classList.add("know-more");
    knowMore.textContent = "know-more..";
    div.appendChild(knowMore);
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-button");
    removeBtn.textContent = "X";
    removeBtn.style.display = "none";
    div.appendChild(removeBtn);
    resultContainer.appendChild(div);
  }

  const iconElement = document.querySelectorAll(".icon");
  // console.log(iconElement);
  const len = iconElement.length;
  for (let i = 0; i < len; i++) {
    iconElement[i].addEventListener("click", () => {
      iconElement[i].innerHTML = `<i class="fa-solid fa-heart"></i>`;
      iconElement[i].style.color = "red";
      myFavorite.push(iconElement[i].parentElement.parentElement);
      // console.log(myFavorite);
      const removeElement = document.querySelectorAll(".remove-button");
      removeElement[i].style.display = "block";
      removeElement[i].addEventListener("click", (e) => {
        iconElement[i].innerHTML = `<i class="fa-regular fa-heart"></i>`;
        const element = e.target.parentElement;
        const indexOfEl = myFavorite.indexOf(element);
        // console.log(indexOfEl);
        // console.log(e.target.parentElement)
        myFavorite.splice(indexOfEl, 1);
        removeElement[i].style.display = "none";
      });
    });
  }

  superHeroPage();
});

searchBtn.addEventListener("click", async () => {
  listData.style.display = 'none';
  const inpVal = searchInput.value.trim().toLowerCase();
  // console.log(inpVal);
  url = `https://gateway.marvel.com:443/v1/public/characters?ts=1715725383803&apikey=f409b6f99fb4bff92ff1537cf1ff0c8f&hash=22bc84df8146ffdacdb20f01655d1780&name=${inpVal}`;
  const fetchData = await fetch(url);
  const res = await fetchData.json();
  // console.log(res);
  const result = res.data.results[0];
  // console.log(result);
  const searchResult = document.createElement("div");
  const div = document.createElement("div");
  div.classList.add("superhero-div");
  const img = document.createElement("img");
  img.classList.add("superhero-img");
  img.src = result.thumbnail.path + ".jpg";
  div.appendChild(img);
  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = result.name;
  div.appendChild(name);
  const description = document.createElement("p");
  description.classList.add("description");
  if (result.description === "") {
    description.textContent = `Empty description...`;
  } else {
    description.textContent = result.description;
  }
  div.appendChild(description);
  const favorite = document.createElement("div");
  favorite.classList.add("favorite");
  const para = document.createElement("span");
  para.classList.add("para");
  para.textContent = `add to favlist`;
  favorite.appendChild(para);
  const icon = document.createElement("span");
  icon.classList.add("icon", "blank");
  icon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  favorite.appendChild(icon);
  div.appendChild(favorite);
  const knowMore = document.createElement("p");
  knowMore.classList.add("know-more");
  knowMore.textContent = "know-more..";
  div.appendChild(knowMore);
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-button");
  removeBtn.textContent = "X";
  removeBtn.style.display = "none";
  div.appendChild(removeBtn);
  searchResult.appendChild(div);
  resultContainer.innerHTML = searchResult.innerHTML;

  const iconElement = document.querySelectorAll(".icon");
  const len = iconElement.length;
  for (let i = 0; i < len; i++) {
    iconElement[i].addEventListener("click", () => {
      iconElement[i].innerHTML = `<i class="fa-solid fa-heart"></i>`;
      iconElement[i].style.color = "red";
      myFavorite.push(iconElement[i].parentElement.parentElement);
      const removeElement = document.querySelectorAll(".remove-button");
      removeElement[i].style.display = "block";
      removeElement[i].addEventListener("click", (e) => {
        iconElement[i].innerHTML = `<i class="fa-regular fa-heart"></i>`;
        const element = e.target.parentElement;
        const indexOfEl = myFavorite.indexOf(element);
        // console.log(indexOfEl);
        // console.log(e.target.parentElement)
        myFavorite.splice(indexOfEl, 1);
        removeElement[i].style.display = "none";
      });
    });
  }
  superHeroPage();
});

function superHeroPage() {
  const knowMoreEl = document.querySelectorAll(".know-more");
  const knowMoreElLen = knowMoreEl.length;
  for (let i = 0; i < knowMoreElLen; i++) {
    // console.log(knowMoreEl[i].parentElement)
    knowMoreEl[i].addEventListener("click", async (e) => {
      // window.location.href = './details.html';
      // console.log(e.target.parentElement.childNodes[1].textContent);
      const name = e.target.parentElement.childNodes[1].textContent;
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1715725383803&apikey=f409b6f99fb4bff92ff1537cf1ff0c8f&hash=22bc84df8146ffdacdb20f01655d1780&name=${name}`;
      const fetchData = await fetch(url);
      const res = await fetchData.json();
      // console.log(res.data.results[0]);
      const result = res.data.results[0];

      const detailsPage = document.createElement("div");
      detailsPage.classList.add("superhero-details");
      const detailsName = document.createElement("h2");
      detailsName.classList.add("details-name");
      detailsName.textContent = result.name;
      detailsPage.appendChild(detailsName);
      const detailsImage = document.createElement("img");
      detailsImage.src = result.thumbnail.path + ".jpg";
      detailsPage.appendChild(detailsImage);
      const detailsComics = document.createElement("ul");
      const comicsHeading = document.createElement("h3");
      comicsHeading.textContent = `Comics`;
      detailsComics.appendChild(comicsHeading);
      detailsComics.classList.add("detailsComics");
      const comicsData = result.comics.items;
      // comicsData.forEach((item)=>console.log(item.name))
      // console.log(comicsData);
      comicsData.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("list-name");
        li.textContent = item.name;
        detailsComics.appendChild(li);
      });
      detailsPage.appendChild(detailsComics);
      // events
      const detailsEvents = document.createElement("ul");
      const eventsHeading = document.createElement("h3");
      eventsHeading.textContent = `Events`;
      detailsEvents.appendChild(eventsHeading);
      detailsEvents.classList.add("detailsEvents");
      const eventsData = result.events.items;
      // comicsData.forEach((item)=>console.log(item.name))
      // console.log(comicsData);
      if (eventsData.length === 0) {
        const para = document.createElement("p");
        para.textContent = `no events for ${result.name}`;
        detailsEvents.appendChild(para);
      } else {
        eventsData.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("list-name");
          li.textContent = item.name;
          detailsEvents.appendChild(li);
        });
      }

      detailsPage.appendChild(detailsEvents);

      // series

      const detailsSeries = document.createElement("ul");
      const seriesHeading = document.createElement("h3");
      seriesHeading.textContent = `Series`;
      detailsSeries.appendChild(seriesHeading);
      detailsSeries.classList.add("detailsSeries");
      const seriesData = result.series.items;
      // comicsData.forEach((item)=>console.log(item.name))
      // console.log(comicsData);
      if (seriesData.length === 0) {
        const para = document.createElement("p");
        para.textContent = `no series for ${result.name}`;
        detailsSeries.appendChild(para);
      } else {
        seriesData.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("list-name");
          li.textContent = item.name;
          detailsSeries.appendChild(li);
        });
      }

      detailsPage.appendChild(detailsSeries);

      // stories

      const detailsStories = document.createElement("ul");
      const storiesHeading = document.createElement("h3");
      storiesHeading.textContent = `Stories`;
      detailsStories.appendChild(storiesHeading);
      detailsSeries.classList.add("detailsStories");
      const storiesData = result.stories.items;
      if (storiesData.length === 0) {
        const para = document.createElement("p");
        para.textContent = `no series for ${result.name}`;
        detailsStories.appendChild(para);
      } else {
        storiesData.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("list-name");
          li.textContent = item.name;
          detailsStories.appendChild(li);
        });
      }

      detailsPage.appendChild(detailsStories);

      resultContainer.innerHTML = detailsPage.innerHTML;
    });
  }
}

favSpan.addEventListener("click", renderMyFav);

function renderMyFav() {
  const myList = myFavorite;
  const len = myList.length;
  const wrapper = document.createElement("div");
  for (let i = 0; i < len; i++) {
    wrapper.appendChild(myList[i]);
  }
  resultContainer.innerHTML = wrapper.innerHTML;
  removeBtn();
  superHeroPage();
  if (myList.length === 0) {
    alert("You have no favorite superheroes selected");
    window.location.href = "./index.html";
  }
}

function removeBtn() {
  const removeBtnEl = document.querySelectorAll(".remove-button");
  // console.log(removeBtnEl)
  const removeBtnElLen = removeBtnEl.length;
  for (let i = 0; i < removeBtnElLen; i++) {
    removeBtnEl[i].addEventListener("click", (e) => {
      // console.log(e.target.parentElement)
      const element = myFavorite[i];
      // console.log(element);
      // console.log(myFavorite);
      myFavorite.splice(i, 1);
      // console.log(myFavorite);
      // console.log(e.target.parentElement.childNodes[3].childNodes[1].innerHTML)
      // e.target.parentElement.childNodes[]
      const iconEl = e.target.parentElement.childNodes[3].childNodes[1];
      iconEl.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      renderMyFav();
    });
  }
}

searchInput.addEventListener("keyup", async (e) => {
  // console.log(e.target.value);
  const value = e.target.value.toLowerCase();
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1715725383803&apikey=f409b6f99fb4bff92ff1537cf1ff0c8f&hash=22bc84df8146ffdacdb20f01655d1780`;
  const fetchData = await fetch(url);
  const res = await fetchData.json();
  const length = res.data.results.length;
  // console.log(length);
  const jsonData = [];
  for (let i = 0; i < length; i++) {
    jsonData.push(res.data.results[i].name);
  }
  // console.log(jsonData)

  const requireData = jsonData.filter((item) =>
    item.toLowerCase().includes(value)
  );
  const requireDataLen = requireData.length;
  // requireData.forEach((item)=>console.log(item));
  
  for (let i = 0; i < requireDataLen; i++) {
    const li = document.createElement("li");
    li.classList.add("list");
    li.textContent = requireData[i];
    listData.appendChild(li);
    listData.style.display = "block";
    // setInterval(()=>{
    //   listData.style.display = "none";
    // },3000)
  }

  const allList = document.querySelectorAll(".list");
  const allListLen = allList.length;
  for (let i = 0; i < allListLen; i++) {
    allList[i].addEventListener("click", async (e) => {
      // console.log(e.target.textContent);
      const listName = e.target.textContent;
      // console.log(listName);
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1715725383803&apikey=f409b6f99fb4bff92ff1537cf1ff0c8f&hash=22bc84df8146ffdacdb20f01655d1780&name=${listName}`;
      const fetchData = await fetch(url);
      const res = await fetchData.json();
      // console.log(res);
      const result = res.data.results[0];
      // console.log(result);
      const searchResult = document.createElement("div");
      const div = document.createElement("div");
      div.classList.add("superhero-div");
      const img = document.createElement("img");
      img.classList.add("superhero-img");
      img.src = result.thumbnail.path + ".jpg";
      div.appendChild(img);
      const name = document.createElement("h3");
      name.classList.add("name");
      name.textContent = result.name;
      div.appendChild(name);
      const description = document.createElement("p");
      description.classList.add("description");
      if (result.description === "") {
        description.textContent = `Empty description...`;
      } else {
        description.textContent = result.description;
      }
      div.appendChild(description);
      const favorite = document.createElement("div");
      favorite.classList.add("favorite");
      const para = document.createElement("span");
      para.classList.add("para");
      para.textContent = `add to favlist`;
      favorite.appendChild(para);
      const icon = document.createElement("span");
      icon.classList.add("icon", "blank");
      icon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      favorite.appendChild(icon);
      div.appendChild(favorite);
      const knowMore = document.createElement("p");
      knowMore.classList.add("know-more");
      knowMore.textContent = "know-more..";
      div.appendChild(knowMore);
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-button");
      removeBtn.textContent = "X";
      removeBtn.style.display = "none";
      div.appendChild(removeBtn);
      searchResult.appendChild(div);
      resultContainer.innerHTML = searchResult.innerHTML;

      const iconElement = document.querySelectorAll(".icon");
      const len = iconElement.length;
      for (let i = 0; i < len; i++) {
        iconElement[i].addEventListener("click", () => {
          iconElement[i].innerHTML = `<i class="fa-solid fa-heart"></i>`;
          iconElement[i].style.color = "red";
          myFavorite.push(iconElement[i].parentElement.parentElement);
          const removeElement = document.querySelectorAll(".remove-button");
          removeElement[i].style.display = "block";
          removeElement[i].addEventListener("click", (e) => {
            iconElement[i].innerHTML = `<i class="fa-regular fa-heart"></i>`;
            const element = e.target.parentElement;
            const indexOfEl = myFavorite.indexOf(element);
            // console.log(indexOfEl);
            // console.log(e.target.parentElement)
            myFavorite.splice(indexOfEl, 1);
            removeElement[i].style.display = "none";
          });
        });
      }
      listData.style.display = "none";
      superHeroPage();
    });
  }
});
