const footerDate = document.getElementById("footerDate");
footerDate.innerHTML = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  //   linksContainer.classList.toggle("show-links");
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  //   console.log(linksHeight);
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
// fixed navbar
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > 10) {
    navbar.classList.add("fixed-nav");
    if (colorCounter != 0) {
      navbar.classList.add("fixed-nav-black");
    }
  } else {
    navbar.classList.remove("fixed-nav");
    navbar.classList.remove("fixed-nav-black");
  }
  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

//select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (navHeight > 82) {
      position += containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});

const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");
about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  // console.log(e.target.dataset.id);
  if (id) {
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

// countdown
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const registration = document.querySelector(".registration");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
console.log(items);

let futureDate = new Date(2023, 5, 7, 6, 30.0);
console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
console.log(month);
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

registration.textContent = `registration ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}pm`;

const futureTime = futureDate.getTime();

function getRemandingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}
// countdown;
let countdown = setInterval(getRemandingTime, 1000);
//set initial values
getRemandingTime();

// Change backgroundColor
const logo = document.querySelector(".logo");
let colorCounter = 0;

logo.addEventListener("click", function () {
  if (colorCounter % 2 == 0) {
    document.body.style.backgroundColor = "#00141e";
    document.body.style.color = "white";
    navbar.classList.add("fixed-nav-black");
    logo.src = "img/georgia_logo_white.png";
    navToggle.style.color = "var(--clr-white)";
    colorCounter += 1;
  } else {
    document.body.style.backgroundColor = "hsl(210, 36%, 96%)";
    document.body.style.color = "hsl(209, 61%, 16%)";
    navbar.classList.remove("fixed-nav-black");
    logo.src = "img/georgia_logo.png";
    navToggle.style.color = "var(--clr-grey-1)";
    colorCounter -= 1;
  }
});
