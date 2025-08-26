d = document;
d.gebi = d.getElementById;
d.gebc = d.getElementsByClassName;
d.gebt = d.getElementsByTagName;
d.ce = d.createElement;

organizeMenuLi = d.gebc("organize-menu-li");

for (var i = 0; i < organizeMenuLi.length; i++) {
  organizeMenuLi[i].onclick = function () {
    if (
      !this.classList.contains("organize-menu-hundred-selected") ||
      !this.classList.contains("organize-menu-fifty-selected")
    ) {
      organizeMenuCount = null;

      if (this.classList.contains("organize-menu-hundred-li")) {
        d.gebc("organize-menu-hundred-selected")[0].classList.remove(
          "organize-menu-hundred-selected"
        );
        this.classList.add("organize-menu-hundred-selected");
      } else if (this.classList.contains("organize-menu-fifty-li")) {
        d.gebc("organize-menu-fifty-selected")[0].classList.remove(
          "organize-menu-fifty-selected"
        );
        this.classList.add("organize-menu-fifty-selected");
      }
    }
  };
}

itemFifty = d.gebc("item-fifty");

for (var i = 0; i < itemFifty.length; i++) {
  itemFifty[i].onclick = function () {
    if (this.classList.contains("clicked")) {
      this.classList.remove("clicked");
      this.classList.add("unclicked");
    } else {
      if (this.classList.contains("unclicked")) {
        this.classList.remove("unclicked");
      }
      this.classList.add("clicked");
    }
  };
}

insertStyle = d.gebi("insertStyle");
appsIconFifty = d.gebi("appsIconFifty");
appsIconFiftyClicked = false;

appsIconFifty.onclick = function () {
  if (!appsIconFiftyClicked) {
    appsIconFiftyClicked = true;

    if (this.classList.contains("unclicked")) {
      this.classList.remove("unclicked");
    }

    this.classList.add("clicked");

    insertStyleHtml = d.ce("style");
    insertStyleHtml.innerHTML = `
		.item.item-fifty {
			border-radius: 50%;
		}`;

    insertStyle.appendChild(insertStyleHtml);
  } else {
    appsIconFiftyClicked = false;

    this.classList.remove("clicked");
    this.classList.add("unclicked");

    insertStyle.innerHTML = "";
  }
};

googleSearchTextContainerLink = d.gebi("googleSearchTextContainerLink");
bingSearchTextContainerLink = d.gebi("bingSearchTextContainerLink");
yahooSearchTextContainerLink = d.gebi("yahooSearchTextContainerLink");

googleSearchInput = d.gebi("googleSearchInput");
bingSearchInput = d.gebi("bingSearchInput");
yahooSearchInput = d.gebi("yahooSearchInput");

arrowGoogle = d.gebi("arrowGoogle");
arrowBing = d.gebi("arrowBing");
arrowYahoo = d.gebi("arrowYahoo");

googleSearchBtn = d.gebi("googleSearchBtn");
bingSearchBtn = d.gebi("bingSearchBtn");
yahooSearchBtn = d.gebi("yahooSearchBtn");

googleSearchIcon = d.gebi("googleSearchIcon");
bingSearchIcon = d.gebi("bingSearchIcon");
yahooSearchIcon = d.gebi("yahooSearchIcon");

googleSearchTextContainerLink.onclick = function () {
  inputContainerId = this.id.replace("Link", "");
  inputContainer = d.gebi(inputContainerId);

  if (this.classList.contains("item-active")) {
    this.classList.remove("item-active");
    inputContainer.classList.remove("active-input-container");
    arrowGoogle.classList.remove("arrow-active");
    googleSearchInput.classList.add("hide-input");

    googleSearchBtn.classList.remove("scaled");
    googleSearchIcon.classList.remove("search-icon-visible");
    window.setTimeout(function () {
      googleSearchIcon.classList.add("hidden");
    }, 1);
  } else {
    this.classList.add("item-active");
    inputContainer.classList.add("active-input-container");
    arrowGoogle.classList.remove("arrow-active");
    googleSearchInput.classList.remove("hide-input");

    googleSearchBtn.classList.add("scaled");
    googleSearchIcon.classList.remove("hidden");
    window.setTimeout(function () {
      googleSearchIcon.classList.add("search-icon-visible");
    }, 1);
  }
};

