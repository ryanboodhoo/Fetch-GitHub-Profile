const fetchBtn = document.getElementById("fetchBtn");
const profileDiv = document.getElementById("profile");
const reposDiv = document.getElementById("repos");

fetchBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a Github username!");
    return;
  }

  try {
    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) {
      throw new Error("User not found");
    }
    const userData = await userResponse.json();
    
    // Display user profile
    displayProfile(userData);

    // Fetch user's repos
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    const reposData = await reposResponse.json();

    // Display last 10 repos
    displayRepositories(reposData.slice(0, 5));
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// Function to display user profile
function displayProfile(user) {
  profileDiv.innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" class="card-img-top" alt="${user.name}">
      <div class="card-body">
        <h5 class="card-title">${user.name || user.login || "No Name Available"}</h5>
        <p class="card-text">Joined: ${new Date(user.created_at).toDateString()}</p>
        <a href="${user.html_url}" target="_blank" class="btn btn-primary">View Github Profile</a>
      </div>
    </div>
  `;
}

// Function to display repos
function displayRepositories(repos) {
  reposDiv.innerHTML = `
    <h3>Last 5 Repositories</h3>
    <ul class="list-group">
      ${repos
        .map(
          (repo) => `
        <li class="list-group-item repo-item">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>
      `)
        .join("")}
    </ul>
  `;
}
