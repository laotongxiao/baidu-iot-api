// 1.AK/SK、host、method、URL绝对路径、querystring
var AK = "c02376d42a05434c****************"
var SK = "08ead63a52f84adc****************"
var host = "iotdm.gz.baidubce.com"
var method = "GET"
var canonicalQueryString =""
var query = "modifyAttribute"
var URI = "/v3/iot/management/device/wu_t_shadow"





var x_bce_date
var authStringPrefix
var CanonicalURI
var signingKey
var signingKeyStr
var Signature
var SignatureStr
var authorizationHeader



Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };

  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
        
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
    }       
  }

  return fmt;
}


function test(){
	//x_bce_date = new Date().format("yyyy-MM-ddThh:mm:ssZ");
	x_bce_date = "2020-03-20T13:33:41Z";
	//4.认证字符串前缀
	authStringPrefix = "bce-auth-v1" + "/" +AK + "/" +x_bce_date + "/" +"1800";
	//5.生成CanonicalRequest
	//5.1生成CanonicalURI
	CanonicalURI = encodeURI(URI);
	//6.生成signingKey
	signingKey = CryptoJS.HmacSHA256(authStringPrefix, SK);
	signingKeyStr = signingKey.toString();
	console.log("------------signingKeyStr000----------" + signingKeyStr);
	//7.生成Signature
	Signature = CryptoJS.HmacSHA256((method) + "\n" + (URI) + "\n" + (canonicalQueryString) + "\n" + "host:" + (host), signingKeyStr);
	SignatureStr = Signature.toString();
	authorizationHeader = authStringPrefix + "/" + "host" + "/" + SignatureStr;
	console.log("------------SignatureStr000----------" + SignatureStr);

}

function testapi(){

	var xmlhttp = new XMLHttpRequest();
	// get方法带参数是将参数写在url里面传过去给后端
	xmlhttp.open("GET", "http://iotdm.gz.baidubce.com/v3/iot/management/device/wu_t_shadow", true);
	xmlhttp.setRequestHeader("Authorization",(test()));
	xmlhttp.setRequestHeader("Host","iotdm.gz.baidubce.com");
	xmlhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
	xmlhttp.send(null);
	// readyState == 4 为请求完成，status == 200为请求陈宫返回的状态
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			//console.log(xmlhttp.responseText);
			alert("yes");
		}else{
			alert("no");
		}
	}
		
}

/*
function test02(){
	//x_bce_date = new Date().format("yyyy-MM-ddThh:mm:ssZ");
	x_bce_date = "2020-03-20T13:33:41Z";
	//4.认证字符串前缀
	authStringPrefix = "bce-auth-v1" + "/" +AK + "/" +x_bce_date + "/" +"1800";
	//5.生成CanonicalRequest
	//5.1生成CanonicalURI
	CanonicalURI = encodeURI(URI);
	//6.生成signingKey
	signingKey = CryptoJS.HmacSHA256(authStringPrefix, SK);
	signingKeyStr = signingKey.toString();
	console.log("------------signingKeyStr----------" + signingKeyStr);
	//7.生成Signature
	Signature = CryptoJS.HmacSHA256((method) + "\n" + (URI) + "\n" + (query) + "\n" + "content-type:" + encodeURIComponent("application/json;charset=utf-8") + "\n" + "host:" + (host) + "\n" + "x-bce-date:" + encodeURIComponent(x_bce_date), signingKeyStr);
	SignatureStr = Signature.toString();
	console.log("------------SignatureStr----------" + Signature);
}
*/
/*
function test(){
	//x_bce_date = new Date().format("yyyy-MM-ddThh:mm:ssZ");
	x_bce_date = "2020-03-20T13:33:41Z";
	//4.认证字符串前缀
	authStringPrefix = "bce-auth-v1" + "/" +AK + "/" +x_bce_date + "/" +"1800";
	//5.生成CanonicalRequest
	//5.1生成CanonicalURI
	CanonicalURI = encodeURI(URI);
	//5.2生成CanonicalQueryString
	CanonicalQueryString = query;
	CanonicalHeaders = "content-type:" + encodeURIComponent("application/json;charset=utf-8") + "\\n" + "host:" + host + "\\n" + "x-bce-date:" + encodeURIComponent(x_bce_date);
	//5.4拼接得到CanonicalRequest
	CanonicalRequest = (method + "\\n") + CanonicalURI + "\\n" + CanonicalQueryString + "\\n" + CanonicalHeaders;
	//6.生成signingKey
	signingKey = CryptoJS.HmacSHA256(authStringPrefix, SK);
	//console.log("------------signingKey----------" + signingKey);
	//7.生成Signature
	Signature = CryptoJS.HmacSHA256(CanonicalRequest, signingKey.toString());
	console.log("------------Signature----------" + Signature);
	console.log("------------CanonicalRequest----------" + CanonicalRequest);
	//var str = signingKey.replace(/\n/g,"<br/>");
	//alert(str);

}
*/

/*
function testapi(){
	$.ajax({
		type: "GET",
		url: "http://iotdm.gz.baidubce.com/v3/iot/management/device/wu_t_shadow",
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonpCallback",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Authorization",
			"Authorization": test()
		},
		success: function (data) {
			alert("ok")
		},
		error: function (a) {
			alert("出错");
		}
	});
}
*/
/*
function test1(){
	x_bce_date = new Date().format("yyyy-MM-ddThh:mm:ssZ");
	alert(x_bce_date);
	console.log("----------------------------------");

}
*/


