let createbtn = document.getElementById("createPost-btn");
let postTab = document.getElementById("makePost");
let inputTitle = document.getElementById("input-title");
let inputText = document.getElementById("input-text");
let inputTags = document.getElementsByClassName("input-tags");
let postpost = document.getElementById("post-post");

const keyName = "myPost";
let saveData = [];


createbtn.addEventListener("click", function () {
    if (postTab.style.display === "none") {
        postTab.style.display = "flex";
        createbtn.innerText = "Close";
    } else {
        postTab.style.display = "none";
        createbtn.innerText = "Create Post";
    }
});



function renderPosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        let div = document.createElement("div");

        let title = document.createElement("h1");
        let body = document.createElement("h2")
        let tags = document.createElement("h3")
        let reactions = document.createElement("h3")

        title.innerText = post.title;
        body.innerText = post.body;
        tags.innerText = post.tags;
        reactions.innerText = post.reactions;

        div.append(title, body, tags, reactions);
        document.body.append(div);
    }
}

fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(function (res) {
        renderPosts(res.posts);
    });

function createPost() {
    let div = document.createElement("div");

    let title = document.createElement("h1");
    let body = document.createElement("h2");
    let tags = document.createElement("h3");
    /* let reactions = document.createElement("h3") */

    title.innerText = inputTitle.value;
    body.innerText = inputText.value;
    tags.innerText = `${inputTags[0].value},${inputTags[1].value},${inputTags[2].value} `

    saveData.push({
        title: inputTitle.value,
        body: inputText.value,
        tags: [inputTags[0].value, inputTags[1].value, inputTags[2].value]
    });
    

    div.append(title, body, tags);
    document.body.append(div);

    inputTitle.value = "";
    inputText.value = "";
    inputTags[0].value = "";
    inputTags[1].value = "";
    inputTags[2].value = "";
    postTab.style.display = "none";
    createbtn.innerText = "Create Post";

    storeData("myPost", saveData);
}

postpost.addEventListener("click", () => {
    createPost();

})


function storeData(key, data) {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
}


function getLocalStorage(key) {
    const json = localStorage.getItem(key);
    const data = JSON.parse(json);
    return data;
}

function renderLocalStorage() {

    let storedData = getLocalStorage("myPost");

    storedData.forEach(object => {
        let div = document.createElement("div");
        let title = document.createElement("h1");
        let body = document.createElement("h2")
        let tags = document.createElement("h3")
        let reactions = document.createElement("h3")

        title.innerText = object.title;
        body.innerText = object.body;
        tags.innerText = object.tags;
        reactions.innerText = object.reactions;

        div.append(title, body, tags, reactions);
        document.body.append(div);

    });
}

renderLocalStorage();

console.log(saveData);



