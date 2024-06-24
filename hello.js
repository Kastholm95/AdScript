/* -------------------------------------------------------------------------- */
/*                         Definer viewport størrelser                        */
/* -------------------------------------------------------------------------- */
const viewportSizes = {
    mobileMaxWidth: 727,
    tabletMaxWidth: 767,
    desktopMaxWidth: 1280,
  };
  /* -------------------------------------------------------------------------- */
  /*                   Definer brugte kateogrier for artikler                   */
  /* -------------------------------------------------------------------------- */
  const pageCategories = [
    "/artikler/kategori/nyheder",
    "/artikler/kategori/aktier",
    "/artikler/kategori/skat",
    "/artikler/kategori/budgeter",
    "/artikler/kategori/spare-hacks"
  ];
  /* -------------------------------------------------------------------------- */
  /*                   Definer IAB sektioner for forskellige kategorier         */
  /* -------------------------------------------------------------------------- */
  const iabSektioner = {
    nyheder: "IAB12",
    økonomi: "IAB13-3",
    aktier: "IAB13-11",
    skat: "IAB13-12",
    budgeter: "IAB13-4",
    "spare-hacks": "IAB13",
  };
  /* -------------------------------------------------------------------------- */
  /*                   Definer hvor ads skal placeres på siden                  */
  /* -------------------------------------------------------------------------- */
  const selectors = {
    paragraphCSS3:
      "div.articleText > :not(:empty):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(p:has(strong))",
    paragraphCSS2: "div.articleText > p",
  };
  /* -------------------------------------------------------------------------- */
  /*                    Initialize pageVariables empty object                   */
  /* -------------------------------------------------------------------------- */
  const pageVariables = {};
  /* -------------------------------------------------------------------------- */
  /*                 Indhent viewport størrelse width og height                 */
  /* -------------------------------------------------------------------------- */
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
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
  console.log("Page device variables collected", pageVariables);
  /* -------------------------------------------------------------------------- */
  /*         See which browser is being used by the user and classify it        */
  /* -------------------------------------------------------------------------- */
  const getBrowserName = () => {
    "use strict";
    try {
      const userAgent = navigator.userAgent || navigator.vendor;
      const vendor = navigator.vendor || navigator.userAgent;
      const customWindow = window;
  
      const browserRules = [
        { name: "Opera", condition: () => (!!customWindow.opr && !!customWindow.addons) || !!customWindow.opera || userAgent.includes("OPR/") },
        { name: "FacebookInApp", condition: () => userAgent.includes("FBAN") || userAgent.includes("FBAV") },
        { name: "Instagram", condition: () => userAgent.includes("Instagram") },
        { name: "Android", condition: () => userAgent.includes("android") },
        { name: "Firefox", condition: () => userAgent.includes("Firefox") },
        { name: "Samsung", condition: () => userAgent.includes("SamsungBrowser") },
        { name: "Safari", condition: () => vendor.includes("Apple") },
        { name: "Edge", condition: () => typeof CSS !== "undefined" && CSS.supports("(-ms-ime-align:auto)") },
        { name: "Chrome", condition: () => vendor.includes("Google") },
      ];
  
      for (const rule of browserRules) {
        if (rule.condition()) {
          return rule.name;
        }
      }
  
      // Default to Minor browser
      return "Minor";
  
    } catch (err) {
      console.error(err, "Failed to detect browser");
      return "Minor";
    }
  };
  console.log("Browser in use", getBrowserName());
  /* -------------------------------------------------------------------------- */
  /*    Funktion til at hente og validere den kanoniske URL for aktuelle side   */
  /* -------------------------------------------------------------------------- */
  const getCanonicalURL = () => {
    const isWebUrlValid = (url) => /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(url);
  
    const canonicalLink = !window.evaluate || !window.XPathResult 
      ? document.querySelector('link[rel~="canonical"]') 
      : document.evaluate("//link[@rel='canonical']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
    const canonicalURL = canonicalLink ? canonicalLink.getAttribute("href") : window.location.href;
  
    return isWebUrlValid(canonicalURL) ? canonicalURL : window.location.href;
  };
  /* -------------------------------------------------------------------------- */
  /*          Funktion til at udtrække base-stien fra den kanoniske URL         */
  /* -------------------------------------------------------------------------- */
  const extractBasePath = () => {
    const canonicalUrl = new URL(getCanonicalURL());
    let basePath = canonicalUrl.pathname;
    return basePath.length > 1 && basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  };
  // Opdatering af pageVariables med den kanoniske URL og base-sti
  pageVariables["canonical-url"] = getCanonicalURL();
  pageVariables["pathbasename"] = extractBasePath();
  
  console.log("Canonical URL:", pageVariables["canonical-url"]);
  console.log("Path Basename:", pageVariables["pathbasename"]);
  /* -------------------------------------------------------------------------- */
  /*     Funktion til at bestemme sektionen/kategorien for den aktuelle side    */
  /* -------------------------------------------------------------------------- */
  const getSubsectionCategory = () => {
    console.assert(pageVariables["pathbasename"], "pageVariables['pathbasename'] not defined before calling getSubsectionCategory()");
    // Debugging logs
    console.log("Path Basename in getSubsectionCategory:", pageVariables["pathbasename"]);
  
    if (pageVariables["pathbasename"] === "/") {
      console.log("Returning frontpage because pathbasename is /");
      return "frontpage";
    }
    // Hvis stien matcher en kendt sektion, returner "subsection-frontpage"
    if (pageCategories.includes(pageVariables["pathbasename"])) {
      return "subsection-frontpage";
    }
    // Tjek meta-tag for at afgøre om siden er en artikel
    const pageTypeMetaTag = document.querySelector('meta[property~="og:type"]');
    // Returner "articlepage" hvis meta-tag er til stede og angiver "article", ellers "basepage"
    const result = pageTypeMetaTag && pageTypeMetaTag.content === "article" ? "articlepage" : "basepage";
    return result;
  };
  
  // Opdatering af pageVariables med den bestemte sektion/kategori
  pageVariables["subsection-category"] = getSubsectionCategory();
  console.log("Final Subsection Category:", pageVariables["subsection-category"]);
  /* -------------------------------------------------------------------------- */
  /*    Funktion til at bestemme kategorien baseret på subsection-kategorien    */
  /* -------------------------------------------------------------------------- */
  const getNewsCategory = () => {
    // Sikrer at "subsection-category" er defineret
    console.assert(pageVariables["subsection-category"] !== undefined, "pageVariables['subsection-category'] not defined before calling getNewsCategory()");
    
    const subsectionCategory = pageVariables["subsection-category"];
    
    const categoryRules = [
      {
        name: "finance",
        condition: () => subsectionCategory === "articlepage" && document.querySelector('meta[property~="article:section"]')?.content.toLowerCase() === "finance"
      },
      {
        name: "finance",
        condition: () => subsectionCategory === "subsection-frontpage"
      },
      {
        name: "economy",
        condition: () => true // Default rule
      }
    ];
    
    for (const rule of categoryRules) {
      if (rule.condition()) {
        return rule.name;
      }
    }
  };
  // Opdatering af pageVariables med den bestemte nyhedskategori
  pageVariables["news-category"] = getNewsCategory();
  console.log("News Category:", pageVariables["news-category"]);
  /* -------------------------------------------------------------------------- */
  /*    Funktion til at bestemme IAB sektionen baseret på nyhedskategorien      */
  /* -------------------------------------------------------------------------- */
  const getSectionIAB = (section) => {
    "use strict";
    return iabSektioner.hasOwnProperty(section) ? iab[section] : "IAB13";
  };
  pageVariables["sectioncat"] = getSectionIAB(pageVariables["news-category"]);
  console.log("IAB Section:", pageVariables["sectioncat"]);