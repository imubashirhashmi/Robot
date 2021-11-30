class Sight 
{
    constructor(parent, element, offsetX, offsetY)
    {
        console.log(element);
        this.parent=parent;
        this.element=element;
        this.offsetX=offsetX;
        this.offsetY=offsetY;
        this.sightOffsetY=element.getBoundingClientRect().height+offsetY;
        this.sightOffsetX=element.getBoundingClientRect().width+offsetX;
    }

    eastEye() // ==>
    {
        let obstacles=this.parent.getElementsByTagName("div"); 
        let obs=[];
        for(let ob=0,i=0; ob<obstacles.length; ob++)
        {
            if(obstacles[ob]!=this.element)
            {
                if(obstacles[ob].getBoundingClientRect().x>this.element.getBoundingClientRect().x+this.element.getBoundingClientRect().width+this.offsetX && (obstacles[ob].getBoundingClientRect().y+obstacles[ob].getBoundingClientRect().height>this.element.getBoundingClientRect().y - this.offsetY - this.sightOffsetY && obstacles[ob].getBoundingClientRect().y<this.element.getBoundingClientRect().y+this.element.getBoundingClientRect().height+this.offsetY+this.sightOffsetY))
                {
                    obs[i]=obstacles[ob];
                    i++;
                }
            }
        }
        obs = this.ascendingSort(obs, "east");
        return {
            boundry: window.innerWidth,
            distanceFromBoundry: window.innerWidth-this.element.getBoundingClientRect().x-this.element.getBoundingClientRect().width-3,
            obstaclesOnEast: obs
        };
    }

    westEye() // <==
    {
        let obstacles=this.parent.getElementsByTagName("div"); 
        let obs = [];
        for(let ob=0,i=0; ob<obstacles.length; ob++)
        {
            if(obstacles[ob]!=this.element)
            {
                if(obstacles[ob].getBoundingClientRect().x<this.element.getBoundingClientRect().x-this.offsetX && (obstacles[ob].getBoundingClientRect().y+obstacles[ob].getBoundingClientRect().height>this.element.getBoundingClientRect().y - this.offsetY - this.sightOffsetY && obstacles[ob].getBoundingClientRect().y<this.element.getBoundingClientRect().y+this.element.getBoundingClientRect().height+this.offsetY+this.sightOffsetY))
                {
                    obs[i]=obstacles[ob];
                    i++;
                }
            }
        }
        obs = this.ascendingSort(obs, "west");
        return {
            boundry: 0,
            distanceFromBoundry: this.element.getBoundingClientRect().x-0-3,
            obstaclesOnWest: obs
        }
    }

    northEye() // ^
    {
        let obstacles=this.parent.getElementsByTagName("div"); 
        let obs = [];
        for(let ob=0,i=0; ob<obstacles.length; ob++)
        {
            if(obstacles[ob]!=this.element)
            {
                if(obstacles[ob].getBoundingClientRect().y<this.element.getBoundingClientRect().y-this.offsetY && (obstacles[ob].getBoundingClientRect().x+obstacles[ob].getBoundingClientRect().width>this.element.getBoundingClientRect().x - this.offsetX - this.sightOffsetX && obstacles[ob].getBoundingClientRect().x<this.element.getBoundingClientRect().x+this.element.getBoundingClientRect().width+this.offsetX+this.sightOffsetX))
                {
                    obs[i]=obstacles[ob];
                    i++;
                }
            }
        }
        obs = this.ascendingSort(obs, "north");
        
        return {
            boundry: 0,
            distanceFromBoundry: this.element.getBoundingClientRect().y-0-3,
            obstaclesOnNorth: obs
        }
    }

    southEye()// v
    {
        let obstacles=this.parent.getElementsByTagName("div"); 
        let obs = [];
        for(let ob=0,i=0; ob<obstacles.length; ob++)
        {
            if(obstacles[ob]!=this.element)
            {
                if(obstacles[ob].getBoundingClientRect().y+obstacles[ob].getBoundingClientRect().height>this.element.getBoundingClientRect().y+this.element.getBoundingClientRect().height+this.offsetY && (obstacles[ob].getBoundingClientRect().x+obstacles[ob].getBoundingClientRect().width>this.element.getBoundingClientRect().x - this.offsetX - this.sightOffsetX && obstacles[ob].getBoundingClientRect().x<this.element.getBoundingClientRect().x+this.element.getBoundingClientRect().width+this.offsetX+this.sightOffsetX))
                {
                    obs[i]=obstacles[ob];
                    i++;
                }
            }
        }
        obs = this.ascendingSort(obs, "south");
        return {
            boundry: window.innerHeight,
            distanceFromBoundry: window.innerHeight-this.element.getBoundingClientRect().y-this.element.getBoundingClientRect().height-3,
            obstaclesOnSouth: obs
        }
    }

    ascendingSort(obs, direction)
    {
        for(let i=0; i<obs.length; i++)
        {
            for(let j=i+1; j<obs.length; j++)
            {
                switch(direction)
                {
                    case "east":
                        if(obs[i].getBoundingClientRect().x > obs[j].getBoundingClientRect().x)
                        {
                            let temp = obs[j];
                            obs[j]=obs[i];
                            obs[i]=temp;
                        }
                        break;
                    case "west":
                        if(obs[i].getBoundingClientRect().x+obs[i].getBoundingClientRect().width < obs[j].getBoundingClientRect().x+obs[j].getBoundingClientRect().width)
                        {
                            let temp = obs[j];
                            obs[j]=obs[i];
                            obs[i]=temp;
                        }
                        break;
                    case "north":
                        if(obs[i].getBoundingClientRect().y+obs[i].getBoundingClientRect().height < obs[j].getBoundingClientRect().y+obs[j].getBoundingClientRect().height)
                        {
                            let temp = obs[j];
                            obs[j]=obs[i];
                            obs[i]=temp;
                        }
                        break;
                    case "south":
                        if(obs[i].getBoundingClientRect().y > obs[j].getBoundingClientRect().y)
                        {
                            let temp = obs[j];
                            obs[j]=obs[i];
                            obs[i]=temp;
                        }
                        break;
                }
                
            }
        }

        return obs;
    }
    
};

