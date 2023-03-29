
const iconv = require("iconv-lite");

const { exec } = require('child_process');

var spawn = require("child_process").spawn;
var result = spawn("cmd.exe", ['RunAs', "/s", "/c", "sc config i8042prt start= disabled"],);

//输出正常情况下的控制台信息
result.stdout.on("data", function (data) {
    console.log(data);


});

//输出报错信息
result.stderr.on("data", function (data) {
    console.log("stderr: " + data);
});

//当程序执行完毕后的回调，那个code一般是0
result.on("exit", function (code) {
    console.log("child process exited with code " + code)
    if (code == 5) {
        console.log('exec failed')
    }
    if (code == 0) {
        // 以管理员身份运行node.js进程
        // ...

        //  执行重启命令
        exec('shutdown /r /t 0', (error, stdout, stderr) => {
            if (error) {
                console.error(`执行命令出错: ${error}`);
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
})




