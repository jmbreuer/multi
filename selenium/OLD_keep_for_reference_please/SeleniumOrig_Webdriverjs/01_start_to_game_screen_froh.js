// Test: Transition from start- to game screen
// Depends: Selenium WebdriverJS

var assert = require("assert"),
    webdriver = require("./lib/webdriver");

var client = new webdriver.Builder().
//    usingServer('http://localhost:4444/wd/hub').
    withCapabilities({
      'browserName': 'firefox',
      'version': '',
      'platform': 'ANY',
      'javascriptEnabled': true
    }).
    build();



client.manage().timeouts().implicitlyWait(10000);
// Construct URL to local file.
var test_url = "file://" + __dirname + "/../src/start.html";
client.get(test_url);

client.findElement(webdriver.By.linkText("Start game")).click();

var temp = client.findElement(webdriver.By.linkText("Next exercise"));
assert(temp);

client.sleep(2000);
client.quit();

