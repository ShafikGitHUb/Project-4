let interviewList = [];
let rejectedList = [];

const total = document.getElementById("total");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const availableCount = document.getElementById("availableCount");

const filterSection = document.getElementById("filter-section");
const allCardSection = document.getElementById("all-card");
const mainContainer = document.querySelector("main");

const allBtn = document.getElementById("all-filter-btn");
const interviewBtn = document.getElementById("interview-filter-btn");
const rejectedBtn = document.getElementById("rejected-filter-btn");

function calculateCount() {
    const totalCards = allCardSection.querySelectorAll(".card").length;
    total.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    const available = totalCards - interviewList.length - rejectedList.length;
    availableCount.innerText = available + " Jobs";
}

calculateCount();

function toggleStyle(id){
    const buttons = [allBtn, interviewBtn, rejectedBtn];
    buttons.forEach(btn => {
        btn.classList.remove('text-white');
        btn.classList.add('bg-gray-300','text-black');
        btn.style.backgroundColor="";
    });

    let activeBtn;
    if(id==='all-filter-btn'){
        activeBtn = allBtn;
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if(id==='interview-filter-btn'){
        activeBtn = interviewBtn;
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFilter(interviewList);
    } else if(id==='rejected-filter-btn'){
        activeBtn = rejectedBtn;
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFilter(rejectedList);
    }

    activeBtn.classList.remove('bg-gray-300','text-black');
    activeBtn.classList.add('text-white');
    activeBtn.style.backgroundColor = "#3B82F6";
}

mainContainer.addEventListener('click', function(event){
    const card = event.target.closest('.card');
    if(!card) return;

    const id = card.getAttribute('data-id');
    const plantName = card.querySelector('.plantName').innerText;
    const latinName = card.querySelector('.latinName').innerText;
    const light = card.querySelector('.light')?.innerText || "";
    const notes = card.querySelector('.notes').innerText;
    const statusText = card.querySelector('.status');

    // Interview button clicked
    if(event.target.classList.contains('interview-btn')){
        rejectedList = rejectedList.filter(p => p.id !== id);
        if(!interviewList.find(p=>p.id===id)){
            interviewList.push({id, plantName, latinName, light, status:'Interview', notes});
        }

        statusText.innerText = "Interview";
        calculateCount();
        if(!allCardSection.classList.contains('hidden')) return;
        renderFilter(interviewList);
    }

    if(event.target.classList.contains('rejected-btn')){
        interviewList = interviewList.filter(p => p.id !== id);
        if(!rejectedList.find(p=>p.id===id)){
            rejectedList.push({id, plantName, latinName, light, status:'Rejected', notes});
        }
        statusText.innerText = "Rejected";
        calculateCount();
        if(!allCardSection.classList.contains('hidden')) return;
        renderFilter(rejectedList);
    }

    if(event.target.tagName==="IMG"){
        interviewList = interviewList.filter(p => p.id !== id);
        rejectedList = rejectedList.filter(p => p.id !== id);
        card.remove();
        calculateCount();
        if(!allCardSection.classList.contains('hidden')) return;
        if(interviewBtn.style.backgroundColor==="rgb(59, 130, 246)") renderFilter(interviewList);
        if(rejectedBtn.style.backgroundColor==="rgb(59, 130, 246)") renderFilter(rejectedList);
    }
});

function renderFilter(list){
    filterSection.innerHTML='';
    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between p-8 bg-white shadow';
        div.setAttribute('data-id', item.id); 
        div.innerHTML = `
            <div class="left-card space-y-2">
                <div>
                    <p class="plantName text-[20px] font-bold">${item.plantName}</p>
                    <p class="latinName text-[#64748B]">${item.latinName}</p>
                </div>
                <div>
                    <p class="status">${item.status}</p>
                    <p class="notes text-[#64748B]">${item.notes}</p>
                </div>
                <div class="flex gap-[15px]">
                    <button class="interview-btn text-[#10B981] border px-4 py-2">Interview</button>
                    <button class="rejected-btn text-[#EF4444] border px-4 py-2">Rejected</button>
                </div>
            </div>
            <div class="right-card">
                <img src="delete.png" class="cursor-pointer">
            </div>
        `;
        filterSection.appendChild(div);
    });
}