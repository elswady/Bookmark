var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var nameAlert = document.getElementById('nameAlert')
var emailAlert = document.getElementById('emailAlert')
var addSite = document.getElementById('addSite')
var sitePattern = {
    siteName:/^[A-Za-z0-9-\s]{3,30}$/,
    siteUrl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/
}

var sitesList = []

sitesList = JSON.parse(localStorage.getItem('sites')) || []

displaySite()

var isNameValid = false
var isUrlValid = false
var isInputNameEmpty = false
var isInputUrlEmpty = false

function checkNameValidation(){
     if (sitePattern.siteName.test(siteName.value)){
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        nameAlert.classList.replace('d-block', 'd-none')
        isNameValid = true
    }else{
        siteName.classList.add('is-invalid')
        nameAlert.classList.replace('d-none', 'd-block')
        isNameValid = false
    }

    if(siteName.value == ''){
        isInputNameEmpty = false
    }else{
        isInputNameEmpty = true
    }
}

function checkUrlValidation(){
     if(sitePattern.siteUrl.test(siteUrl.value)){
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        emailAlert.classList.replace('d-block', 'd-none')
        isUrlValid = true
    }else{
        siteUrl.classList.add('is-invalid')
        emailAlert.classList.replace('d-none', 'd-block')
        isUrlValid = false
    }

    if(siteUrl.value == ''){
        isInputUrlEmpty = false
    }else{
        isInputUrlEmpty = true
    }
}

addSite.addEventListener('click', function(){

    checkNameValidation()
    checkUrlValidation()

    if(isInputNameEmpty == false || isInputUrlEmpty == false || isNameValid == false || isUrlValid == false){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Site Name or Url is not valid",
        });
    }
   
    if (isInputNameEmpty && isInputUrlEmpty &&  isNameValid && isUrlValid){
        var siteObject = {
            name: siteName.value,
            url: siteUrl.value
        }
        
    sitesList.push(siteObject)
    localStorage.setItem('sites', JSON.stringify(sitesList))
    displaySite()
    resetInput()
    }
    deletValidate()
})

function deletValidate(){
    var nameInput = document.getElementById('siteName')
    nameInput.classList.remove('is-valid')
    var urlInput = document.getElementById('siteUrl')
    urlInput.classList.remove('is-valid')
}

function displaySite(){
    var box = '';

    for(var i=0; i<sitesList.length; i++){
        box += `
            <tr>
                <td>${i+1}</td>
                <td>${sitesList[i].name}</td>
                <td>
                    <a href="${sitesList[i].url}" target="_blank" type="button"
                        ><span><i class="fa-solid fa-eye"></i></span> Visit</a
                        >
                </td>
                <td>
                    <button onclick="deletSite(${i})">
                        <span><i class="fa-solid fa-trash-can"></i></span> Delete
                    </button>
                </td>
            </tr>
        `
    }
    document.getElementById('demo').innerHTML= box
}

function resetInput(){
    siteName.value = ''
    siteUrl.value = ''
}

function deletSite(index){
    sitesList.splice(index,1)
    displaySite()
    localStorage.setItem('sites', JSON.stringify(sitesList))
}

siteName.addEventListener('input',checkNameValidation)

siteUrl.addEventListener('input',checkUrlValidation)
