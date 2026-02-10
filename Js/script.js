import { openFeatures } from "./openfeature.js"
import { weatherFunctionality } from "./weather.js"
import { todoList } from "./todo.js"
import { dailyPlanner } from "./dayplanner.js"
import { motivationQuotesShow } from "./motivation.js"
import { pomoDoro } from "./pomo.js"
import { flipClock } from "./dashboard.js"
import { realtiming } from "./realtime.js"
import { themeChange } from "./theme.js"
import { updateFaviconColor } from "./favicon.js"

document.addEventListener("DOMContentLoaded", () => {
   openFeatures()
   weatherFunctionality()
   todoList()
   dailyPlanner()
   motivationQuotesShow()
   pomoDoro()
   flipClock()
   realtiming()
   themeChange()
   updateFaviconColor()
});
