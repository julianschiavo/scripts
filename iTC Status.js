// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: id-badge;
// Checks if apple has released sales reports
// for today. This script works
// well when when triggered from a Siri
// Shortcut. You can configure a Siri
// Shortcut from the script settings.

var good = ["Yup","Sure did","Yes","Looks like it","Yep","Correct","It is certain","It is decidedly so","Without a doubt","As I see it, yes"]
var bad = ["Nope","Not yet","No","Ask again later","No... Concentrate and ask again","My reply is no","My sources say no"]

var selectGood = good[Math.floor(Math.random()*good.length)];
var selectBad = bad[Math.floor(Math.random()*bad.length)];

var date = new Date()
date.setDate(date.getDate() - 1)

var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
var curMonth = months[date.getMonth()] + "."
var curDay = ((date.getDate() < 10) ? '0' : '') + date.getDate()

var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
var dayOfWeek = weekday[date.getDay()]

var key = dayOfWeek + " " + curMonth + " " + curDay
log(key)

let url = "https://appfigures.com/itcstatus/rss"
let r = new Request(url)
let body = await r.loadString()

// Use the global variable "config" to check
// if the app is run from Siri before we
// speak a text.
if (config.runsWithSiri) {
  if (body.includes(key)) {
    Speech.speak(selectGood)
    log(selectGood)
  } else {
    log(selectBad)
    Speech.speak(selectBad)
  }
}

if (config.runsInNotification) {
  let view = new WebView()
  await view.loadURL("https://appfigures.com/store-status/app-store-connect")
  view.present()
} else {
  Safari.openInApp("https://appfigures.com/store-status/app-store-connect")
}