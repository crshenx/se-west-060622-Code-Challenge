/**
 * 1. See the image received from the server, including its title, likes and
   comments when the page loads. You will need to make a GET request to the
   following endpoint to retrieve the image data, along with its associated
   comments:

   GET /images/1

2. Click on the heart icon to increase image likes on the page. **No persistence
   is needed**.

3. Add a new comment to the page when the comment form is submitted. **No
   persistence is needed**.
 */

const titleTag = document.getElementById("card-title");
const imageTag = document.getElementById("card-image");
const commentsUl = document.getElementById("comments-list");
const allCommentsLi = document.getElementsByTagName("li");
const heartButton = document.getElementById("like-button");
const likesSpan = document.getElementById("like-count");
const formId = document.getElementById("comment-form");
imageTag.setAttribute("type", "hidden");

fetch("http://localhost:3000/images/1")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderData(data);
  });

function renderData(data) {
  const commentsArray = data.comments;
  likesSpan.textContent = data.likes;
  titleTag.textContent = data.title;
  imageTag.src = data.image;
  commentsUl.textContent = "";
  commentsArray.forEach((element) => {
    const newComment = document.createElement("li");
    const deleteComment = document.createElement("button");
    let comment = element.content;
    newComment.textContent = comment;
    deleteComment.textContent = "delete";
    deleteComment.addEventListener("click", function deleteFunction(comment) {
      comment = newComment;
      comment.remove();
    });
    newComment.append(deleteComment);
    commentsUl.append(newComment);
  });
  // hide image when clicked
  imageTag.addEventListener("click", () => {
    imageTag.hidden = true;
    const imageAppear = document.createElement("button");
    imageAppear.textContent = "IMAGE";
    imageAppear.addEventListener("click", () => (imageTag.hidden = false));
    titleTag.append(imageAppear);
  });
}

heartButton.addEventListener(
  "click",
  () => (likesSpan.textContent = parseInt(likesSpan.textContent) + 1 + ` likes`)
);

const formNameInput = document.getElementById("comment");

formId.addEventListener("submit", (e) => {
  e.preventDefault();
  const newComment = document.createElement("li");
  newComment.textContent = formNameInput.value;
  const deleteComment = document.createElement("button");
  deleteComment.textContent = "delete";
  deleteComment.addEventListener("click", function deleteFunction(comment) {
    comment = newComment;
    comment.remove();
  });
  commentsUl.append(newComment);
  newComment.append(deleteComment);
  e.target.reset();
});
