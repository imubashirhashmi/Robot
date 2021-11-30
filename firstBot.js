
//                                                 ------------VARIABLES------------
{
    var speed = 0;
    var ex=0, wy=0;
    var bot = document.getElementById("bot");
    var statsdata =`<html><head><title>stats for nerds</title></head><body><div>this is stats data</div>`;
    let offset = 10;
    dw = bot.offsetWidth + offset;
    dh = bot.offsetHeight + offset;
    var minima = offset;
    var botPosX, botPosY;
    var botPosXrecent, botPosYrecent;
    var sizeOfData=0;
    ex = Math.floor(Math.random()*(window.innerWidth-dw));
    wy = Math.floor(Math.random()*(innerHeight-dh));
    bot.style.left= `${ex}px`;
    bot.style.top= `${wy}px`;
    botPosX=getPos(bot).x;
    botPosY=getPos(bot).y;
    clever_bot();
    botPosX=getPos(bot).x;
    botPosY=getPos(bot).y;
    var delayer1 = 1, delayer2 = 1;
    var c = document.getElementById("wrapper").querySelectorAll(".obj");
    console.log(c.length);
    
    }
    
    //                                                 ------------FUNCTIONS------------
    var startBot = setInterval(function(){
        botStarter();         
    },speed);
    // var startBot = setInterval(function(){
    //     botStarter();         
    // },speed);
    // var startBot = setInterval(function(){
    //     botStarter();         
    // },speed);
    
    function botStarter()
    {
        if(delayer1==3)
        {
            botPosX=botPosXrecent;
            botPosY=botPosYrecent;
            delayer1=0;
        }
        if(delayer2==2)
        {
            botPosXrecent=getPos(bot).x;
            botPosYrecent=getPos(bot).y;
            delayer2=0;
        }
        if(sizeOfData>=50000)
        {
            statsdata = `<html><head><title>stats for nerds</title></head><body><div>this is stats data</div>`;
            sizeOfData = 0;
        }
        clever_bot(); 
        delayer1++;
        delayer2++;  
        sizeOfData++; 
    }
    
    function clever_bot()
            {
                let signal = route_advisor();
                router(signal); 
            }
    
    function router(value)
    {
        switch(value)
        {
            case "++":
                ex++;
                wy++;
                break;
            case "+-":
                ex++;
                wy--;
                break;
            case "-+":
                ex--;
                wy++;
                break;
            case "--":
                ex--;
                wy--;
                break;
            default:
                
        }
    
        bot.style.left= `${ex}px`;
        bot.style.top= `${wy}px`;
    }
    
    function checkNearBy()
    {
    }
    
    function route_advisor()
    {
        
        height = window.innerHeight;
        width = window.innerWidth;
        xPos = getPos(bot).x;
        yPos = getPos(bot).y;
    
    
        /* if the bot is moving and boundry is too closed then here the fact will be detected
            and bot will, after reaching boundry, choose opposite route for that axis. 
                The returned(output) signal will be; +x+y || +x-y || -x+y || -x-y */
        if(getPos(bot).x<minima)
        {
            ex=(minima+3);
        }
    
        if(getPos(bot).x>width-dw)
        {
            ex=width-dw-3;
        }
    
        if(getPos(bot).y<minima)
        {
            wy=(minima+3); 
        }
        
        if(getPos(bot).y>height-dh)
        {
            wy=height-dh-3;
        }
    
        if((getPos(bot).x==minima) && (xVariant(bot)=="-"))
        {
            if((getPos(bot).y==minima) && (yVariant(bot)=="-"))
            {
                statsdata += `<div>x is 0 and y is also 0------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                ex=minima+3; wy=minima+3;   
                return "++"; //bot should take the opposite route both; horizontally and vertically.
            }
            else if((yPos==height-dh) && (yVariant(bot)=="+"))
            {
                statsdata += `<div>x is 0 and y is maximum------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                ex=minima+3; wy=height-dh - 3; 
                return "+-";
            }
            else 
            {
                statsdata += `<div>x is 0 and y is somewhere between------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                ex=minima+3;
                return `+${yVariant(bot)}`;
            }
        }
        else if((xPos==width-dw) && (xVariant(bot)=="+"))
        {
            if((getPos(bot).y==minima) && (yVariant(bot)=="-"))
            {
                statsdata += `<div>x is maximum and y is 0------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                ex=width-dw - 3; wy=minima+3;
                return "-+"; //bot should take the opposite route both; horizontally and vertically.
            }
            else if((yPos==height-dh) && (yVariant(bot)=="+"))
            {
                statsdata += `<div>x is maximum and y is also maximum------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                ex=width-dw - 3; wy=height-dh - 3;
                return "--";
            }
            else 
            {
                statsdata += `<div>x is maximum and y is somewhere between------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                ex=width-dw - 3;
                return `-${yVariant(bot)}`;
            }
        }
        else
        {
            if((getPos(bot).y==minima) && (yVariant(bot)=="-"))
            {
                statsdata += `<div>x is somewhere between and y is 0------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                wy=minima+3;
                return `${xVariant(bot)}+`; //bot should take the opposite route both; horizontally and vertically.
            }
            else if((yPos==height-dh) && (yVariant(bot)=="+"))
            {
                statsdata += `<div>x is somewhere between and y is maximum------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                wy=height-dh - 3;
                return `${xVariant(bot)}-`;
            }
            else 
            {
                if(xVariant(bot)=="0" && yVariant(bot)=="0")
                {
                    statsdata += `<div>x is somewhere between and y also is somewhere between but both are not moving------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                    return whereToGo();
                }
                else
                {
                    statsdata += `<div>x is somewhere between and y also is somewhere between------BotPos: ${getPos(bot).x}, ${getPos(bot).y} | prevPos: ${botPosX}, ${botPosY} | Variation: ${xVariant(bot)}, ${yVariant(bot)} | ScreenDimensions: ${width-dw}, ${height-dh}</div>`;
                    return `${xVariant(bot)}${yVariant(bot)}`;   
                }      
            }
        }
    }
    
    function whereToGo()
    {
        let x = Math.floor(Math.random()*4)+1;
        switch(x)
        {
            case 1:
                return "++";
                break;
            case 2:
                return "--";
                break;
            case 3:
                return "-+";
                break;
            case 4:
                return "+-";
                break;
            default:
        }
    }
    
    function xVariant(element)
    {
        if (getPos(element).x < botPosX)
        {
            return "-";
        }
        
        if (getPos(element).x == botPosX)
        {
            return "0";
        }
    
        if (getPos(element).x > botPosX)
        {
            return "+";
        } 
    }
    
    function yVariant(element)
    {
        if (getPos(element).y < botPosY)
        {
            return "-";
        }
        
        if (getPos(element).y == botPosY)
        {
            return "0";
        }
    
        if (getPos(element).y > botPosY)
        {
            return "+";
        }
    }
    
    function getPos(element)
    {
        const rect = element.getBoundingClientRect();
        return {
            x:rect.x + window.scrollX,
            y:rect.y + window.scrollY
        };
    }
    
    
    function download(text, name, type) {
        var element = document.createElement('a');
        element.setAttribute('href', `data:${type};charset=utf-8,` + encodeURIComponent(text));
        element.setAttribute('download', name);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        }
    
    function getStats()
    {
        download(statsdata, "botActivityLog.html", "text/plain");
    }
    
    //                                           ----------------WORKING----------------
    
    //  clever bot basic idea
    //  a function called "clever_bot()" will be invoked 10 times in a second
    //  all the abstract functionality will be performed inside the compound function "clever_bot()"
    /*  clever_bot() will, first of all, save the horizontal and vertical positions of bot to compare them 
            with the current ones later. Function; getPos(element).x and getPos(element).y */
    /*  The function route_advisor() will be called to get what movements should the bot take and then 
            the returned signal will be passed to a function called router() that will take control of the bot's movements */
    
    
    
    
    
    
    
    
    
    /*                                            ----------------GARBAGE----------------
        let move = [
        { transform: `translate(0px,0px)` },
        { transform: `translate(${seconds}px, -300px)` }
        ];
    
        let set1 = {
            duration: 3000,
            iterations: Infinity,
            direction: 'alternate'
        };
    
        // b.animate(move, set1); */