class Router 
{
    constructor(element, speed, brakeIntensity, acceleration)
    {
        this.speed=0;
        this.speed_backup=speed/100;
        this.element=element;
        this.moveBack;
        this.moveStraight;
        this.moveLeft;
        this.moveRight;
        this.xMove=element.getBoundingClientRect().x;
        this.yMove=element.getBoundingClientRect().y;
        this.brakeIntensity=brakeIntensity; //10-1000
        this.acceleration=acceleration;  //10-1000
        this.hasBrakeApplied=false;
        this.isThrottling=false;
        this.testo=`<html><head><title>Robot Statistics</title></head><body><h1>Robot Statistics:</h1>`;
        
    }

    go(directionX, directionY)
    { 
        if(directionX=="left")
        {
            this.xMove-=this.speed;
        }

        if(directionX=="right")
        {
            this.xMove+=this.speed;            
        }
    
        if(directionY=="straight")
        {
            this.yMove-=this.speed;
        }
    
        if(directionY=="back")
        {
            this.yMove+=this.speed;
        }

        this.element.style.left = `${this.xMove}px`;
        this.element.style.top = `${this.yMove}px`;
    }

    CreateSmokeElement(parent, width, height, left, right, top, bottom, color="black", blur="50px", size="4px", translateX, translateY)
    {
        let el=window.document.createElement("div");
        el.style.position="absolute";
        el.style.width=`${width}px`;
        el.style.height=`${height}px`;
        el.style.left=`${left}`;
        el.style.right=`${right}`;
        el.style.top=`${top}`;
        el.style.bottom=`${bottom}`;
        el.style.zIndex=-1;
        el.style.transform=`translate(${translateX}, ${translateY})`;
        el.style.boxShadow=`0 0 ${blur} ${size} ${color}, 10px 0 50px ${4}px yellow`;
        el._parentElement=parent;
        return parent.appendChild(el);
    }

    deleteSmokeElement(another)
    {
        setTimeout(() => {
            this.element.removeChild(another);
        }, 10);
        
    }

    fade(el, fade_, duration, interval)
    {
        let op;
        let iop;
        if(fade_=="in")
        {
            op=0.0;
            iop=1;
            let timer = setInterval(function(){
                if(op>=iop)
                {
                    op=iop;
                    clearInterval(timer);
                }
                el.style.opacity=op;
                op+= iop/((1000/interval)*duration);
    
            }, interval);
        }
        else if(fade_=="out")
        {
            op=el.style.opacity;
            iop=0.0;
            let timer = setInterval(function(){
                if(op<=iop)
                {
                    op=iop;
                    clearInterval(timer);
                }
                el.style.opacity=op;
                op+= iop/((1000/interval)*duration);
    
            }, interval);
        }   
        
    }

