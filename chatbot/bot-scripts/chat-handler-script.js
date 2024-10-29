const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;


// script.js



// Function to create chat list item (RESPONSES)
const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");

  chatLi.classList.add("chat", `${className}`);
  //if the class name is outgoing(message from the user) add the paragraph element <p></p>. 
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  

  chatLi.innerHTML = chatContent;

  chatLi.querySelector("p").textContent = message;

  return chatLi; // return chat <li> element
}
//generate response 

const generateResponse = async (chatElement) => {
    // this what we are going to use to replace thatt Thinking... <li><p> </p></li>
    const messageElement = chatElement.querySelector("p");
  


  }




const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  console.log(!userMessage);
  
  //if the message is empty dont return anything
  //if (userMessage == "") return; 
  if (!userMessage) return;


  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    // This is more like a place holder list element 
    chatbox.appendChild(incomingChatLi);

    chatbox.scrollTo(0, chatbox.scrollHeight);

    // This method right here does not exist to gererate a response you will have to create you own
     generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

//  1. The code execution starts here, when the send icon is cliked. then hancdleChat function is called
sendChatBtn.addEventListener("click", handleChat);

closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));