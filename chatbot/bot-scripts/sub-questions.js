const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

// Main HR categories with related sub-questions
const hrCategories = {
  "About Me": [
    "Can you tell me about yourself?",
    "What is your educational background?",
  ],
  "Skills": [
    "What technical skills do you possess?",
    "How would you describe your communication skills?",
  ],
  "Experience": [
    "What previous roles have you held?",
    "Can you describe a recent project you completed?",
  ],
  "Job-Related Questions": [
    "Learn more about my availability",
    "Discuss potential projects",
    "Inquire about my rates",
  ],
};

// Display main categories as initial options
const displayMainCategories = () => {
  Object.keys(hrCategories).forEach((category) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option-btn");
    optionBtn.textContent = category;
    
    // Click event to show sub-questions for a selected category
    optionBtn.addEventListener("click", () => {
      displaySubQuestions(category);
    });
    
    const optionLi = document.createElement("li");
    optionLi.classList.add("chat", "incoming");
    optionLi.appendChild(optionBtn);
    chatbox.appendChild(optionLi);
  });
  
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Display sub-questions for selected category
const displaySubQuestions = (category) => {
  const subQuestions = hrCategories[category];
  chatbox.innerHTML = ""; // Clear existing chatbox content
  
  const backButton = document.createElement("button");
  backButton.textContent = "⬅️ Back";
  backButton.classList.add("back-btn");
  backButton.addEventListener("click", () => {
    chatbox.innerHTML = "";
    displayMainCategories();
  });
  chatbox.appendChild(backButton);
  
  subQuestions.forEach((question) => {
    const subOptionBtn = document.createElement("button");
    subOptionBtn.classList.add("option-btn");
    subOptionBtn.textContent = question;
    subOptionBtn.addEventListener("click", () => {
      handleOptionClick(question);
    });
    
    const subOptionLi = document.createElement("li");
    subOptionLi.classList.add("chat", "incoming");
    subOptionLi.appendChild(subOptionBtn);
    chatbox.appendChild(subOptionLi);
  });
  
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Function to handle question click and display as user message
const handleOptionClick = (question) => {
  userMessage = question;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  generateResponse(incomingChatLi);
};

// Simple responses based on question
const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  
  const responses = {
    "Can you tell me about yourself?": "I’m a skilled Data Engineer with a background in Computer Science...",
    "What technical skills do you possess?": "I am proficient in C#, Python, JavaScript, and SQL databases...",
    "What previous roles have you held?": "I have experience working in roles focused on data engineering...",
    "Learn more about my availability": "I am open to both remote work and relocation...",
  };

  const response = responses[userMessage] || "I'm here to help with any other questions!";
  setTimeout(() => {
    messageElement.textContent = response;
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 1000);
};

// Initialize chat with main HR categories
document.addEventListener("DOMContentLoaded", () => {
  displayMainCategories();
});
