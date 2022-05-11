//Global Variables//
const overview = document.querySelector(".overview");
const username = "caycecoleman";
const repoListElement = document.querySelector(".repo-list");

//Fetching info from Github API JSON data//
const gitUserInfo= async function() {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();

//Fetch and display user information//
const displayUserInfo= function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML =
    `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  gitRepoList();
};

const gitRepoList= async function() {
    const repoList = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const fetchRepos = await repoList.json();
    displayRepos(fetchRepos);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoListElement.append(repoItem);
    }
};
