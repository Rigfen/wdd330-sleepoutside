import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().catch(console.error);

const visitDialog = document.querySelector("#visitDialog");
const visitText = document.querySelector("#visitDialog div");
const closeButton = document.querySelector("#closeBttn");

function loadFirstTimeMsg() {
  const visited = localStorage.getItem("returningUser");

  if (!visited) {
    visitText.innerHTML = `<p><strong>Welcome!</strong></p>
        <p>Register with us to gain more benefits! New users to register with us automatically get registered to our giveaway! The giveaway includes free tents, sleeping bags, backpacks, and hammocks!</p>
        <p>Sign up today!</p>`;

    visitDialog.showModal();
    localStorage.setItem("returningUser", "true");
  }
}

closeButton.addEventListener("click", () => {
  visitDialog.close();
});

loadFirstTimeMsg();
