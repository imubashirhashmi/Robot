
document.body.oncontextmenu="return false";
//main(Parent) div
var mainDiv = document.getElementById("wrapper");

//Child Elements(objects)
var b = document.getElementById("bot");
var c = document.getElementById("bot1");
var d = document.getElementById("bot2");
// c.style.left = "0px";
// c.style.top = "300px";
// var c = CreateDiv(mainDiv, 'div', "circle", "140px", "140px", "400px", "100px", "red");
// const obs1 = new Obstacle(mainDiv, "div", "squ", "190px", "190px", "800px", "200px", "violet");
// var g = CreateDiv(mainDiv, "div", "squ", "90px", "90px", "500px", "200px", "blue");
// g.onmousedown = function(event) {g.style.background="red";};
// obs1.delibrateMoves();

//bot class objects
const bot1 = new Robot(mainDiv, b, 60, 60, "left", "back", 150, 200, 200);
// const bot2 = new Bot(c, 10, 10, "-", "0");
// const bot3 = new Bot(d, 10, 10, "+", "0");

var scripts = "bot2.move()";
function golu()
{
    return scripts
}


//Looping function that makes bots move
var start = setInterval(function(){
   bot1.start();


},);
// var start = setInterval(function(){
//     bot1.move();
//     bot2.move();
// },);
console.log("To add a bot: 'addBot(width, height, color)'");

function addBot(width, height, color, speed)
{
    const obstacle = new Obstacle(mainDiv, "div", "circle", width, height, "200px", "200px", color);
    const bot = new Bot(obstacle.obj, 5, 5, "+", "0", speed);
    x  = setInterval(function(){bot.move();},);
}

mainDiv.ondblclick = function (e) {
    let color = randColor();
    let width = 90;
    let height = 90;
    let left = (e.screenX - (width/2));
    let top = (e.screenY - (height/2)-70);
    const obja = new Obstacle(mainDiv, "div", `${randShape()}`, width, height, `${left}px`, `${top}px`, color);
    obja.delibrateMoves();
  }

  function randColor()
  {
    let rand = Math.floor((Math.random())*10) + 1;
    
    if(rand==1)
    {
        return "black";
    }
    else if(rand==2)
    {
        return "red";
    }
    else if(rand==3)
    {
        return "green";
    }
    else if(rand==4)
    {
        return "blue";
    }
    else if(rand==5)
    {
        return "yellow";
    }
    else if(rand==6)
    {
        return "pink";
    }
    else if(rand==7)
    {
        return "violet";
    }
    else if(rand==8)
    {
        return "indigo";
    }
    else if(rand==9)
    {
        return "orange";
    }
    else
    {
        return "grey";
    }
  }

  function randShape()
  {
    let rand = Math.floor((Math.random())*4) + 1;
    
    if(rand==1)
    {
        return "square";
    }
    else if(rand==2)
    {
        return "hrectangle";
    }
    else if(rand==3)
    {
        return "vrectangle";
    }
    else
    {
        return "circle";
    }
  }
 

  function downloadData( text, name, type="text/plain")
  {
      var el = document.createElement('a');
      el.setAttribute('href', `data:${type}; charset=utf-8,` + encodeURIComponent(text));
      el.setAttribute('download', name);
      el.style.display="none";
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
  }

  function getStats()
  {
    var text = bot1.router.testo;
    text+="</body></html>";
    downloadData(text, "botStats.html", "text/plain");
  }
      


