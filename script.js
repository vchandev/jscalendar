const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

//Gets the current date
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let today = date.getDate();

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//This function will display the calendar according to the current month and year. It will check to see if the current date is on the calendar and make that date active.
//It will show that dates in the past are unclickable. If the date is in the future, it will be clickable.

const displayCalendar = () => {

    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let lastDayofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let liTag = "";

    for(let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li></li>`;
    }

    for(let i = 1; i <= lastDayofMonth; i++) {
        let isToday = "inactive";

        if(currentYear > date.getFullYear()) {
            isToday = "";
        } else if(i > today && currentMonth === new Date().getMonth()) {
            isToday = "";
        } else if(i === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
            isToday = "active";
        }

        liTag += `<li class="${isToday}">${i}</li>`;
        
    };

    //display the current month and year
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;

    const liTags = document.querySelectorAll('li');

    //when the user clicks on a clickable date, it will turn green
    liTags.forEach(li => {
    li.addEventListener('click', () => {
        liTags.forEach(tag => tag.style.background = ''); 
        li.style.background = 'green';
        li.style.borderRadius = '50%';
    });
    });

    //All of the dates in the past will be unclickable
    liTags.forEach(li => {
        if(li.classList.contains('inactive')) {
        li.removeEventListener('click', () => {
            return;
        });
        }
    });
    
}

displayCalendar();

//When the user clicks on the previous or next month, the calendar will change to the previous or next month.
//When the year advances to the next year, the calendar will change to the next year. The same will happen when the user goes into the previous year.
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth, 1);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        } else {
            date = new Date();
        }
        displayCalendar();
    });
});



