const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", handleSubmit);

function handleSubmit() {
  const name = nameInput.value.trim();

  clearError();

  if (name === "") {
    showError("Please enter your name.");
    return;
  }

  const nameRegex = /^[A-Za-z\s'-]+$/;

  if (!nameRegex.test(name)) {
    showError("Use letters only (no numbers or symbols).");
    return;
  }

  // ✅ SUCCESS
  console.log("Valid name:", name);
}

function showError(message) {
  nameError.textContent = message;
  nameError.classList.add("active");
  nameInput.classList.add("error-input");
}

function clearError() {
  nameError.textContent = "";
  nameError.classList.remove("active");
  nameInput.classList.remove("error-input");
}

nameInput.addEventListener("input", clearError);