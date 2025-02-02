// This content script runs on api.whatsapp.com and overrides the button click.
(function () {
  // Check we're on api.whatsapp.com page
  if (window.location.hostname !== "api.whatsapp.com") return;

  // === Step 1: Immediately update the URL query parameter ===
  // If the page loads with "app_absent=0", change it to "app_absent=1"
  if (window.location.search.includes("app_absent=0")) {
    const newSearch = window.location.search.replace(
      "app_absent=0",
      "app_absent=1"
    );
    const newURL =
      window.location.origin +
      window.location.pathname +
      newSearch +
      window.location.hash;
    console.log("Immediate URL update to prevent popup:", newURL);
    window.location.replace(newURL);
    return; // Stop further processing while the new URL loads
  }

  // === Step 2: Override window.open to block any scripts trying to launch the app ===
  window.open = function () {
    console.log("Blocked window.open call.");
    return null;
  };

  /**
   * Modify the button's URL so that app_absent is set to 1 (telling WhatsApp the app is absent),
   * and redirect immediately to that URL.
   */
  function modifyAndRedirect() {
    const actionButton = document.getElementById("action-button");
    if (actionButton) {
      let webWhatsappUrl = actionButton.getAttribute("href");
      if (webWhatsappUrl) {
        try {
          let urlObj = new URL(webWhatsappUrl);
          // Change the app_absent parameter so the popup isn't triggered.
          urlObj.searchParams.set("app_absent", "1");
          webWhatsappUrl = urlObj.toString();
          console.log("Modified URL to:", webWhatsappUrl);
        } catch (e) {
          console.error("Error parsing URL:", webWhatsappUrl, e);
        }
        console.log("Auto redirecting to:", webWhatsappUrl);
        // Use location.replace so that we don't create an extra history entry.
        window.location.replace(webWhatsappUrl);
        return true;
      }
    }
    return false;
  }

  /**
   * In case the button is added to the DOM later (via scripts),
   * watch for it with MutationObserver.
   */
  function waitForButton() {
    const observer = new MutationObserver((mutations, observerInstance) => {
      if (modifyAndRedirect()) {
        observerInstance.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Run our redirect code as soon as possible...
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (!modifyAndRedirect()) {
        waitForButton();
      }
    });
  } else {
    if (!modifyAndRedirect()) {
      waitForButton();
    }
  }
})();
