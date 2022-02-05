
// Fetch the items from the JSON file
function loadItems() {
    return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the lists with the given items
function displayItems(items) {
    const container = document.querySelector(".items");
    container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if (key == null || value == null) {
        return;
    }

    const filtered = items.filter((item) => item[key] === value)
    // console.log(filtered);
    displayItems(filtered);
}

function setEventListeners(items) {
    const logo = document.querySelector(".logo");
    const buttons = document.querySelector(".buttons");
    logo.addEventListener("click", () => {
        displayItems(items);
    });
    buttons.addEventListener("click", (event) => onButtonClick(event, items))
}

// main
loadItems()
.then((items) => {
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log)

/*
// Button을 클릭할 때마다 업데이트 하지 않고, 클릭할 때 class를 visible, invisible로 바꾸면
// Handle button click
function onButtonClick(event, items) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;
    
    if (key == null || value == null) {
        return;
    }

    updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
function updateItems(items, key, value) {
    items.forEach((item) => {
        if (item.dataset[key] === value) {
            item.classList.remove("invisible") // invisible class에 대한 css code 추가 필요
        } else {
            item.classList.add("invisible")
        }
    })
}
*/