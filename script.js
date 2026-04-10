const nameInput = document.getElementById('nameInput');
const greeting = document.getElementById('greeting');
const wrapper = document.getElementById('input-wrapper');
const birthday = document.getElementById('birthday');

nameInput.addEventListener('keypress', function (e) {
    // Check if the pressed key is 'Enter'
    if (e.key === 'Enter') {
        const userName = nameInput.value.trim();

        // Only proceed if the user actually typed something -- validate if the name is valid
        if (userName !== "") {
            // 1. Set the new text
            greeting.textContent = `Hi ${userName}!`;
            birthday.style.display = 'block'; 
            
            // 2. Hide or remove the input field
            wrapper.style.display = 'none'; 
            
            // 3. Optional: Add a class for a fade-in effect if you have CSS for it
            greeting.classList.add('fade-in');
        }
    }
});

document.getElementById("birthday").addEventListener("change", function () {
    const inputDate = new Date(this.value);
    const today = new Date();
    const message = document.getElementById("message");

    const birthMonth = inputDate.getMonth(); // 0-11
    const birthDay = inputDate.getDate();

    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // current day == birthday
if (birthMonth === currentMonth && birthDay === currentDay) {
     message.textContent = "🎈 Hey! It's your birthday today.";
  }

 else if (birthMonth < currentMonth || (birthMonth === currentMonth && birthDay < currentDay)) {
    return "🎈 Belated Happy Birthday!";
  } 
  else {
    return "🚀 Advance Happy Birthday!";
  } 
//   else if{
//     return "🚀 Advance Happy Birthday!";
//   }
// else if (birthMonth >= currentMonth && birthDay > currentDay) {
//     message.textContent = "🎈 Advance Happy Birthday!";
// }
// else if (
//     birthMonth < currentMonth ||
//     (birthMonth === currentMonth && birthDay < currentDay)
// ) {
//     message.textContent = "🎂 Belated Happy Birthday!";
// }
// else if (
//     birthMonth > currentMonth ||
//     (birthMonth === currentMonth && birthDay > currentDay)
// ) {
//     message.textContent = "🎉 Your birthday is coming soon!";
// }
// else {
//         message.textContent = "Please enter your birthday.";
//     }
});