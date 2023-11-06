import { Octokit } from "https://esm.sh/@octokit/core";

const rootElement = document.querySelector(":root");
const themeHeader = document.querySelector(".header__theme");
const themeBtn = document.querySelector(".js-theme");
const themeText = document.querySelector(".js-theme-text");
const themeLogo = document.querySelector(".js-theme-logo");
const themeLogoDark = document.querySelector(".js-theme-logo-dark");
let rs = getComputedStyle(rootElement);
const APIKEY = "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";

themeBtn.addEventListener("click", function () {
  if (themeText.textContent.toLowerCase() === "dark") {
    rootElement.style.setProperty("--color2", "#fefefe");
    rootElement.style.setProperty("--color3", "#fefefe");
    rootElement.style.setProperty("--color4", "#fefefe");
    rootElement.style.setProperty("--color5", "#141d2f");
    rootElement.style.setProperty("--color6", "#1e2a47");
    rootElement.style.setProperty("--color7", "#fefefe");

    themeBtn.addEventListener("mouseover", function () {
      themeHeader.style.setProperty("--theme-color", "#697c9a");
    });

    themeBtn.addEventListener("mouseout", function () {
      themeHeader.style.setProperty("--theme-color", "#fefefe");
    });

    themeText.textContent = "light";
    themeLogo.classList.add("hidden");
    themeLogoDark.classList.remove("hidden");
  } else {
    rootElement.style.setProperty("--color2", "#697c9a");
    rootElement.style.setProperty("--color3", "#4b6a9b");
    rootElement.style.setProperty("--color4", "#2b3442");
    rootElement.style.setProperty("--color5", "#f6f8ff");
    rootElement.style.setProperty("--color6", "#fefefe");
    rootElement.style.setProperty("--color7", "#222731");

    themeBtn.addEventListener("mouseover", function () {
      themeHeader.style.setProperty("--theme-color", "#222731");
    });

    themeBtn.addEventListener("mouseout", function () {
      themeHeader.style.setProperty("--theme-color", "#697c9a");
    });

    themeText.textContent = "dark";
    themeLogoDark.classList.add("hidden");
    themeLogo.classList.remove("hidden");
  }
});

document.querySelector(".js-search-btn").addEventListener("click", function () {
  fetchData(document.querySelector(".js-search-text").value);
});

async function fetchData(username) {
  const octokit = new Octokit({
    auth: APIKEY,
  });
  try {
    const response = await octokit.request(`GET /users/${username}`, {
      username: username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    console.log(response);
    insertData(response.data);
    handleFound();
  } catch (e) {
    console.log(e);
    handleNotFound();
  }
}

function insertData(data) {
  const joinDate = new Date(data.created_at).toDateString();

  document.querySelector(".js-profile-name").textContent = data.name
    ? data.name
    : data.login;
  document.querySelector(".js-profile-img").src = data.avatar_url;
  document.querySelector(".js-profile-link").href = data.html_url;
  document.querySelector(".js-profile-link").textContent = `@${data.login}`;
  document.querySelector(".js-profile-date").textContent = `Joined ${joinDate}`;
  document.querySelector(".js-profile-bio").textContent = data.bio
    ? data.bio
    : "This profile has no bio";

  document.querySelector(".js-profile-repos").textContent = data.public_repos;
  document.querySelector(".js-profile-followers").textContent = data.followers;
  document.querySelector(".js-profile-following").textContent = data.following;

  document.querySelector(".js-profile-location").textContent = data.location
    ? data.location
    : "Not Available";
  if (!data.location)
    document
      .querySelector(".js-profile-location")
      .parentNode.classList.add("inactive");

  document.querySelector(".js-profile-twitter").textContent =
    data.twitter_username ? data.twitter_username : "Not Available";
  if (!data.twitter_username)
    document
      .querySelector(".js-profile-twitter")
      .parentNode.classList.add("inactive");

  document.querySelector(".js-profile-blog").textContent = data.blog
    ? data.blog
    : "Not Available";
  document.querySelector(".js-profile-blog").href = data.blog ? data.blog : "#";
  if (!data.blog)
    document
      .querySelector(".js-profile-blog")
      .parentNode.classList.add("inactive");

  document.querySelector(".js-profile-company").textContent = data.company
    ? data.company
    : "Not Available";
  if (!data.company)
    document
      .querySelector(".js-profile-company")
      .parentNode.classList.add("inactive");
}

function handleNotFound() {
  document.querySelector(".js-error-text").classList.remove("transparent");
}

function handleFound() {
  document.querySelector(".js-error-text").classList.add("transparent");
}
