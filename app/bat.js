// BAT: Bruce Application Toolkit -- A packet manager for bruce
// https://github.com/AZachia/bat

const display = require("display");
const wifi = require("wifi");
const storage = require("storage");
const dialog = require("dialog");

const version = 0.1;
const gitUrl = "https://raw.githubusercontent.com/AZachia/bat/refs/heads/main/packages/";

// ui functions
function clear() {
  display.fill(display.color(0, 0, 0));
}

function splash() {
  display.setTextAlign(1, 1);
  display.drawText("BAT Package Manager", 50, 50);

  delay(2000);

  clear();
}


// core functions
function checkUpdate() {
  var response = wifi.httpFetch(gitUrl + "bat/pkg.json", { method: "GET" });
  if (response.ok) {
    var data = JSON.parse(response.body);
    if (data.version > version) {
      dialog.message("A new version is available: " + data.version, true);
      return true;
    } else {
      dialog.message("You are using the latest version: " + version, true);
      return false;
    }
  }
}

function startup() {
  // check if ".bat" folder exists
  var files = storage.readdir("/");
  if (files.indexOf(".bat") == -1) {
    storage.mkdir(".bat");
  }

  checkUpdate();

}

function appsMenu() {
  clear();
  var apps = storage.readdir("/.bat");
  if (apps.length == 0) {
    dialog.message("No apps installed", true);
    return;
  }
  var appNames = [];
}

function searchPackages() {
  packageName = dialog.prompt("", 30, "");
  return
}

function installMenu() {
  clear();
  const installMenuOptions = ["Search", "Browse", "Back"];
  var selected = dialog.choice(installMenuOptions);
  if (selected == "Search") {
    clear();
    searchPackages();
  }
  if (selected == "Browse") {
    clear();
    dialog.message("Not yet implemented", true);
  }
}




clear();

// splash();



startup();

if (!wifi.connected()) {
  wifi.connectDialog();
}


const menuOptions = ["Apps", "Manage", "Install", "Remove", "Infos", "Cancel"];
var selected = dialog.choice(menuOptions);

while (selected != "Cancel") {

  if (selected == "Apps") {
    appsMenu();
  }

  if (selected == "Manage") {
    clear();
    dialog.message("Not yet implemented", true);
  }

  if (selected == "Install") {
    installMenu();
  }

  if (selected == "Remove") {
    clear();
    dialog.message("Not yet implemented", true);
  }

   if (selected == "Infos") {
    clear();
    dialog.message("BAT\nBruce Application Toolkit - A packet manager for Bruce firmware", true);
  }

  var selected = dialog.choice(menuOptions);
}