bingSearchTextContainerLink.onclick = function () {
  inputContainerId = this.id.replace("Link", "");
  inputContainer = d.gebi(inputContainerId);

  if (this.classList.contains("item-active")) {
    this.classList.remove("item-active");
    inputContainer.classList.remove("active-input-container");
    arrowBing.classList.remove("arrow-active");
    bingSearchInput.classList.add("hide-input");

    bingSearchBtn.classList.remove("scaled");
    bingSearchIcon.classList.remove("search-icon-visible");
    window.setTimeout(function () {
      bingSearchIcon.classList.add("hidden");
    }, 1);
  } else {
    this.classList.add("item-active");
    inputContainer.classList.add("active-input-container");
    arrowBing.classList.add("arrow-active");
    bingSearchInput.classList.remove("hide-input");

    bingSearchBtn.classList.add("scaled");
    bingSearchIcon.classList.remove("hidden");
    window.setTimeout(function () {
      bingSearchIcon.classList.add("search-icon-visible");
    }, 1);
  }
};

yahooSearchTextContainerLink.onclick = function () {
  inputContainerId = this.id.replace("Link", "");
  inputContainer = d.gebi(inputContainerId);

  if (this.classList.contains("item-active")) {
    this.classList.remove("item-active");
    inputContainer.classList.remove("active-input-container");
    arrowYahoo.classList.remove("arrow-active");
    yahooSearchInput.classList.add("hide-input");

    yahooSearchBtn.classList.remove("scaled");
    yahooSearchIcon.classList.remove("search-icon-visible");
    window.setTimeout(function () {
      yahooSearchIcon.classList.add("hidden");
    }, 1);
  } else {
    this.classList.add("item-active");
    inputContainer.classList.add("active-input-container");
    arrowYahoo.classList.add("arrow-active");
    yahooSearchInput.classList.remove("hide-input");

    yahooSearchBtn.classList.add("scaled");
    yahooSearchIcon.classList.remove("hidden");
    window.setTimeout(function () {
      yahooSearchIcon.classList.add("search-icon-visible");
    }, 1);
  }
};

googleSearchInput.onkeydown = function (e) {
  if (e.key == "Enter" && this.value !== "") {
    openGoogleSearchTab(this.value.replace(" ", "%20"));
  }

  if (e.key == "Tab") {
    e.preventDefault();
    googleSearchBtn.focus();
  }
};

googleSearchIcon.onclick = function () {
  if (googleSearchInput.value !== "") {
    googleSearchIcon.classList.add("search-zoom-out-in");
    window.setTimeout(function () {
      openGoogleSearchTab(googleSearchInput.value.replace(" ", "%20"));
      googleSearchIcon.classList.remove("search-zoom-out-in");
    }, 500);
  }
};

googleSearchBtn.onkeydown = function (e) {
  if (e.key == "Enter" && googleSearchInput.value !== "") {
    googleSearchIcon.classList.add("search-zoom-out-in");
    window.setTimeout(function () {
      openGoogleSearchTab(googleSearchInput.value.replace(" ", "%20"));
      googleSearchIcon.classList.remove("search-zoom-out-in");
    }, 500);
  }
};

function openGoogleSearchTab(searchTerm) {
  googleSearchURL = `https://www.google.com/search?q=${searchTerm}`;

  googleTargetLink = d.ce("a");
  googleTargetLink.id = "googleTargetLinkInsert";
  googleTargetLink.href = googleSearchURL;
  googleTargetLink.target = "_blank";

  insertTargetLinkContainer = d.gebi("insertTargetLinkContainer");
  insertTargetLinkContainer.appendChild(googleTargetLink);

  googleA = d.gebi(googleTargetLink.id);
  googleA.click();
  googleA.remove();
}