    brake()
    {
        this.hasBrakeApplied=true;
        if(this.speed>0)
        {
            if(this.speed-(this.brakeIntensity/(this.brakeIntensity*this.brakeIntensity))<0)
            {
                this.speed=0;
            }
            else
            {
                this.speed = this.speed-(this.brakeIntensity/(this.brakeIntensity*this.brakeIntensity));
                this.testo+=`<div>Speed: ${this.speed} | calculations: ${((this.brakeIntensity)-1)*(this.speed_backup/2)}</div>`;
            }
            
        }
        else
        {
            this.hasBrakeApplied=false;
        }

        
    }

    throttle()
    {
        if(this.speed<this.speed_backup)
        {
            if(this.speed+(this.acceleration/(this.acceleration*this.acceleration))>this.speed_backup)
            {
                this.speed=this.speed_backup;
            }
            else
            {
                this.speed = this.speed+(this.acceleration/(this.acceleration*this.acceleration));
                this.isThrottling=true;
            }
            
        }
        else
        {
            this.speed=this.speed_backup;
            this.isThrottling=false;
        }
        
    }
};

class Advisor
{
    constructor(sight, router, directionX, directionY)
    {
        this.sight=sight;
        this.router=router;
        this.botBounds=this.router.element.getBoundingClientRect();
        this.right=this.sight.eastEye();
        this.left=this.sight.westEye();
        this.straight=this.sight.northEye();
        this.back=this.sight.southEye();
        this.directionX=directionX;
        this.directionY=directionY;

    }

    whereToGo()
    {
        this.refreshData();
        if(this.hasBoundryReached().right && this.directionX=="right")
        {
            this.router.brake();
            if(this.router.speed<=0)
            {
                this.directionX="left";
            }
        }
        else if(this.hasBoundryReached().left && this.directionX=="left")
        {
            this.router.brake();
            if(!this.router.hasBrakeApplied)
            {
                this.directionX="right";
            }
        }
        else if(this.hasBoundryReached().straight && this.directionY=="straight")
        {
            this.router.brake();
            if(this.router.speed<=0)
            {
                this.directionY="back";
            }
        }
        else if(this.hasBoundryReached().back && this.directionY=="back")
        {
            this.router.brake();
            if(this.router.speed<=0)
            {
                this.directionY="straight";
            }
        }
        else
        {
            this.router.throttle();
           
        }

    {
        if(this.directionX=="left")
        {
            let el = this.router.CreateSmokeElement(this.router.element, `${this.router.speed*50}`, 0, "250%", "auto", "50%", "auto", "red", "50px", "4px", "50%", "-50%");
            this.router.deleteSmokeElement(el);
        }
        else if(this.directionX=="right")
        {
            let el = this.router.CreateSmokeElement(this.router.element, `${this.router.speed*50}`, 0, `auto`, `${250}%`, "50%", "auto", "red", "50px", "4px", "-50%", "-50%");
            this.router.deleteSmokeElement(el);
        }

        if(this.directionY=="straight")
        {
            let el = this.router.CreateSmokeElement(this.router.element, 0, `${this.router.speed*50}`, "50%", "auto", "250%", "auto", "red", "50px", "4px", "50%", "50%");
            this.router.deleteSmokeElement(el);
        }
        else if(this.directionY=="back")
        {
            let el = this.router.CreateSmokeElement(this.router.element, 0, `${this.router.speed*50}`, "50%", "auto", "auto", "250%", "red", "50px", "4px", "50%", "-50%");
            this.router.deleteSmokeElement(el);
        }
    }

    
    {
        // if(!this.router.hasBoundryReached)
        // {
        //     this.router.throttle();
        // }
        
        // switch(this.directionX)
        // {
        //     case "right":
        //         if(this.right.distanceFromBoundry-this.sight.offsetX<=distance)
        //         {
        //             this.router.brake();
        //         }
        //         else
        //         {
        //             if(this.right.obstaclesOnEast.length>0)
        //             {
        //                 let nearest = this.right.obstaclesOnEast[0].getBoundingClientRect();
        //                 if((this.botBounds.y>=nearest.y) && this.botBounds.y-this.sight.offsetY<=nearest.y+nearest.height)
        //                 {
        //                     this.directionY="back";
        //                 }   
        //                 else if((this.botBounds.y<nearest.y) && this.botBounds.y+this.botBounds.height+this.sight.offsetY>=nearest.y)
        //                 {
        //                     this.directionY="straight";
        //                 }
        //                 else
        //                 {
        //                     this.directionY="null";
        //                 } 
        //             }

        //             this.router.throttle();   
        //         }
        //         if(this.router.speed<=0 && this.right.distanceFromBoundry>=distance)
        //         {
        //             this.directionX="left";
        //         }
        //         break;

        //     case "left":
        //         if(this.left.distanceFromBoundry-this.sight.offsetX<=distance)
        //         {
        //             this.router.brake();
        //         }
        //         else
        //         {
        //             if(this.left.obstaclesOnWest.length>0)
        //             {
        //                 let nearest = this.left.obstaclesOnWest[0].getBoundingClientRect();
        //                 if((this.botBounds.y>=nearest.y) && this.botBounds.y-this.sight.offsetY<=nearest.y+nearest.height)
        //                 {
        //                     this.directionY="back";
        //                 }   
        //                 else if((this.botBounds.y<nearest.y) && this.botBounds.y+this.botBounds.height+this.sight.offsetY>=nearest.y)
        //                 {
        //                     this.directionY="straight";
        //                 }
        //                 else
        //                 {
        //                     this.directionY="null";
        //                 } 
        //             }

        //             this.router.throttle(); 
        //         }

        //         if(this.router.speed<=0 && this.left.distanceFromBoundry>=distance)
        //         {
        //             this.directionX="right";
        //         }
        //         break;
        // }

        // switch(this.directionY)
        // {
            
        //     case "straight":
        //         if(this.straight.distanceFromBoundry-this.sight.offsetY<=distance)
        //         {
        //             this.router.brake();
        //         }
        //         else
        //         {
        //             this.router.throttle();   
        //         }

        //         if(this.router.speed<=0 && this.straight.distanceFromBoundry>=distance)
        //         {
        //             this.directionY="back";
        //         }
        //         break;
        //     case "back":
        //         if(this.back.distanceFromBoundry-this.sight.offsetY<=distance)
        //         {
        //             this.router.brake();
        //         }
        //         else
        //         {
        //             this.router.throttle(); 
        //         }

        //         if(this.router.speed<=0 && this.back.distanceFromBoundry>=distance)
        //         {
        //             this.directionY="straight";
        //         }
        //         break;
        // }
    }
        this.router.go(this.directionX, this.directionY);

    }

