const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Main HR questions
const hrQuestions = [
  "🧑 Tell me about Sinawo",
  "💻 What technical skills do you possess?",
  "📊 Can you describe a recent project you completed?",
  "🧩 How do you approach problem-solving?",
  "🎯 What are your career goals?",
  "🌍 Are you open to remote work or relocation?",
  "🗣️ How would you describe your communication skills?"
];

// Sub-questions mapped to main questions
const subQuestions = {
  "🧑 Tell me about Sinawo": [
    "📚 What is his educational background?",
    "💼 What previous roles has he held?",
    "🔍 What are his primary areas of expertise?",
    "🔙 Back to Main Menu"
  ],
  "💻 What technical skills do you possess?": [
    "🖥️ What programming languages does he know?",
    "🛠️ What tools and technologies is he proficient in?",
    "📊 What databases does he work with?",
    "🔙 Back to Main Menu"
  ],
};

// Function to display initial HR options as buttons
const displayOptions = (options) => {
  options.forEach((question) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option-btn");
    optionBtn.textContent = question;

    optionBtn.addEventListener("click", () => {
      if (question === "🔙 Back to Main Menu") {
        displayBackToMainMessage(); // Display back to main menu message first
      } else if (subQuestions[question]) {
        handleOptionClick(question, subQuestions[question]); // Show sub-questions if available
      } else {
        handleOptionClick(question); // Send option as message if no sub-questions
      }
    });

    const optionLi = document.createElement("li");
    optionLi.classList.add("chat", "incoming");
    optionLi.appendChild(optionBtn);
    chatbox.appendChild(optionLi);
  });

  chatbox.scrollTo(0, chatbox.scrollHeight);
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
  userMessage = question;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    if (subOptions) {
      incomingChatLi.remove();
      displayOptions(subOptions);
    } else {
      generateResponse(incomingChatLi);
    }
  }, 1000);
}

// Function to generate responses based on selected option
const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Sample responses for each question
  const responses = {
    "🧑 Tell me about Sinawo": "Sinawo is a dedicated Data Engineer and Software Developer with a strong background in Computer Science and Information Systems. He has a deep passion for turning data into actionable insights and creating meaningful applications.",
    "📚 What is his educational background?": "Sinawo holds qualifications in Computer Science and Information Systems, with a foundation in technical skills and data management.",
    "💼 What previous roles has he held?": "He has held various roles, including Data Analyst and Software Developer, which provided experience with data handling, software development, and working within agile frameworks.",
    "🔍 What are his primary areas of expertise?": "His expertise spans Data Engineering, Business Intelligence, and software development. He is skilled in designing data pipelines and analyzing large datasets to inform business decisions.",
    "💻 What technical skills do you possess?": "Sinawo is skilled in multiple programming languages, data handling, and software development.",
    "🖥️ What programming languages does he know?": "He is proficient in languages including C#, Python, JavaScript, Java, and SQL.",
    "🛠️ What tools and technologies is he proficient in?": "Sinawo is experienced in Power BI, Visual Studio, Git, and Azure DevOps for development and data analysis.",
    "📊 What databases does he work with?": "He frequently works with Microsoft SQL Server, PostgreSQL, and MySQL.",
    "📊 Can you describe a recent project you completed?": "One of Sinawo’s recent projects was an automobile data analysis where he collected data, stored it, and built a pipeline for deriving insights. He then visualized the data in Power BI to inform business strategies.",
    "🧩 How do you approach problem-solving?": "He approaches problem-solving analytically, breaking down issues into manageable parts and leveraging research and testing to develop effective solutions.",
    "🎯 What are your career goals?": "Sinawo aims to grow into a Senior BI/Software Developer role, continually enhancing his skills and taking on greater challenges in data science.",
    "🌍 Are you open to remote work or relocation?": "Yes, he is open to remote work and would consider relocation if it aligns with his career goals.",
    "🗣️ How would you describe your communication skills?": "Sinawo possesses strong communication skills, able to convey technical details to diverse audiences and work effectively within teams."
  };

  const response = responses[userMessage] || "I'm here to help with any other questions!";
  messageElement.textContent = `${response}`;
  chatbox.scrollTo(0, chatbox.scrollHeight);

  displayFinalOptions();
};

// Function to display final options
const displayFinalOptions = () => {
  const finalOptions = ["🔙 Back to Start", "📞 Contact", "👋 Bye"];

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("final-options-container");

  finalOptions.forEach(option => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("final-btn");
    optionBtn.textContent = option;
    optionBtn.addEventListener("click", () => {
      handleFinalOptionClick(option);
    });

    buttonContainer.appendChild(optionBtn);
  });

  const optionLi = document.createElement("li");
  optionLi.classList.add("chat", "incoming");
  optionLi.appendChild(buttonContainer);
  chatbox.appendChild(optionLi);

  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Handle clicks for final options
const handleFinalOptionClick = (option) => {
  chatbox.appendChild(createChatLi(option, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  if (option === "🔙 Back to Start") {
    displayBackToMainMessage();
  } else if (option === "📞 Contact") {
    const contactMessage = createChatLi(
      "You can reach Sinawo at sinawomngxuma@gmail.com or by phone at 083 352 9353.",
      "incoming"
    );
    chatbox.appendChild(contactMessage);
  } else if (option === "👋 Bye") {
    const goodbyeMessage = createChatLi("Goodbye! Feel free to reach out anytime.", "incoming");
    chatbox.appendChild(goodbyeMessage);
  }

  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Display back to main menu message and show main options
const displayBackToMainMessage = () => {
  const backMessage = createChatLi("🔙 Back to Main Menu", "outgoing");
  chatbox.appendChild(backMessage);

  const chatLi = createChatLi("Hi👋 again! You are back at the main menu. What would you like to know?", "incoming");
  chatbox.appendChild(chatLi);

  setTimeout(() => {
    displayOptions(hrQuestions);
  }, 1000);
};

// Initialize chat with HR options
document.addEventListener("DOMContentLoaded", () => {
  displayOptions(hrQuestions);
});

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    displayOptions();
  }
});

// sendChatBtn.addEventListener("click", displayOptions);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));