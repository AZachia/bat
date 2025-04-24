// BAT: Bruce Application Toolkit -- A packet manager for bruce
// https://github.com/AZachia/bat

const display = require("display");
const wifi = require("wifi");
const storage = require("storage");
const dialog = require("dialog");

const serverUrl = "";

function clear() {
  display.fill(display.color(0, 0, 0));
}

function splash() {
  display.setTextAlign(1, 1);
  display.drawText("BAT Package Manager", 50, 50);

  delay(2000);

  clear();
}



clear();

// splash();



storage.mkdir(".bat");

if (!wifi.connected()) {
  wifi.connectDialog();
}


const menuOptions = ["Manage", "Install", "Infos", "Cancel"];
var selected = dialog.choice(menuOptions);

while (selected != "Cancel") {

  if (selected == "Manage") {
    clear();
    dialog.message("Not yet implemented", true);
  }

  if (selected == "Install") {
    clear();
    dialog.message("Not yet implemented", true);
  }

   if (selected == "Infos") {
    clear();
    dialog.message("BAT\nBruce Application Toolkit - A packet manager for Bruce firmware\n\ncredit: azachia", true);
  }

  var selected = dialog.choice(menuOptions);
}


