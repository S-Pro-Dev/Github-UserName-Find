const api = "https://api.github.com/users/"; // GitHub api Url
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search"); // Get the search input box element

const getUser = async (username) => {
  try {
    // Fetch user data from the GitHub API for the provided username
    const response = await fetch(api + username);
    if (!response.ok) {   // throw an error indicating that the user was not found.
      throw new Error("User not found");
    }
    const data = await response.json();
    console.log(data);

    const card = `
    <div class="card">
        <div class="img">
          <img
            src="${data.avatar_url}"
            alt="Florin Pop"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>${data.bio}</p>
          <p class="location"><i class="fa-solid fa-location-dot icon" style="margin-right: 16px;"></i>${data.location}</p>
          <ul class="info">
          <li>${data.followers}<strong>Followers</strong></li>
          <li>${data.following}<strong>Following</strong></li>
          <li>${data.public_repos}<strong>Repos</strong></li>
          </ul>

          <div class="repos" id="repos">
          </div>
        </div>
      </div>
    `
    main.innerHTML = card;

    getRepos(username);

  } catch (error) {
    main.innerHTML = `<div class="error">${error.message}</div>`;
  }

};


// Assuming the function `getUser` is defined somewhere in your code to fetch user details from the GitHub API.
getUser("s-pro-dev ");  // initial call


// This function fetches all repositories details for the given GitHub username and populates them on the page.
const getRepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(api + username + "/repos");   // Fetch the repository data from the GitHub API for the provided username

  const data = await response.json(); // Convert the response data to JSON format
  // console.log(data);

  // Iterate through each repository data and create links to them
  data.forEach((item) => {
    // Create a link element for the repository
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name
    elem.target = "_blank"  // Open the link in a new tab

    // Append the link element to the 'repos' element on the page
    repos.appendChild(elem)

  });
};


// Define the formSubmit function
const formSubmit = () => {
  // Check if the search input box is not empty
  if (searchBox.value != "") {
    // If the search input box is not empty, call the getUser function with the input value
    // This function should handle the logic to fetch user information based on the GitHub username provided.
    // After getting the user information, it can display it on the page or perform other actions.
    getUser(searchBox.value);

    // Clear the search input box after submitting the form
    searchBox.value = "";
  }
  // This ensures that the form does not get submitted to a server
  return false;
}


// Add an event listener to the search input box for the "focusout" event
searchBox.addEventListener("focusout", function () {
  // When the search input box loses focus (focusout event is triggered),
  // call the formSubmit() function to submit the form or handle the search action
  formSubmit();
});



// Using Animation
document.addEventListener("DOMContentLoaded", function () {
  // Get the nav element
  const nav = document.querySelector(".nav");
  const card = document.querySelector("#main");

  // Add animation classes to trigger fade-out effect for both nav and card elements
  nav.classList.add("fade-out");
  card.classList.add("fade-out");

  // Remove the animation classes after a short delay (e.g., 1 second)
  setTimeout(function () {
    nav.classList.remove("fade-out");
    card.classList.remove("fade-out");
  }, 1000); // 1000 milliseconds = 1 second
});


function toggleSections() {
  let firstSection = document.getElementById('firstSection');
  let secondSection = document.getElementById('secondSection');

  console.log("First Section:", firstSection);
  console.log("Second Section:", secondSection);

  if (firstSection.style.display === 'none') {
    firstSection.style.display = 'block';
    secondSection.style.display = 'none';
  } else {
    firstSection.style.display = 'none';
    secondSection.style.display = 'block';
  }
}





