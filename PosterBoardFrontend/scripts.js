const createPostButton = document.getElementById('createPostButton')
const informationButton = document.getElementById('infoButton')
const createPost = document.getElementById('createPost')
const postTextBox = document.getElementById('postTextBox')
const uploadImageButton = document.getElementById('imageButton')
const createButton = document.getElementById('submitButton')
const allPostDiv = document.getElementById('allPosts') 
const imageSelected = document.getElementById('imageSelectedText')
const postText = document.getElementById('postTextArea')
const informationDiv = document.getElementById('info')
const domain = "http://localhost:8080" //If this project is hosted on a website, this variable should be switched to the website's domain


createPost.style.display = "none"
informationDiv.style.display = "none"

function getAllPosts(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let storage = JSON.parse(getAllPosts(domain+'/data'))
//This loop loads all existing posts
for (const text1 in storage) {
    const image1 = storage[text1]

    curImage = document.createElement('img')
    curText = document.createElement('p')
    curPostDiv = document.createElement('div')
    imageDiv = document.createElement('div')

    imageDiv.className += "postImageDiv"
    curPostDiv.className += "post"
    curText.innerText = text1
    curImage.src = image1
    curImage.style.width = "100px"
    curImage.style.height = "100px"
    curImage.style.float = "right"

    curPostDiv.appendChild(curText)
    if (isImage(image1)) {
        imageDiv.appendChild(curImage)
        curPostDiv.appendChild(imageDiv)
    }

    allPostDiv.appendChild(curPostDiv)
}

function createNewPost(url, bodyInfo) {
    var xmlHttp = new XMLHttpRequest();
    [texts, imageUrl] = bodyInfo
    xmlHttp.open("POST", url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({ info: [texts, imageUrl] }));
    return xmlHttp.responseText
}

function deleteAllPosts(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", url, false);
    xmlHttp.send(null)
    return xmlHttp.responseText
}

function isImage(url) {
    return /\.(jpg|jpeg|png|gif|svg)$/.test(url);
}

//Delete all posts at midnight
curTime = new Date()
if (curTime.getHours() == 0) {
    deleteAllPosts(domain + "/midnight")
}

createPostButton.addEventListener('click', () => {
    if (createPost.style.display == "none")
        createPost.style.display = "block"
    else
        createPost.style.display = "none"
})

informationButton.addEventListener('click', () => {
    if (informationDiv.style.display == "none")
        informationDiv.style.display = "block"
    else
        informationDiv.style.display = "none"
})

createButton.addEventListener('click', () => {
    curImage = document.createElement('img')
    curText = document.createElement('p')
    curPostDiv = document.createElement('div')
    imageDiv = document.createElement('div')

    imageDiv.className += "postImageDiv"
    curPostDiv.className += "post"
    curText.innerText = postText.value
    curImage.src = imageSelected.value
    curImage.style.width = "100px"
    curImage.style.height = "100px"
    curImage.style.float = "right"

    curPostDiv.appendChild(curText)

    if (isImage(imageSelected.value)) {
        imageDiv.appendChild(curImage)
        curPostDiv.appendChild(imageDiv)
    }

    allPostDiv.appendChild(curPostDiv)

    //store the current post
    createNewPost(domain + '/newPost', [postText.value, imageSelected.value])
    
    createPost.style.display = "none"
    postText.value = ""
    imageSelected.value = ""
})