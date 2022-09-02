
const loadPhone = async(value,searchlimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    displyData(data.data, searchlimit)
    // console.log(data)
}

const displyData= (data , searchlimit) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = ``
    const showAll = document.getElementById('show-all')

    if(searchlimit && data.length>searchlimit){
        
        data = data.slice(0,searchlimit)
        showAll.classList.remove('d-none')

    }
    else(
        showAll.classList.add('d-none')
    )
        // console.log(data)
    const errorMgs  = document.getElementById('error-mgs')
    if(data.length === 0){
        errorMgs.classList.remove('d-none')
        lodeing(false)
    }
    else{
        errorMgs.classList.add('d-none')
    }
    data.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('phone-container')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="getDetails('${phone.slug}')" class='btn btn-danger'> Details </button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneDiv)
        lodeing(false)
    });
}
document.getElementById('search-phn').addEventListener('click', () =>{
    searchProsses(10)
})

document.getElementById('input-phone').addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        searchProsses(10)
    }
});

function lodeing(isSpener){
    const spenner = document.getElementById('spenner')
    if(isSpener == true){
        spenner.classList.remove('d-none')
    }
    if (isSpener == false){
        spenner.classList.add('d-none')
    }
}
function searchProsses(searchlimit){
    const inputPhone  = document.getElementById('input-phone')
    const inputValue = inputPhone.value
    loadPhone(inputValue, searchlimit)
    // inputPhone.value = ``
    lodeing(true)
    // console.log(inputValue)
}

const getDetails = async(id)=>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data)
}

document.getElementById('show-all').addEventListener('click', () =>{
    searchProsses()
})