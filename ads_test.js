import adsData from "./ads_main.js";

googletag.cmd.push(function() {
    "use strict"

    if(pageVariables["environment"] !== "noAds") {


        // Loop through all the ads and check the mobileOnly value
        for (const adCategory in adsData.ads) {
            if (adsData.ads.hasOwnProperty(adCategory)) {
            const adList = adsData.ads[adCategory];
            adList.forEach(ad => {
                console.log(`Ad tag: ${ad.tag}, Mobile Only: ${ad.mobileOnly}`);
            });
            }
        }
    }
});