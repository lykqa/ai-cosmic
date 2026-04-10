const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const submitBtn = document.getElementById("submitBtn");

const birthInput = document.getElementById("birthInput");
const birthError = document.getElementById("birthError");

submitBtn.addEventListener("click", handleSubmit);

// SET DATE LIMITS (until today's date only)
const today = new Date().toISOString().split("T")[0];
birthInput.setAttribute("max", today);

// from the last 120 years only 
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 120);
const min = minDate.toISOString().split("T")[0];
birthInput.setAttribute("min", min);

function handleSubmit()
{
	const name = nameInput.value.trim();
	const birthdate = birthInput.value;

	clearError(nameError, nameInput);
	clearError(birthError, birthInput);

	// NAME VALIDATION
	const nameRegex = /^[A-Za-z\s'-]+$/;

	if (name === "")
	{
		showError(nameError, nameInput, "Please enter your name.");
		return;
	}

	if (!nameRegex.test(name))
	{
		showError(nameError, nameInput, "Use letters only (no numbers or symbols).");
		return;
	}

	// BIRTHDATE VALIDATION
	if (!birthdate)
	{
		showError(birthError, birthInput, "Please select your birthdate.");
		return;
	}

	const selectedDate = new Date(birthdate);
	const todayDate = new Date(today);
	const minAllowed = new Date(min);

	if (selectedDate > todayDate)
	{
		showError(birthError, birthInput, "Birthdate cannot be in the future.");
		return;
	}

	if (selectedDate < minAllowed)
	{
		showError(birthError, birthInput, "Birthdate is too far in the past.");
		return;
	}

	console.log("VALID FORM:",
	{
		name,
		birthdate
	});
}

function showError(errorElement, inputElement, message)
{
	errorElement.textContent = message;
	errorElement.classList.add("active");
	inputElement.classList.add("error-input");
}

function clearError(errorElement, inputElement)
{
	errorElement.textContent = "";
	errorElement.classList.remove("active");
	inputElement.classList.remove("error-input");
}

nameInput.addEventListener("input", () => clearError(nameError, nameInput));
birthInput.addEventListener("input", () => clearError(birthError, birthInput));


// for interactive mouse
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  document.body.style.setProperty("--x", x + "%");
  document.body.style.setProperty("--y", y + "%");
});