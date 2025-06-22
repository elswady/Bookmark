var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')

var sitesList = []

sitesList = JSON.parse(localStorage.getItem('sites')) || []

displaySite()

var isFormValid = false

function addSite(){
    if (isFormValid){
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
     
}

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

var sitePattern = {
    siteName:/^[A-Za-z0-9-\s]{3,15}$/,
    siteUrl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/
}

function validate(input){
    if (sitePattern[input.id].test(input.value)){
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        isFormValid = true
    }else{
        input.classList.add('is-invalid')
        // input.classList.remov('is-valid')
        isFormValid = false
    }
}
