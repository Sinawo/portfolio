const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Main HR questions
const hrQuestions = [
  "🧑 Tell me about yourself",
  "💻 What technical skills do you possess?",
  "📊 Can you describe a recent project you completed?",
  "🧩 How do you approach problem-solving?",
  "🎯 What are your career goals?",
  "🌍 Are you open to remote work or relocation?",
  "🗣️ How would you describe your communication skills?"
];

// Sub-questions mapped to main questions
const subQuestions = {
  "🧑 Tell me about yourself": [
    "📚 What is your educational background?",
    "💼 What previous roles have you held?",
    "🔍 What are your primary areas of expertise?",
    "🔙 Back to Main Menu"
  ],
  "💻 What technical skills do you possess?": [
    "🖥️ What programming languages do you know?",
    "🛠️ What tools and technologies are you proficient in?",
    "📊 What databases do you work with?",
    "🔙 Back to Main Menu"
  ],
  // Add similar sub-questions for other main questions if needed
};

// Function to display initial HR options as buttons
const displayOptions = (options) => {
  options.forEach((question) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option-btn");
    optionBtn.textContent = question;

    // Add click event to send option as user message or show sub-questions
    optionBtn.addEventListener("click", () => {
      if (question === "🔙 Back to Main Menu") {
        displayBackToMainMessage(); // Display back to main menu message first
      } else if (subQuestions[question]) {
        handleOptionClick(question, subQuestions[question]); // Show sub-questions if available
      } else {
        handleOptionClick(question); // Send option as message if no sub-questions
      }
    });

    // Append each button to the chatbox as a new list item
    const optionLi = document.createElement("li");
    optionLi.classList.add("chat", "incoming");
    optionLi.appendChild(optionBtn);
    chatbox.appendChild(optionLi);
  });

  chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to the bottom of the chatbox
};

// Function to create chat list item for user and bot responses
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  const chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Function to handle when an HR question option is clicked
const handleOptionClick = (question, subOptions = null) => {
  // Send selected option as user's outgoing message
  userMessage = question;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Display "Thinking..." while generating response or sub-options
  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    if (subOptions) {
      // Remove "Thinking..." and display sub-options
      incomingChatLi.remove();
      displayOptions(subOptions);
    } else {
      // Generate response if no sub-options available
      generateResponse(incomingChatLi);
    }
  }, 1000);
}

// Function to generate responses based on selected option
// Function to generate responses based on selected option
const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Sample responses for each question
  const responses = {
    "🧑 Tell me about yourself": "I’m a skilled Data Engineer and Software Developer...",
    "💻 What technical skills do you possess?": "I am proficient in C#, Python, JavaScript, and SQL...",
    "📚 What is your educational background?": "I have a background in Computer Science...",
    "💼 What previous roles have you held?": "My previous roles include Data Analyst..."
  };

  const response = responses[userMessage] || "I'm here to help with any other questions!";
  messageElement.textContent = response;
  chatbox.scrollTo(0, chatbox.scrollHeight);



  
};

// Function to display "Back to Main Menu" message and show main options
const displayBackToMainMessage = () => {
  // Display bot message indicating return to main menu
  const backMessage = createChatLi("🔙 Back to Main Menu", "outgoing");

  chatbox.appendChild(backMessage);
  // Display main HR questions after the message
  const chatLi = createChatLi("Hi👋 again, it's me Django! Sinawo's Buddy You are back at the main menu. What would you like to know?",  "incoming");

  chatbox.appendChild(chatLi);

  setTimeout(() => {
    displayOptions(hrQuestions);
  }, 1000);
};

// Initialize chat with HR options
//  1. The code execution starts here, when the send icon is cliked. then hancdleChat function is called
document.addEventListener("DOMContentLoaded", () => {
  displayOptions(hrQuestions); // Display the predefined HR questions as options
});

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));