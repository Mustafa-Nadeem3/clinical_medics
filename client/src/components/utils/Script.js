//Home
const isScrolling = () => {
  const navbarEl = document.querySelector('.navbar')
  let windowPosition = window.scrollY > 300
  navbarEl.classList.toggle('active', windowPosition)
}
window.addEventListener('scroll', isScrolling)

document.getElementById("send-btn").addEventListener("click", function () {
  sendMessage();
});

//Dashboard Calender
let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28
}

const generateCalendar = (month, year) => {

  let calendar_days = calendar.querySelector('.calendar-days')
  let calendar_header_year = calendar.querySelector('#year')

  let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  calendar_days.innerHTML = ''

  let currDate = new Date()
  if (month > 11 || month < 0) month = currDate.getMonth()
  if (!year) year = currDate.getFullYear()

  let curr_month = `${month_names[month]}`
  month_picker.innerHTML = curr_month
  calendar_header_year.innerHTML = year

  // get first day of month

  let first_day = new Date(year, month, 1)

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div')
    if (i >= first_day.getDay()) {
      day.classList.add('calendar-day-hover')
      day.innerHTML = i - first_day.getDay() + 1
      day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
      if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
        day.classList.add('curr-date')
      }
    }
    calendar_days.appendChild(day)
  }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
  let month = document.createElement('div')
  month.innerHTML = `<div data-month="${index}">${e}</div>`
  month.querySelector('div').onclick = () => {
    month_list.classList.remove('show')
    curr_month.value = index
    generateCalendar(index, curr_year.value)
  }
  month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
  month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
  --curr_year.value
  generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
  ++curr_year.value
  generateCalendar(curr_month.value, curr_year.value)
}

//Dashboard Chat
document.getElementById("message-input").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var messageText = messageInput.value.trim();

  if (messageText !== "") {
    var message = document.createElement("div");
    message.className = "message";
    message.innerHTML = '<div class="message-content">' + messageText + '</div>';
    document.getElementById("chat-body").appendChild(message);

    messageInput.value = "";
    messageInput.focus();
  }
}

// Edit Profile
// Get the necessary elements
export function editProfile() {
  const editElement = document.getElementById('edit');
  const editIcon = document.getElementById('edit-icon');

  // Add a click event listener to the edit icon
  editIcon.addEventListener('click', function () {
    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.value = editElement.innerText;

    // Replace the profile name with the input element
    editElement.parentNode.replaceChild(inputElement, editElement);

    // Focus on the input element
    inputElement.focus();

    // When the input element loses focus, update the profile name
    inputElement.addEventListener('blur', function () {
      // Get the updated value
      const updatedValue = inputElement.value;

      // Create a new span element
      const pElement = document.createElement('p');
      pElement.id = 'profile-name';
      pElement.innerText = updatedValue;

      // Replace the input element with the new p element
      inputElement.parentNode.replaceChild(pElement, inputElement);
    });
  });
}

