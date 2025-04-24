// BAT: Bruce Application Toolkit -- A packet manager for bruce
// https://github.com/AZachia/bat

const display = require("display");
const wifi = require("wifi");
const storage = require("storage");
const dialog = require("dialog");

const serverUrl = "https://bat-five.vercel.app/";

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
function startup() {
  // check if ".bat" folder exists
  var files = storage.readdir("/");
  if (files.indexOf(".bat") == -1) {
    storage.mkdir(".bat");
  }
}

function installMenu() {
  clear();
  const installMenuOptions = ["Search", "Browse", "Back"];
  var selected = dialog.choice(installMenuOptions);
  if (selected == "Search") {
    clear();
    dialog.message("Not yet implemented", true);
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


const menuOptions = ["Manage", "Install", "Remove", "Infos", "Cancel"];
var selected = dialog.choice(menuOptions);

while (selected != "Cancel") {

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


