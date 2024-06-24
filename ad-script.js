const viewportSizes = {
  mobileMaxWidth: 727,
  tabletMaxWidth: 767,
  desktopMaxWidth: 1280,
};

// Define where ads should be placed
const selectors = {
  paragraphCSS3:
    "div.articleText > :not(:empty):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(p:has(strong))",
  paragraphCSS2: "div.articleText > p",
};
// Get the current viewport size
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Initialize pageVariables object
const pageVariables = {};

/* -------------------------------------------------------------------------- */
/*            Define which device is in use based on viewport width           */
/* -------------------------------------------------------------------------- */
if (viewportWidth > viewportSizes.tabletMaxWidth) {
  deviceInUse = "desktop";
} else if (viewportWidth > viewportSizes.mobileMaxWidth) {
  deviceInUse = "tablet";
} else {
  deviceInUse = "mobile";
}

const isMobile = deviceInUse === "mobile";
const isTablet = deviceInUse === "tablet";
const isDesktop = deviceInUse === "desktop";
console.log("Device in use is", deviceInUse);

// Store device classification in pageVariables
pageVariables["viewport-width"] = viewportWidth;
pageVariables["viewport-height"] = viewportHeight;
pageVariables["deviceClassification"] = deviceInUse;
pageVariables["isMobile"] = isMobile;
pageVariables["isDesktop"] = isDesktop;

console.log("Page variables collected", pageVariables);

/* -------------------------------------------------------------------------- */
/*         See which browser is being used by the user and classify it        */
/* -------------------------------------------------------------------------- */
const customWindow = window;

const getBrowserName = () => {
  "use strict";
  try {
    const userAgent = navigator.userAgent || navigator.vendor;
    const vendor = navigator.vendor || navigator.userAgent;

    // Check for Opera
    if (
      (!!customWindow.opr && !!customWindow.addons) ||
      !!customWindow.opera ||
      userAgent.includes("OPR/")
    ) {
      return "Opera";
    }

    // Check for Facebook In-App Browser
    if (userAgent.includes("FBAN") || userAgent.includes("FBAV")) {
      return "FacebookInApp";
    }

    // Check for Instagram
    else if (userAgent.includes("Instagram")) {
      return "Instagram";
    }

    // Check for Android
    else if (userAgent.includes("android")) {
      return "Android";
    }

    // Check for Firefox
    else if (userAgent.includes("Firefox")) {
      return "Firefox";
    }

    // Check for Samsung Browser
    else if (userAgent.includes("SamsungBrowser")) {
      return "Samsung";
    }

    // Check for Safari
    else if (vendor.includes("Apple")) {
      return "Safari";
    }

    // Check for Edge
    else if (
      typeof CSS !== "undefined" &&
      CSS.supports("(-ms-ime-align:auto)")
    ) {
      return "Edge";
    }

    // Check for Chrome
    else if (vendor.includes("Google")) {
      return "Chrome";
    }

    // Default to Minor browser
    else {
      return "Minor";
    }
  } catch (err) {
    console.error(err, "Failed to detect browser");
    return "Minor";
  }
};
console.log("Browser in use", getBrowserName());



const adSizes = {
  formats: {
    square_1: [[300, 600], [300, 250]],
    leaderboard: [
      {minWidth: 1200, sizes: [[728, 90], [930, 180], [970, 66], [970, 90], [970, 250], [980, 120]]},
      {minWidth: 980, sizes: [[728, 90], [930, 180], [970, 66], [970, 90], [970, 250], [980, 120]]},
      {minWidth: 970, sizes: [[728, 90], [930, 180], [970, 66], [970, 90], [970, 250]]},
      {minWidth: 930, sizes: [[728, 90], [930, 180]]},
      {minWidth: 728, sizes: [[728, 90]]}
    ],
    leaderboard_2: [
      {minWidth: 1200, sizes: [[728, 90], [930, 180], [930, 600], [970, 66], [970, 90], [970, 250], [980, 120]]},
      {minWidth: 980, sizes: [[728, 90], [930, 180], [930, 600], [970, 66], [970, 90], [970, 250], [980, 120]]},
      {minWidth: 970, sizes: [[728, 90], [930, 180], [930, 600], [970, 66], [970, 90], [970, 250]]},
      {minWidth: 930, sizes: [[728, 90], [930, 180], [930, 600]]},
      {minWidth: 728, sizes: [[728, 90]]}
    ],
    squareArticle: [
      {minWidth: 1280, sizes: [[300, 250], [336, 280], [250, 250], [250, 360], [728, 90], [930, 180]]},
      {minWidth: 0, sizes: [[300, 250], [336, 280], [250, 250], [250, 360]]}
    ],
    mobile: [
      {minWidth: 0, sizes: [[300, 50], [300, 100], [300, 250], [320, 50], [320, 80], [320, 100], [320, 160], [320, 180], [320, 250], [320, 320], [336, 280]]},
      {minWidth: 390, sizes: [[360, 300], [360, 360]]}
    ]
  },
  default: [[300, 250]]
};



// Funktion til at slå en terning med minimum og maksimum værdier
/* const rollDice = (min: number, max: number): number => 
    min + Math.floor(Math.random() * (max - min + 1));
    pageVariables["dice"] = rollDice(1, 6).toString(); */


