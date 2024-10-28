const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Predefined options for HR questions
const hrQuestions = [
  "Tell me about yourself",
  "What technical skills do you possess?",
  "Can you describe a recent project you completed?",
  "How do you approach problem-solving?",
  "What are your career goals?",
  "Are you open to remote work or relocation?",
  "How would you describe your communication skills?"
];

// Function to display HR options as buttons
const displayOptions = () => {
  hrQuestions.forEach(question => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option-btn");
    optionBtn.textContent = question;
    
    // Add click event to send option as user message
    optionBtn.addEventListener("click", () => {
      handleOptionClick(question);
    });
    
    // Append each button to the chatbox as a new list item
    const optionLi = document.createElement("li");
    optionLi.classList.add("chat", "incoming");
    optionLi.appendChild(optionBtn);
    chatbox.appendChild(optionLi);
  });
  
  chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to the bottom of the chatbox
};

// Function to create chat list item
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  const chatContent = className === "outgoing" 
    ? `<p></p>` 
    : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Function to handle when an HR question option is clicked
const handleOptionClick = (question) => {
  // Send selected option as user's outgoing message
  userMessage = question;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Display "Thinking..." while generating response
  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  generateResponse(incomingChatLi);
};

// Function to generate responses based on selected option
const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Simple responses for each question
  const responses = {
    "Tell me about yourself": "I’m a skilled Data Engineer and Software Developer with a background in Computer Science...",
    "What technical skills do you possess?": "I am proficient in C#, Python, JavaScript, and SQL databases...",
    "Can you describe a recent project you completed?": "Recently, I completed a project on analyzing automobile data...",
    "How do you approach problem-solving?": "My approach involves analyzing the problem, researching potential solutions...",
    "What are your career goals?": "I aim to establish myself as a Senior BI/Software Developer...",
    "Are you open to remote work or relocation?": "Yes, I am open to remote work and would consider relocation for the right role...",
    "How would you describe your communication skills?": "I have strong communication skills and am comfortable working in team settings..."
  };

  // Display response based on user question
  const response = responses[userMessage] || "I'm here to help with any other questions you have!";
  setTimeout(() => {
    messageElement.textContent = response;
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 1000);
};

// Initialize chat with HR options
document.addEventListener("DOMContentLoaded", () => {
  displayOptions(); // Display the predefined HR questions as options
});

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

// Trigger handleChat function on send button click
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