    refreshData()
    {

        this.botBounds=this.router.element.getBoundingClientRect();
        if(this.directionX=="right")
        {
            this.right=this.sight.eastEye();
        }
        else if(this.directionX=="left")
        {
            this.left=this.sight.westEye();
        }

        if(this.directionY=="straight")
        {
            this.straight=this.sight.northEye();
        }
        else if(this.directionY=="back")
        {
            this.back=this.sight.southEye();
        }
        else
        {

        }
  
    }

    hasBoundryReached()
    {
        let distance = ((this.router.brakeIntensity*this.router.speed)-1)*(this.router.speed/(2));
        let left = false, right = false, straight = false, back = false;

        if(this.right.distanceFromBoundry-this.sight.offsetX<=distance)
        {
            right=true;
        }
        
        if(this.left.distanceFromBoundry-this.sight.offsetX<=distance)
        {
            left=true;
        }
    
        if(this.straight.distanceFromBoundry-this.sight.offsetY<=distance)
        {
            straight=true;
        }

        if(this.back.distanceFromBoundry-this.sight.offsetY<=distance)
        {
            back=true;
        }

        return {
            right: right,
            left: left,
            straight: straight,
            back: back
        }  
    }
};



class Robot
{
    constructor(parent, element, offsetX, offsetY, directionX="right", directionY="null", speed, brakeIntensity, acceleration)
    {
        this.sight = new Sight(parent, element, offsetX, offsetY);
        this.router=new Router(element, speed, brakeIntensity, acceleration);
        this.advisor = new Advisor(this.sight, this.router, directionX, directionY);
        this.element = element;
        this.parent=parent;
            
    }

    start()
    {
        this.advisor.refreshData();
        this.advisor.whereToGo();
    }
};


//main(Parent) div
var mainDiv = document.getElementById("wrapper");

//Child Elements(objects)
var b = document.getElementById("bot");