//SET TIME INFO
//var startTime = (new Date()).getTime();
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};
var date456 = new Date();
if ((date456.getTimezoneOffset() < date456.stdTimezoneOffset()) == true) {
    var the_timezone_ds = date456.stdTimezoneOffset();
} else {
    var the_timezone_ds = date456.getTimezoneOffset();
};
//INITIAL VARIABLES
var the_account_domain = window.location.hostname.replace("www.", "");
var the_user_ip = "";
//COOKIE MANAGEMENT
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
//TOGGLE
function toggle123321() //added 123321
{
    if (document.getElementById("chat").style.visibility == "hidden") {
        document.getElementById("platform").style.backgroundColor = "#FFFFFF";
        document.getElementById("platform").style.boxShadow = "1px 4px 14px black";
        document.getElementById("header").style.visibility = "visible";
        document.getElementById("chat").style.visibility = "visible";
        document.getElementById("bottom").style.visibility = "visible";
        var the_style = (document.getElementById("minimized").getAttribute('style'));
        the_style = the_style.replace("display: block !important;", "display: none !important;");
        document.getElementById("minimized").setAttribute('style', the_style);
        document.getElementById("platform").style.bottom = "0px";
        document.getElementById("platform").style.right = "0px";
        document.getElementById("platform").style.marginBottom = "0px";
        document.getElementById("platform").style.marginRight = "0px";
        var x = document.getElementsByClassName("the_button");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.top = "295px";
            x[i].style.left = "25px";
        }
        document.cookie = "hide=false; path=/; SameSite=None; Secure";
    } else
    //if((document.getElementById("chat").style.visibility == "")||(document.getElementById("chat").style.visibility == "visible"))
    {
        document.getElementById("platform").style.backgroundColor = "transparent";
        document.getElementById("platform").style.boxShadow = "0px 0px 0px";
        document.getElementById("header").style.visibility = "hidden";
        document.getElementById("chat").style.visibility = "hidden";
        document.getElementById("bottom").style.visibility = "hidden";
        var the_style = (document.getElementById("minimized").getAttribute('style'));
        the_style = the_style.replace("display: none !important;", "display: block !important;");
        document.getElementById("minimized").setAttribute('style', the_style);
        document.getElementById("platform").style.bottom = "0px";
        document.getElementById("platform").style.right = "0px";
        document.getElementById("platform").style.marginBottom = "-250px";
        document.getElementById("platform").style.marginRight = "-125px";
        var x = document.getElementsByClassName("the_button");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.top = "3px";
            x[i].style.left = "-95px";
        }
        document.cookie = "hide=true; path=/; SameSite=None; Secure";
    }
};
//SPEED TEST
var SpeedTest = function() {};
SpeedTest.prototype = {
    file: '//www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    getname: '?time=',
    params: '&nocache=1',
    size: 524288,
    time: {
        start: 0,
        end: 0,
        run: 0
    },
    test: function(extend) {
        if (extend && extend.onStart) {
            extend.onStart();
        }
        var url = this.file + this.getname + (new Date()).getTime() + this.params;
        this.time.start = (new Date()).getTime();
        var test = this;
        var image = new Image();
        image.onload = function() {
            test.time.end = (new Date()).getTime();
            test.time.run = test.time.end - test.time.start;

            if (extend && extend.onEnd) {
                extend.onEnd(test.results());
            }
        };
        image.src = url;
    },
    results: function(extend) {
        if (!this.time.run) {
            return null;
        }
        return {
            time: this.time,
            mbps: (((this.size * 8 / 1024) / 1024) / (this.time.run / 1000))
        }
    }
};