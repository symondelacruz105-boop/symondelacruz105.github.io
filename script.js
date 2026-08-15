function t(){clock.innerHTML=new Date().toLocaleString();}
setInterval(t,1000);t();


function openModal(id){
    document.getElementById(id).style.display = "flex";
}

function closeModal(id){
    document.getElementById(id).style.display = "none";
}


window.onclick = function(event){

    const schedule = document.getElementById("scheduleModal");
    const count = document.getElementById("countModol");
     const payroll = document.getElementById("payrollModel");

    if(event.target === schedule){
        schedule.style.display = "none";
    }

    if(event.target === count){
        count.style.display = "none";
    }

   if(event.target === payroll){
        payroll.style.display = "none";
    }

}

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();

/* Philippine National Holidays - 2026 */
const holidays = {
    "2026-01-01": {name:"New Year's Day", type:"regular"},
    "2026-02-17": {name:"Chinese New Year", type:"special"},
    "2026-03-20": {name:"Eid'l Fitr", type:"regular"},
    "2026-04-02": {name:"Maundy Thursday", type:"regular"},
    "2026-04-03": {name:"Good Friday", type:"regular"},
    "2026-04-04": {name:"Black Saturday", type:"special"},
    "2026-04-09": {name:"Araw ng Kagitingan", type:"regular"},
    "2026-05-01": {name:"Labor Day", type:"regular"},
    "2026-05-27": {name:"Eid'l Adha", type:"regular"},
    "2026-06-12": {name:"Independence Day", type:"regular"},
    "2026-08-21": {name:"Ninoy Aquino Day", type:"special"},
    "2026-08-31": {name:"National Heroes Day", type:"regular"},
    "2026-11-01": {name:"All Saints' Day", type:"special"},
    "2026-11-02": {name:"All Souls' Day", type:"special"},
    "2026-11-30": {name:"Bonifacio Day", type:"regular"},
    "2026-12-08": {name:"Feast of the Immaculate Conception", type:"special"},
    "2026-12-24": {name:"Christmas Eve", type:"special"},
    "2026-12-25": {name:"Christmas Day", type:"regular"},
    "2026-12-30": {name:"Rizal Day", type:"regular"},
    "2026-12-31": {name:"Last Day of the Year", type:"special"}
};

function renderCalendar(){
    calendar.innerHTML="";

    const year=currentDate.getFullYear();
    const month=currentDate.getMonth();
    const firstDay=new Date(year,month,1).getDay();
    const lastDate=new Date(year,month+1,0).getDate();

    monthYear.innerHTML=currentDate.toLocaleString("default",{
        month:"long", year:"numeric"
    });

    for(let i=0;i<firstDay;i++){
        calendar.innerHTML+='<div class="empty"></div>';
    }

    const today=new Date();

    for(let d=1;d<=lastDate;d++){
        const day=document.createElement("div");
        day.textContent=d;

        const dateKey=year+"-"+String(month+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");

        if(holidays[dateKey]){
            const holiday=holidays[dateKey];
            day.classList.add("holiday",holiday.type);
            day.title=holiday.name;

            const label=document.createElement("span");
            label.className="holiday-name";
            label.textContent=holiday.name;
            day.appendChild(label);
        }

        if(notes[dateKey]){
            day.classList.add("has-note");
            day.title=(day.title ? day.title+" | " : "")+notes[dateKey];
        }

        day.onclick=function(){ addNote(dateKey); };

        if(d===today.getDate() &&
           month===today.getMonth() &&
           year===today.getFullYear()){
            day.classList.add("today");
        }

        calendar.appendChild(day);
    }
}

function changeMonth(step){
    currentDate.setMonth(currentDate.getMonth()+step);
    renderCalendar();
}

let notes=JSON.parse(localStorage.getItem("calendarNotes"))||{};

function addNote(dateKey){
    const current=notes[dateKey]||"";
    const promptText=holidays[dateKey]
        ? "Holiday: "+holidays[dateKey].name+"\nEnter your note:"
        : "Enter your note:";

    const note=prompt(promptText,current);
    if(note===null)return;

    if(note.trim()==="") delete notes[dateKey];
    else notes[dateKey]=note;

    localStorage.setItem("calendarNotes",JSON.stringify(notes));
    renderCalendar();
}

renderCalendar();

function openApecValues(){

    const width = 1100;
    const height = 750;

    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(
        "apecvalues.html",
        "APECValues",
        `width=${width},
        height=${height},
        top=${top},
        left=${left},
        resizable=yes,
        scrollbars=yes,
        toolbar=no,
        menubar=no,
        location=no,
        status=no`
    );

}

/* Open every dashboard link in a centered popup window */
function openLinkPopup(url, windowName){
    const width = Math.min(1200, screen.width - 80);
    const height = Math.min(850, screen.height - 120);
    const left = Math.max(0, (screen.width - width) / 2);
    const top = Math.max(0, (screen.height - height) / 2);

    window.open(
        url,
        windowName,
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=yes,status=no`
    );
}
