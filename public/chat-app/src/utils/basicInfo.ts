import axios from 'axios';

type OS={
    name:string,
    version:string
}
export const getOS:()=>OS =function(){
	var userAgent = navigator.userAgent.toLowerCase();
	var name = 'Unknown';
	var version = "Unknown";
	if(userAgent.indexOf("win") > -1) {
		name = "Windows";
		if(userAgent.indexOf("windows nt 5.0") > -1) {
			version = "Windows 2000";
		} else if(userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("windows nt 5.2") > -1) {
			version = "Windows XP";
		} else if(userAgent.indexOf("windows nt 6.0") > -1) {
			version = "Windows Vista";
		} else if(userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1) {
			version = "Windows 7";
		} else if(userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1) {
			version = "Windows 8";
		} else if(userAgent.indexOf("windows nt 6.3") > -1) {
			version = "Windows 8.1";
		} else if(userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 10.0") > -1) {
			version = "Windows 10";
		} else {
			version = "Unknown";
		}
	} else if(userAgent.indexOf("iphone") > -1) {
		name = "Iphone";
	} else if(userAgent.indexOf("mac") > -1) {
		name = "Mac";
		const res =userAgent.match(/mac os x ([\d]*)_([\d]*)_([\d]*)/i);
		if(res){
		 version = `${res[1]}.${res[2]}.${res[3]}`;
		}
	} else if(userAgent.indexOf("x11") > -1 || userAgent.indexOf("unix") > -1 || userAgent.indexOf("sunname") > -1 || userAgent.indexOf("bsd") > -1) {
		name = "Unix";
	} else if(userAgent.indexOf("linux") > -1) {
		if(userAgent.indexOf("android") > -1) {
			name = "Android"
		} else {
			name = "Linux";
		}
 
	} else {
		name = "Unknown";
	}
	const os:OS={
        name,
        version
    }
	return os;
	//document.write("系统：" + os.name + "版本:" + os.name)
}

export const getDeviceType :()=>string = () => {
	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
	  return "tablet";
	}
	if (
	  /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
	  )
	) {
	  return "mobile";
	}
	return "desktop";
  };

  export const getIP:()=>Promise<string>= async function(){
	const res = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
	if(res?.data){
		let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
		let ip = res.data.match(ipRegex)[0];
		return ip;
	}
  }