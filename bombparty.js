let words = [];
const usedWords = new Set();

// Load dictionary data
const loadData = async () => {
  const url = browser.runtime.getURL("dict.txt");
  const response = await fetch(url);
  const text = await response.text();
  words = text.split("\n");
};

const search = (prompt) => {
  // Get longest unused word containing prompt
  const results = words
    .filter((word) => word.includes(prompt) && !usedWords.has(word))
    .sort((a, b) => b.length - a.length);
  const result = results[0];

  // Mark word as used
  usedWords.add(result);

  return result;
};

// Simulate typing into input element
const type = (formElement, inputElement, text) => {
  // Clear
  inputElement.value = "";

  // Type characters
  for (const char of text) {
    inputElement.value += char;
    inputElement.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );
  }

  // Submit
  formElement.dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true })
  );
};

// Main loop
let playing = false;
const loop = async () => {
  const { isEnabled } = (await browser.storage.local.get("isEnabled")) ?? {
    isEnabled: false,
  };
  if (!isEnabled) {
    requestAnimationFrame(loop);
    return;
  }

  const promptElement = document.getElementsByClassName("syllable")[0];
  const turnElement = document.getElementsByClassName("selfTurn")[0];
  if (promptElement === undefined || turnElement === undefined) {
    playing = false;
    requestAnimationFrame(loop);
    return;
  }

  // Clear used words when game restarts
  if (!playing) {
    usedWords.clear();
  }
  playing = true;

  // Not current turn
  if (turnElement.attributes.getNamedItem("hidden") !== null) {
    requestAnimationFrame(loop);
    return;
  }

  const formElement = turnElement.getElementsByTagName("form")[0];
  const inputElement = turnElement.getElementsByTagName("input")[0];
  if (formElement === undefined || inputElement === undefined) {
    requestAnimationFrame(loop);
    return;
  }

  // Get prompt
  const prompt = promptElement.textContent.toUpperCase();

  // Type word
  const word = search(prompt);
  type(formElement, inputElement, word);

  requestAnimationFrame(loop);
};

loadData();
requestAnimationFrame(loop);
