/* 封装ajax函数

 */
export function fetchPost(opt){
  opt = opt || {};
  opt.method = opt.method.toUpperCase() || 'POST';
  opt.url = opt.url || '';
  opt.async = opt.async || true;
  opt.data = opt.data || null;
  opt.dataType = opt.dataType || "json";
  opt.success = opt.success || function () {};
  var xmlHttp = null;
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  var params = [];
  for (var key in opt.data){
    params.push(key + '=' + opt.data[key]);
  }
  var postData = params.join('&');
  if (opt.method.toUpperCase() === 'POST') {
    xmlHttp.open(opt.method, opt.url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  }else if (opt.method.toUpperCase() === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
    xmlHttp.send(null);
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      opt.success(xmlHttp.responseText);
    }
  };
}

