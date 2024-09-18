let currentStep = 1;

function showStep(step) {
  const steps = document.querySelectorAll(".form-step");
  steps.forEach((s) => {
    s.style.display = s.getAttribute("data-step") == step ? "block" : "none";
  });
  updateStepIndicator();
}

function updateStepIndicator() {
  const stepItems = document.querySelectorAll(".step-item");
  stepItems.forEach((item) => {
    item.classList.remove("active-step");
    if (item.getAttribute("data-step") == currentStep) {
      item.classList.add("active-step");
    }
  });
}

function nextStep() {
  if (currentStep < 2) {
    // Change based on the number of steps
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// Initialize
showStep(currentStep);
