const loadphones = async(search,datalimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
  displayphones(data.data, datalimit);
}



const displayphones = (phones,datalimit)=> {
   const phonecontainer = document.getElementById('phone-container')
   phonecontainer.innerText = '';
   const showall = document.getElementById('show-all');
   if(datalimit && phones.length > 10) {
   phones = phones.slice(0,10);
   showall.classList.remove('d-none');
   }
   else{
    showall.classList.add('d-none');
   }
   const nophn = document.getElementById('no-phone');
   if(phones.length === 0){
    nophn.classList.remove('d-none');
   }
   else{
    nophn.classList.add('d-none');
}
   phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML =`
    <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadphonedetail('${phone.slug}')" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#phonedetailmodal">Info</button>
                      
                    </div>
                  </div>
                  
            `;
            phonecontainer.appendChild(phoneDiv);
            
    
   });
   togglespinner(false);
}


const processsearch = (datalimit) =>{
  togglespinner(true);
  const inputfield = document.getElementById('input-field');
  const searchtext = inputfield.value ;
  loadphones(searchtext, datalimit);
}
document.getElementById('btn-search').addEventListener('click',function(){
   processsearch(10);
})

document.getElementById('input-field').addEventListener('keypress',function(e){
  if(e.key=== 'Enter'){
    processsearch(10);
  }
})



const togglespinner = isLoading => {
    const loadersec = document.getElementById('loader');
    if(isLoading){
        loadersec.classList.remove('d-none');
    }
    else
    {
        loadersec.classList.add('d-none');
    }
}
document.getElementById('btn-show-all').addEventListener('click',function(){
  processsearch();
})

const loadphonedetail = async id =>{
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayphndetail(data.data);
}

const displayphndetail = phone => {
  const modaltittle = document.getElementById('phonedetailmodalLabel');
  modaltittle.innerText = phone.name;
  const phndetail = document.getElementById('div-details');
  phndetail.innerHTML =`
  <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'No specific relese date'} </p>
  <p> Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage info'}
  <p> Others : ${phone.others ? phone.others.Bluetooth : 'No Bluetooth info'}`
}
loadphones('iphone');