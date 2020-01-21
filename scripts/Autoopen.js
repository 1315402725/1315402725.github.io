var spawn = require('child_process').exec;

// Hexo 3 用户复制这段
hexo.on('new', function(data){
  spawn('start "" "C:\\Users\\Jerry\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe" ' + data.path);
});