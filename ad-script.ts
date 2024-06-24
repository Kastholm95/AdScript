
/* Google ESP */

/* 
wat is dis


window.ID5EspConfig = {
    partnerId: 1254
}; 
usingIabCMP = true;
cookieCMP = "GAM";

*/

// Screen Viewport Sizes
export const viewportSizes = {
    mobileMaxWidth: 727,
    tabletMaxWidth: 767,
    desktopMaxWidth: 1280,
};
// Define where ads should be placed
export const selectors = {
    paragraphCSS3: "div.articleText > :not(:empty):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(p:has(strong))",
    paragraphCSS2: "div.articleText > p",
};
// Get the current viewport size
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Initialize pageVariables object
const pageVariables: Record<string, string | number | boolean> = {};

// Classify the device based on viewport width
let deviceInUse: "mobile" | "tablet" | "desktop";

const isMobile = viewportWidth <= viewportSizes.mobileMaxWidth;
const isTablet = viewportWidth > viewportSizes.mobileMaxWidth && viewportWidth <= viewportSizes.tabletMaxWidth;
const isDesktop = viewportWidth > viewportSizes.tabletMaxWidth;

if (isDesktop) {
  deviceInUse = "desktop";
} else if (isTablet) {
  deviceInUse = "tablet";
} else {
  deviceInUse = "mobile";
}
// Store device classification in pageVariables
pageVariables["viewport-width"] = viewportWidth;
pageVariables["viewport-height"] = viewportHeight;
pageVariables["deviceClassification"] = deviceInUse;
pageVariables["isMobile"] = isMobile;
pageVariables["isDesktop"] = isDesktop;




type BrowserName = "Opera" | "FacebookInApp" | "Instagram" | "Android" | "Firefox" | "Samsung" | "Safari" | "Edge" | "Chrome" | "Minor";
const customWindow = window as any;

function getBrowserName(): BrowserName {
    "use strict";
    try {
        if (
            (!!customWindow.opr && !!customWindow.addons) ||
            !!customWindow.opera ||
            navigator.userAgent.indexOf(" OPR/") >= 0
        ) {
            return "Opera";
        }
        const uau = navigator.userAgent || navigator.vendor;
        if (uau.indexOf("FBAN") > -1 || uau.indexOf("FBAV") > -1) {
            return "FacebookInApp";
        } else if (uau.indexOf("Instagram") > -1) {
            return "Instagram";
        } else if (uau.indexOf("android") > -1) {
            return "Android";
        } else if (uau.indexOf("Firefox") > -1) {
            return "Firefox";
        } else if (uau.indexOf("SamsungBrowser") > -1) {
            return "Samsung";
        }
        const uav = navigator.vendor || navigator.userAgent;
        if (uav.indexOf("Apple") > -1) {
            return "Safari";
        } else if (
            typeof CSS !== "undefined" &&
            CSS.supports("(-ms-ime-align:auto)")
        ) {
            return "Edge";
        } else if (uav.indexOf("Google") > -1) {
            return "Chrome";
        } else {
            return "Minor";
        }
    } catch (err) {
        console.error(err, "Failed to detect browser");
        return "Minor";
    }
}

let browserName: BrowserName = getBrowserName();

