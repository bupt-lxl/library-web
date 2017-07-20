var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    FileInput = webdriver.FileDetector;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

let timeoutTime = 10000;
driver.get('http://10.108.137.127:8080/TeachingResourceManagement/');

/**
 * 账户密码登录
 */
function login(userNum, password, callback) {
    driver.findElement(By.name('userNum')).sendKeys(userNum);
    driver.findElement(By.name('password')).sendKeys(password);
    driver.findElement(By.className("btn btn-md btn-primary btn-block")).click();
}


/**
 * 游客登录方法
 */
function guestLogin() {
    driver.findElements(By.className("btn btn-md btn-primary btn-block")).then(function(ele) {
        ele[1].click();
    })
}

/**
 * 上传资源方法
 */
function goUploadPage(callback, path, description) {
    let button = driver.wait(until.elementLocated(By.className('upload-text')), timeoutTime);
    button.click().then(function() {
        callback(path, description);
        goHomePage();    
    });
}
/**
 * 上传资源方法
 * @param {*} path 
 * @param {*} description 
 */
function upload(path, description) {
    driver.wait(until.elementLocated(By.id("inputFile")), timeoutTime);

    driver.findElement(By.css('input[type=file]')).sendKeys(path);
    driver.findElement(By.id("description")).sendKeys(description);
    driver.findElement(By.css("input[type=radio]")).click();
    driver.findElement(By.css("input[type=submit]")).click();
    driver.wait(until.elementLocated(By.className("upload-again-text")), timeoutTime);
}
/**
 * 跳转到首页
 */
function goHomePage() {
    console.log("goHomePage")
    driver.wait(until.elementLocated(By.className("link"), timeoutTime)).click();
    driver.wait(until.elementLocated(By.className("rank-list-text")), timeoutTime);
}
/**
 * 跳转到下载页 并下载
 * @param {*} num  //表示下载次数
 */
function goDownloadPage(num) {
    // driver.findElement(By.className("link")).click(); // goHomePage
    let button = driver.wait(until.elementLocated(By.className('rank-list-text')), timeoutTime);
    button.click().then(function() {
        let download = driver.wait(until.elementLocated(By.className('download-style')), timeoutTime);
        let downloadCall;
        for(let i = 0; i < num; i++) {
            downloadCall = download.click()
        }
        downloadCall.then(function() {
            goHomePage();
        })
    });
}

let userNum = "20172017", password = "20172017", path = "/Users/yifeiyan/Downloads/128.mp3";
// path = "/Users/yifeiyan/Downloads/2aa62023-0d57-44aa-b7b0-b0bb6e3e6800_华为视讯MCUVP96系列视频.flv";
let description = "教学实训系统描述";

login(userNum, password);
goDownloadPage(3);
for(let i = 0; i < 2; i++) {
    goUploadPage(upload, path, description);
}

driver.quit();