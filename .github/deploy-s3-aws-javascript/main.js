const core = require("@actions/core")
const github = require("@actions/github")
const exec = require("@actions/core")
function run(){
 core.notice("Hello from my custom js action.")
}

run()