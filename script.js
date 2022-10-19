//API URLS
const EXPERIENCE_URL = "https://zany-skitter-caper.glitch.me/experiences";
const SKILLS_URL = "https://zany-skitter-caper.glitch.me/skills";

//Fetch exp data
async function getExperienceData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      experienceDataArray = await response.json();
      drawExperience(experienceDataArray);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

//draw and populate experience divs

function drawExperience(data) {
  const yearAndWorkplaceBox = document.getElementById("years-and-workplace");
  const positionAndDescriptionBox = document.getElementById(
    "position-and-description"
  );

  const today = new Date();
  const year = today.getFullYear();
  // new Date().getFullYear
  data.forEach((dataItem) => {
    //years and company
    const years = document.createElement("div");
    years.textContent =
      dataItem.startYear +
      " - " +
      (dataItem.finishYear === year ? "Current" : dataItem.finishYear);
    years.style.fontWeight = "bold";

    const workPlace = document.createElement("div");
    workPlace.textContent = dataItem.companyName;
    workPlace.style.color = "gray";

    yearAndWorkplaceBox.append(years, workPlace);

    //position and description
    const position = document.createElement("div");
    position.textContent = dataItem.position;
    position.style.fontWeight = "bold";

    const positionDescription = document.createElement("div");
    positionDescription.textContent = dataItem.description;

    positionAndDescriptionBox.append(position, positionDescription);
  });
}

getExperienceData(EXPERIENCE_URL);

//Fetch skills data

async function getSkillsData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      skillsDataArray = await response.json();
      drawSkills(skillsDataArray);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

//draw and populate skills divs
function drawSkills(data) {
  const skillsBox = document.getElementById("skills-box");
  data.forEach((dataItem) => {
    const skillTitleAndLevelBox = document.createElement("div");
    skillTitleAndLevelBox.classList.add("skills-title-level-box");

    const skillName = document.createElement("div");
    skillName.textContent = dataItem.title;
    skillName.style.fontWeight = "bold";

    const skillLevelPercent = document.createElement("div");
    skillLevelPercent.textContent = dataItem.level + "%";
    skillLevelPercent.style.color = "gray";

    skillTitleAndLevelBox.append(skillName, skillLevelPercent);

    const skillLevelBarBox = document.createElement("div");
    skillLevelBarBox.classList.add("skills-level-bar");
    skillLevelBarBox.style.padding = "2px";
    skillLevelBarBox.style.border = "1px solid aqua";
    skillLevelBarBox.style.borderRadius = "10px";

    const skillLevelBar = document.createElement("div");
    skillLevelBar.style.height = "10px";
    skillLevelBar.style.backgroundColor = "aqua";
    skillLevelBar.style.borderRadius = "10px";
    skillLevelBar.style.width = dataItem.level + "%";

    skillLevelBarBox.append(skillLevelBar);

    skillsBox.append(skillTitleAndLevelBox, skillLevelBarBox);
  });
}

getSkillsData(SKILLS_URL);