var adsScrollListener = function () {
    const processAdUnit = (slot, divId, yOffsetCheckFn, paragraphCheckFn, paragraph, createBannerFn) => {
      if (slot !== undefined && !refreshedMap[divId] && yOffsetCheckFn(divId, desktop_delta)) {
        try {
          if (paragraphCheckFn(paragraph)) {
            const bannerDiv = createBannerFn();
            if (bannerDiv && bannerDiv.setAfterParagraph(paragraph)) {
              googletag.cmd.push(function () {
                googletag.display(bannerDiv.id);
                refreshAdslot(slot);
              });
            } else {
              console.log(`Not enough paragraphs for inserting ${bannerDiv.id}`);
            }
          } else {
            googletag.cmd.push(function () {
              googletag.display(divId);
              refreshAdslot(slot);
            });
          }
        } catch (err) {
          console.log(err, `Failed to insert ${divId}`);
        }
      }
    };
  
    if (is_desktop) {
      const desktopUnits = [
        { slot: slot_InText_1, divId: "div-InText_1", paragraph: 5, createBannerFn: () => createInTextBannerForDisplay(1) },
        { slot: slot_InText_2, divId: "div-InText_2", paragraph: 10, createBannerFn: () => createInTextBannerForDisplay(2) },
        { slot: slot_InText_3, divId: "div-InText_3", paragraph: 15, createBannerFn: () => createInTextBannerForDisplay(3) },
        { slot: slot_InText_4, divId: "div-InText_4", paragraph: 20, createBannerFn: () => createInTextBannerForDisplay(4) },
        { slot: slot_InText_5, divId: "div-InText_5", paragraph: 25, createBannerFn: () => createInTextBannerForDisplay(5) },
        { slot: slot_InFeed_1, divId: "div-InFeed_1" },
        { slot: slot_930x180_2, divId: "div-930x180_2" },
      ];
  
      desktopUnits.forEach(unit => {
        processAdUnit(unit.slot, unit.divId, isAdunitWithinYOffset, isParagraphWithinYOffset, unit.paragraph, unit.createBannerFn);
      });
    } else {
      const mobileUnits = [
        { slot: slot_Mobile_Article_1, divId: "div-Mobile_Article_1", paragraph: 2, createBannerFn: () => createMobileArticleBanner(1) },
        { slot: slot_Mobile_Article_2, divId: "div-Mobile_Article_2", paragraph: 7, createBannerFn: () => createMobileArticleBanner(2) },
        { slot: slot_Mobile_Article_3, divId: "div-Mobile_Article_3", paragraph: 12, createBannerFn: () => createMobileArticleBanner(3) },
        { slot: slot_Mobile_Article_4, divId: "div-Mobile_Article_4", paragraph: 17, createBannerFn: () => createMobileArticleBanner(4) },
        { slot: slot_Mobile_Article_5, divId: "div-Mobile_Article_5", paragraph: 22, createBannerFn: () => createMobileArticleBanner(5) },
        { slot: slot_Mobile_Article_6, divId: "div-Mobile_Article_6", paragraph: 27, createBannerFn: () => createMobileArticleBanner(6) },
        { slot: slot_Mobile_Article_7, divId: "div-Mobile_Article_7", paragraph: 32, createBannerFn: () => createMobileArticleBanner(7) },
        { slot: slot_Mobile_Article_8, divId: "div-Mobile_Article_8", paragraph: 37, createBannerFn: () => createMobileArticleBanner(8) },
        { slot: slot_Mobile_InFeed_1, divId: "div-Mobile_InFeed_1" },
        { slot: slot_Mobile_InFeed_2, divId: "div-Mobile_InFeed_2" },
      ];
  
      mobileUnits.forEach(unit => {
        processAdUnit(unit.slot, unit.divId, isAdunitWithinYOffset, isParagraphWithinYOffset, unit.paragraph, unit.createBannerFn);
      });
  
      if (slot_Mobile_Anchor !== undefined && !refreshedMap["gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0"] && window.scrollY > 2500) {
        googletag.cmd.push(function () {
          refreshAdslot(slot_Mobile_Anchor);
        });
      }
    }
  };

  if (pageVariables["environment"] !== "NoAds") {
    try {
      window.addEventListener("scroll", adsScrollListener, {
        passive: true,
      });
    } catch (err) {
      window.addEventListener("scroll", adsScrollListener);
      console.log("passive scroll listener failed");
    }
  }

  // Refresh ADS on navigation
customWindow.navigation.addEventListener("navigate", (event) => {
    console.log("location changed!");
    refreshedMap["div-InText_1"] = false;
    refreshedMap["div-InText_2"] = false;
    refreshedMap["div-InText_3"] = false;
    refreshedMap["div-InText_4"] = false;
    refreshedMap["div-InText_5"] = false;
    refreshedMap["div-Mobile_Article_1"] = false;
    refreshedMap["div-Mobile_Article_2"] = false;
    refreshedMap["div-Mobile_Article_3"] = false;
    refreshedMap["div-Mobile_Article_4"] = false;
    refreshedMap["div-Mobile_Article_5"] = false;
    refreshedMap["div-Mobile_Article_6"] = false;
    refreshedMap["div-Mobile_Article_7"] = false;
    refreshedMap["div-Mobile_Article_8"] = false;
  });
  
  function detectWallpaper(): boolean {
    const htmlElement = document.documentElement;
    
    if (
      htmlElement.classList.contains('wallpaper') || 
      htmlElement.classList.contains('skin')
    ) {
      return true;
    }
  
    if (document.body.style.backgroundImage.includes('url')) {
      return true;
    }
  
    if (document.getElementsByClassName('jpx-wp-wrapper').length > 0) {
      return true;
    }
  
    if (document.getElementById('ayads-html')) {
      return true;
    }
  
    if (document.querySelector('html.adsm-skin')) {
      return true;
    }
  
    return false;
  }
  

// Funktion til at slå en terning med minimum og maksimum værdier
/* const rollDice = (min: number, max: number): number => 
    min + Math.floor(Math.random() * (max - min + 1));
    pageVariables["dice"] = rollDice(1, 6).toString(); */