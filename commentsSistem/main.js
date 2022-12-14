const comments = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer = document.querySelector("#comments-container");

input.classList.add("input");

input.addEventListener("keydown", (e) => {
  handleEnter(e, null);
});
commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handleEnter(e, current) {
  if (e.key === "Enter" && e.target.value !== "") {
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };
    if (current === null) {
      comments.unshift(newComment);
    } else {
      current.responses.unshift(newComment);
    }
    e.target.value = "";
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);

    renderComments(comments, commentsContainer);
  }
}

function renderComments(arr, parent) {
  arr.forEach((element) => {
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comment-container");

    const responsesContainer = document.createElement("div");
    responsesContainer.classList.add("responses-container");

    const replyButton = document.createElement("button");
    const likeButton = document.createElement("button");

    const textContainer = document.createElement("div");
    textContainer.textContent = element.text;

    const actionsContainer = document.createElement("div");

    replyButton.textContent = "Reply";
    likeButton.textContent = `${
      element.likes > 0 ? `${element.likes} likes` : `like`
    }`;

    replyButton.addEventListener("click", (e) => {
      //Clona de forma profunda
      const newInput = inputContainer.cloneNode(true);
      newInput.value = "";
      newInput.focus();
      newInput.addEventListener("keydown", (e) => {
        handleEnter(e, element);
      });
      commentsContainer.insertBefore(newInput, responsesContainer);
    });
    likeButton.addEventListener("click", (e) => {
      element.likes++;
      likeButton.textContent = `${
        element.likes > 0 ? `${element.likes} likes` : `like`
      }`;
    });

    commentsContainer.appendChild(textContainer);
    commentsContainer.appendChild(actionsContainer);
    actionsContainer.appendChild(replyButton);
    actionsContainer.appendChild(likeButton);

    commentsContainer.appendChild(responsesContainer);

    if (element.responses.length > 0) {
      renderComments(element.responses, responsesContainer);
    }
    parent.appendChild(commentsContainer);
  });
  console.log(comments)
}