bingSearchInput.onkeydown = function (e) {
  if (e.key == "Enter" && this.value !== "") {
    openBingSearchTab(this.value.replace(" ", "%20"));
  }
};

bingSearchIcon.onclick = function () {
  if (bingSearchInput.value !== "") {
    bingSearchIcon.classList.add("search-zoom-out-in");
    window.setTimeout(function () {
      openBingSearchTab(bingSearchInput.value.replace(" ", "%20"));
      bingSearchIcon.classList.remove("search-zoom-out-in");
    }, 500);
  }
};

bingSearchBtn.onkeydown = function (e) {
  if (e.key == "Enter" && bingSearchInput.value !== "") {
    bingSearchIcon.classList.add("search-zoom-out-in");
    window.setTimeout(function () {
      openBingSearchTab(bingSearchInput.value.replace(" ", "%20"));
      bingSearchIcon.classList.remove("search-zoom-out-in");
    }, 500);
  }
};

function openBingSearchTab(searchTerm) {
  bingSearchURL = `https://www.bing.com/search?q=${searchTerm}`;

  bingTargetLink = d.ce("a");
  bingTargetLink.id = "bingTargetLinkInsert";
  bingTargetLink.href = bingSearchURL;
  bingTargetLink.target = "_blank";

  insertTargetLinkContainer = d.gebi("insertTargetLinkContainer");
  insertTargetLinkContainer.appendChild(bingTargetLink);

  bingA = d.gebi(bingTargetLink.id);
  bingA.click();
  bingA.remove();
}

yahooSearchInput.onkeydown = function (e) {
  if (e.key == "Enter" && this.value !== "") {
    openYahooSearchTab(this.value.replace(" ", "%20"));
  }
};

yahooSearchIcon.onclick = function () {
  if (yahooSearchInput.value !== "") {
    yahooSearchIcon.classList.add("search-zoom-out-in");
    window.setTimeout(function () {
      openYahooSearchTab(yahooSearchInput.value.replace(" ", "%20"));
      yahooSearchIcon.classList.remove("search-zoom-out-in");
    }, 500);
  }
};

yahooSearchBtn.onkeydown = function (e) {
  if (e.key == "Enter" && yahooSearchInput.value !== "") {
    yahooSearchIcon.classList.add("search-zoom-out-in");
    window.setTimeout(function () {
      openYahooSearchTab(yahooSearchInput.value.replace(" ", "%20"));
      yahooSearchIcon.classList.remove("search-zoom-out-in");
    }, 500);
  }
};

function openYahooSearchTab(searchTerm) {
  yahooSearchURL = `https://search.yahoo.com/search?p=${searchTerm}`;

  yahooTargetLink = d.ce("a");
  yahooTargetLink.id = "yahooTargetLinkInsert";
  yahooTargetLink.href = yahooSearchURL;
  yahooTargetLink.target = "_blank";

  insertTargetLinkContainer = d.gebi("insertTargetLinkContainer");
  insertTargetLinkContainer.appendChild(yahooTargetLink);

  yahooA = d.gebi(yahooTargetLink.id);
  yahooA.click();
  yahooA.remove();
}

selectedCredential = "";
credentials = d.gebc("credential");

for (var i = 0; i < credentials.length; i++) {
  credentials[i].onclick = function () {
    removeCredentialSelected();
    selectedCredential = this.id;
    console.log(selectedCredential);
    this.classList.add("credential-selected");
  };
}

function removeCredentialSelected() {
  credentialIsSelected = d.gebc("credential-selected")[0];
  console.log(credentialIsSelected);
  if (credentialIsSelected !== undefined) {
    credentialIsSelected.classList.remove("credential-selected");
  }
}
