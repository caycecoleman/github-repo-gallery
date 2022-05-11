//Global Variables//
const overview = document.querySelector(".overview");
const username = "caycecoleman";
const repoListElement = document.querySelector(".repo-list");
const allRepoInfo = document.querySelector(".repos");
const individualRepo = document.querySelector(".repo-data");

//Fetching info from Github API JSON data//
const gitUserInfo= async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
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

//fetch repos from newest to oldest and no more than 100 at a time//
const gitRepoList= async function() {
    const gitRepo = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const fetchRepos = await gitRepo.json();
    displayRepos(fetchRepos);
};

//display repos just fetched//
const displayRepos = function (repos) {
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoListElement.append(repoItem);
    }
};

//add ability to click on individual repos//
repoListElement.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        gitSingleRepo(repoName);
    }
});

//fetch specific repo you click on//
const gitSingleRepo = async function(repoName) {
    const singleRepo = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await singleRepo.json();
    console.log(repoInfo);

//languages//
const fetchLanguages = await fetch (repoInfo.languages_url);
const languageData = await fetchLanguages.json();

const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
displayRepoInfo(repoInfo, languages);

};

const displayRepoInfo = function(repoInfo, languages) {
    individualRepo.innerHTML = "";
    individualRepo.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
   
    individualRepo.append(div);
};