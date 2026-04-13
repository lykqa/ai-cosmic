/**
 * Global UI Elements
 * Cached for performance to avoid repeated DOM queries.
 */
const loadingSection = document.getElementById("loadingSection");
const resultSection = document.getElementById("resultSection");
const resultTitle = document.getElementById("resultTitle");
const message = document.getElementById("message");
const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const submitBtn = document.getElementById("submitBtn");
const birthInput = document.getElementById("birthInput");
const birthError = document.getElementById("birthError");
const greeting = document.getElementById("greeting");
const intro = document.getElementById("intro");
let dotsInterval;


// Initialize application state
loadingSection.classList.add("hidden");
resultSection.classList.add("hidden");

/**
 * Configure Date Constraints
 * Restricts birthdate input to a 120-year window ending today.
 */
const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);
const todayStr = todayDate.toISOString().split("T")[0];
birthInput.setAttribute("max", todayStr);

const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 120);
const minStr = minDate.toISOString().split("T")[0];
birthInput.setAttribute("min", minStr);

/**
 * Event Listeners
 */
submitBtn.addEventListener("click", handleSubmit);
nameInput.addEventListener("input", () => clearError(nameError, nameInput));
birthInput.addEventListener("input", () => clearError(birthError, birthInput));

// Interactive background effect based on viewport coordinates
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.body.style.setProperty("--x", x + "%");
  document.body.style.setProperty("--y", y + "%");
});

/**
 * Validates user input and manages the transition to the result view.
 */
function handleSubmit() {
  const userName = nameInput.value.trim();
  const birthdate = birthInput.value;

  clearError(nameError, nameInput);
  clearError(birthError, birthInput);

  // Validation Logic
  const nameRegex = /^[A-Za-z\s'-]+$/;
  if (userName === "") {
    showError(nameError, nameInput, "Please enter your name.");
    return;
  }
  if (!nameRegex.test(userName)) {
    showError(nameError, nameInput, "Use letters only (no numbers or symbols).");
    return;
  }
  if (!birthdate) {
    showError(birthError, birthInput, "Please select your birthdate.");
    return;
  }

  // View State Transition: Form -> Loading -> Result
  document.getElementById("formSection").classList.add("hidden");
  loadingSection.classList.remove("hidden");

  startDots();

  setTimeout(() => {
    loadingSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    const sign = getZodiacSign(birthdate);
    const data = generateDynamicHoroscope(userName, sign);

    greeting.textContent = `Hi ${userName}!`;
    intro.textContent = data.intro;
    message.textContent = data.message;
  }, 2000); // Artificial delay to simulate "AI processing"
}

/**
 * Determines the Western Zodiac sign based on a date string.
 * @param {string} dateString - The user's birthdate (YYYY-MM-DD).
 * @returns {string} The name of the zodiac sign.
 */
function getZodiacSign(dateString) {
  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const signs = [ 
    { name: "Capricorn", month: 1, day: 20 }, 
	{ name: "Aquarius", month: 2, day: 19 },
    { name: "Pisces", month: 3, day: 20 }, 
	{ name: "Aries", month: 4, day: 20 },
    { name: "Taurus", month: 5, day: 21 }, 
	{ name: "Gemini", month: 6, day: 21 },
    { name: "Cancer", month: 7, day: 23 }, 
	{ name: "Leo", month: 8, day: 23 },
    { name: "Virgo", month: 9, day: 23 }, 
	{ name: "Libra", month: 10, day: 23 },
    { name: "Scorpio", month: 11, day: 22 }, 
	{ name: "Sagittarius", month: 12, day: 22 }
  ];

  const sign = signs.find(s => (month === s.month && day <= s.day) || month < s.month);
  return sign ? sign.name : "Capricorn";
}

/**
 * Generates a randomized cosmic reading.
 * @param {string} name - User's name.
 * @param {string} sign - User's zodiac sign.
 * @returns {Object} Contains intro and message strings.
 */
function generateDynamicHoroscope(name, sign) {
  const intros = [
    "The stars are shifting for you", 
    "A cosmic alignment is occurring", 
    "Your energy is peaking", 
    "The universe has a whisper for you"
  ];
  
  const traits = {
    "Aries": "your natural courage is your greatest asset today.",
    "Taurus": "your steady persistence is about to pay off.",
    "Gemini": "your adaptability will help you navigate a sudden change.",
    "Cancer": "your intuition is exceptionally sharp right now.",
    "Leo": "your radiant confidence is drawing new opportunities toward you.",
    "Virgo": "your attention to detail will reveal a hidden path.",
    "Libra": "your sense of balance is the key to resolving a conflict.",
    "Scorpio": "your intense focus is manifesting your deepest desires.",
    "Sagittarius": "your adventurous spirit is leading you to a breakthrough.",
    "Capricorn": "your disciplined nature is building a foundation for success.",
    "Aquarius": "your unique perspective is exactly what's needed today.",
    "Pisces": "your creative soul is vibrating at a high frequency."
  };

  const predictions = [
    "Expect a surprise encounter before the week ends.",
    "A financial door is creaking open—be ready to step through.",
    "Someone from your past is thinking of you with kindness.",
    "Trust the first instinct you have tomorrow morning.",
    "Focus on rest; your best ideas come in the quiet moments."
  ];

  const randomIntro = intros[Math.floor(Math.random() * intros.length)];
  const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];

  return {
    intro: randomIntro,
    message: `As a ${sign}, ${traits[sign]} ${randomPrediction}`
  };
}

/**
 * UI Utility: Displays error message and highlights input.
 */
function showError(errorElement, inputElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add("active");
    inputElement.classList.add("error-input");
}

/**
 * UI Utility: Clears validation errors.
 */
function clearError(errorElement, inputElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("active");
    inputElement.classList.remove("error-input");
}

/**
 * Resets the application to the initial state.
 */
function resetApp() {
  resultSection.classList.add("hidden");
  loadingSection.classList.add("hidden");
  document.getElementById("formSection").classList.remove("hidden");

  nameInput.value = "";
  birthInput.value = "";
  clearError(nameError, nameInput);
  clearError(birthError, birthInput);
}

function startDots() {
  const dots = document.getElementById("dots");
  let count = 0;

  dotsInterval = setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 400);
}