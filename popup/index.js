const switchElement = document.getElementById("toggle-switch");

// Set initial state of the switch based on stored value
browser.storage.local.get("isEnabled").then((data) => {
  // Initialize to false if no value is stored
  if (data === undefined) {
    browser.storage.local.set({ isEnabled: false });
    switchElement.checked = false;
    return;
  }

  // Set checkbox state based on stored value
  const { isEnabled } = data;
  switchElement.checked = isEnabled;
});

// Update state
switchElement.addEventListener("change", () => {
  browser.storage.local.set({ isEnabled: switchElement.checked });
});
