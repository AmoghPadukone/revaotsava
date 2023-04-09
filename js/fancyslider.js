/*--------------------
Vars
--------------------*/
let progress = 10;
let startX = 10;
let active = 0;
let isDown = false;
let windowWidth = window.innerWidth;
var WIDTH_LIMIT = 820;
/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".epic-carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

/*--------------------
Control Buttons
--------------------*/
const prevBtn = document.getElementById("slider-previous");
const nextBtn = document.getElementById("slider-next");

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
    // console.log("progress=" + progress);
  });
});

/*--------------------
Control buttanssss 😎
--------------------*/

prevBtn.addEventListener("click", (e) => {
  progress = progress - 10;
  animate();
  if (progress <= 0) {
    progress = 10;
  }

  console.log("progress=" + progress);
  console.log(windowWidth);
});
nextBtn.addEventListener("click", (e) => {
  progress = progress + 10;
  animate();
  console.log("progress=" + progress);
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  if (windowWidth <= WIDTH_LIMIT) {
    const wheelProgress = e.deltaY * speedWheel;
    progress = progress + wheelProgress;
    animate();
  }
};

const handleMouseMove = (e) => {
  if (windowWidth <= WIDTH_LIMIT) {
    if (e.type === "mousemove") {
      $cursors.forEach(($cursor) => {
        $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
  }
};

const handleMouseDown = (e) => {
  if (windowWidth <= WIDTH_LIMIT) {
    isDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  }
};

const handleMouseUp = () => {
  if (windowWidth <= WIDTH_LIMIT) {
    isDown = false;
  }
};

/*--------------------
Listeners
--------------------*/
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);
