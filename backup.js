class Bot
{
    constructor(obj, offsetX, offsetY, xRoute, yRoute, speed)
    {
        this.obj = obj;
        this.xMove=obj.getBoundingClientRect().x+offsetX;
        this.yMove=obj.getBoundingClientRect().y+offsetY;
        this.xRoute=xRoute;
        this.yRoute=yRoute;
        this.offsetX=offsetX;
        this.offsetY=offsetY;
        this.back=xRoute=="-"?true:false;
        this.straight=yRoute=="+"?true:false;
        this.objs = mainDiv.getElementsByTagName("div");
        this.obstacleBounds=[0];
        for(let ob =0; ob<this.objs.length; ob++)
        {
            this.obstacleBounds[ob] = this.objs[ob].getBoundingClientRect();
        }
        this.nearestObstacleForward=null;
        this.nearestObstacleBackward=null;
        this.botBounds = this.obj.getBoundingClientRect();
        this.prevPosX = null;
        this.prevPosY = null;
        this.speed = speed;
    }

    move()
    {
        this.obj.style.left = `${this.xMove}px`;
        this.obj.style.top = `${this.yMove}px`;
      
        this.router();
        this.objs = mainDiv.getElementsByTagName("div");
        this.botBounds = this.obj.getBoundingClientRect();
        for(let ob =0; ob<this.objs.length; ob++)
        {
            this.obstacleBounds[ob] = this.objs[ob].getBoundingClientRect();
        }
        if(this.objs.length>1)
        {
            this.watchOut();
        }
        
        if(this.prevPosX!=this.botBounds.x && this.xRoute!="0")
        {
            this.prevPosX=this.botBounds.x;
        }
        if(this.prevPosY!=this.botBounds.y && this.yRoute!="0")
        {
            this.prevPosY=this.botBounds.y;
        }
    }

    watchOut()
    {
        if(!this.isBackClear()&&this.back)
        {
            this.straight=false;
            this.back=true;
            if(this.isRightClear(this.nearestObstacleBackward)&&this.isLeftClear(this.nearestObstacleBackward)&&this.LeftOrRight(this.nearestObstacleBackward)=="r")
            {
                this.xRoute="0";
                this.yRoute="+";
            }
            else if(this.isRightClear(this.nearestObstacleBackward)&&this.isLeftClear(this.nearestObstacleBackward)&&this.LeftOrRight(this.nearestObstacleBackward)=="l")
            {
                this.xRoute="0";
                this.yRoute="-";
            }
            else
            {
                if(this.isRightClear(this.nearestObstacleBackward))
                {
                    this.xRoute="0";
                    this.yRoute="+";
                }
                else
                {
                    if(this.isLeftClear(this.nearestObstacleBackward))
                    {
                        this.xRoute="0";
                        this.yRoute="-";
                    }
                    else
                    {
                        this.xRoute="-";
                        this.yRoute="0";
                    }
                }
            } 
        }
        else
        {
            if(this.back)
            {
                if(this.nearestObstacleBackward!=null)
                {
                    this.obj.style.border ="none";
                }
                
                this.nearestObstacleBackward=null;
                this.xRoute="-";
                this.yRoute="0";
            }
        }

        if(!this.isStraightClear()&&this.straight)
        {
            this.straight=true;
            this.back=false;
            if(this.isRightClear(this.nearestObstacleForward)&&this.isLeftClear(this.nearestObstacleForward)&&this.LeftOrRight(this.nearestObstacleForward)=="r")
            {
                this.xRoute="0";
                this.yRoute="+";
            }
            else if(this.isRightClear(this.nearestObstacleForward)&&this.isLeftClear(this.nearestObstacleForward)&&this.LeftOrRight(this.nearestObstacleForward)=="l")
            {
                this.xRoute="0";
                this.yRoute="-";
            }
            else
            {
                if(this.isRightClear(this.nearestObstacleForward))
                {
                    this.xRoute="0";
                    this.yRoute="+";
                }
                else
                {
                    if(this.isLeftClear(this.nearestObstacleForward))
                    {
                        this.xRoute="0";
                        this.yRoute="-";
                    }
                    else
                    {
                        this.xRoute="-";
                        this.yRoute="0";
                    }
                } 
            }
        }
        else
        {
            if(this.straight)
            {
                if(this.nearestObstacleForward!=null)
                {
                    this.obj.style.border ="none";
                }
                
                this.nearestObstacleForward=null;
                this.xRoute="+";
                this.yRoute="0";
            }
        }

        
    }

    LeftOrRight(nearest)
    {
   
        let obstacle = nearest.getBoundingClientRect();
        if(this.yMove+(this.botBounds.height/2)<=obstacle.y+(obstacle.height/2))
        {
            return "l";
        }
        else
        {
            return "r";
        }
        
    }

    AnyObstacleOnRight(nearest)
    {
        let flag = false;
        this.objs = mainDiv.getElementsByTagName("div");
        let obstacle = nearest.getBoundingClientRect();

        for(let ob =0; ob<this.objs.length; ob++)
        {
            this.botBounds = this.obj.getBoundingClientRect();
            if(this.objs[ob]==this.obj||this.objs[ob]==nearest)
            {
                continue;
            }

            if((obstacle.y+obstacle.height+this.botBounds.height+10+this.offsetY>=this.objs[ob].getBoundingClientRect().y&&obstacle.y+obstacle.height+this.botBounds.height+10+this.offsetY<=this.objs[ob].getBoundingClientRect().y+this.objs[ob].getBoundingClientRect().height)&&(this.botBounds.x<=this.objs[ob].getBoundingClientRect().x+this.objs[ob].getBoundingClientRect().width+10+this.offsetX && this.botBounds.x+this.botBounds.width>=this.objs[ob].getBoundingClientRect().x-this.offsetX-10))
            {
           
                return true;
            }
            else
            {
                flag = false;
            }
        }

        return flag;
    }

    AnyObstacleOnLeft(nearest)
    {
        let flag = false;
        this.objs = mainDiv.getElementsByTagName("div");
        let obstacle = nearest.getBoundingClientRect();
        for(let ob =0; ob<this.objs.length; ob++)
        {
            this.botBounds = this.obj.getBoundingClientRect();
            if(this.objs[ob]==this.obj||this.objs[ob]==nearest)
            {
                continue;
            }

            if((obstacle.y-this.botBounds.height-10-this.offsetY<=this.objs[ob].getBoundingClientRect().y+this.objs[ob].getBoundingClientRect().height&&obstacle.y-this.botBounds.height-10-this.offsetY>=this.objs[ob].getBoundingClientRect().y)&&(this.botBounds.x<=this.objs[ob].getBoundingClientRect().x+this.objs[ob].getBoundingClientRect().width+10+this.offsetX && this.botBounds.x+this.botBounds.width>=this.objs[ob].getBoundingClientRect().x-this.offsetX-10))
            {
            
                return true;
            }
            else
            {
        
                flag = false;
            }
        }

        return flag;
    }

    isRightClear(nearest)
    {
   
        let yMax=window.innerHeight-this.offsetY-this.obj.getBoundingClientRect().height;
        let obstacle = nearest.getBoundingClientRect();

        if(obstacle.y+obstacle.height+10+this.offsetY>=yMax||this.AnyObstacleOnRight(nearest))
        {
            return false;
        }
        else
        {
            return true;
        }
        
    }

    isLeftClear(nearest)
    {
        let yMin=0+this.offsetY;
        let obstacle = nearest.getBoundingClientRect();

        if(obstacle.y-10-this.offsetY-this.botBounds.height<=yMin||this.AnyObstacleOnLeft(nearest))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    isStraightClear()
    {
        let flag = false;
        let xMin=0+this.offsetX;
        let xMax=window.innerWidth-this.offsetX-this.obj.getBoundingClientRect().width;
        let yMin=0+this.offsetY;
        let yMax=window.innerHeight-this.offsetY-this.obj.getBoundingClientRect().height;
        this.objs = mainDiv.getElementsByTagName("div");
       
        for(let ob =0; ob<this.objs.length; ob++)
        {
            if(this.objs[ob]==this.obj)
            {
                continue;
            }
            this.obstacleBounds[ob] = this.objs[ob].getBoundingClientRect();
            if((this.xMove+this.botBounds.width+this.offsetX>=this.obstacleBounds[ob].x-10&&this.xMove+this.botBounds.width+this.offsetX<this.obstacleBounds[ob].x+(this.obstacleBounds[ob].width/2))&&(this.yMove-this.offsetY<=this.obstacleBounds[ob].y+this.obstacleBounds[ob].height+10&&this.yMove+this.botBounds.height+10+this.offsetY>=this.obstacleBounds[ob].y))
            {
                this.nearestObstacleForward=this.objs[ob];
                // this.obj.style.border ="2px solid red";
                return false;
            }
            else
            {
                
                flag=true;
            }
        }
        return flag;   
    }

    isBackClear()
    {
        let flag = false;
        let xMin=0+this.offsetX;
        let xMax=window.innerWidth-this.offsetX-this.obj.getBoundingClientRect().width;
        let yMin=0+this.offsetY;
        let yMax=window.innerHeight-this.offsetY-this.obj.getBoundingClientRect().height;
        this.objs = mainDiv.getElementsByTagName("div");

        for(let ob =0; ob<this.objs.length; ob++)
        {
            if(this.objs[ob]==this.obj)
            {
                continue;
            }
            this.obstacleBounds[ob] = this.objs[ob].getBoundingClientRect();
            if((this.xMove<=this.obstacleBounds[ob].x+this.obstacleBounds[ob].width+10+this.offsetX&&this.xMove>this.obstacleBounds[ob].x+(this.obstacleBounds[ob].width/2))&&(this.yMove<=this.obstacleBounds[ob].y+this.obstacleBounds[ob].height+10+this.offsetY&&this.yMove+this.botBounds.height+10+this.offsetY>=this.obstacleBounds[ob].y))
            {
                this.nearestObstacleBackward=this.objs[ob];
                // this.obj.style.border ="2px solid red";
                return false;
            }
            else
            {
               
                flag=true;
            }

        }
        return flag;
    }

    router()
    {
        let xMin=0+this.offsetX;
        let xMax=window.innerWidth-this.offsetX-this.obj.getBoundingClientRect().width;
        let yMin=0+this.offsetY;
        let yMax=window.innerHeight-this.offsetY-this.obj.getBoundingClientRect().height;

        //movement on x-axis
        if(this.xRoute=="0")
        {
 
        }
        else
        {
            if(this.xMove==xMin)
            {
                this.xRoute="+";
                this.straight=true;
                this.back=false;
            }
            if(this.xMove==xMax)
            {
                this.xRoute="-";
                this.straight=false;
                this.back=true;
            }
            if(this.xMove>xMax)
            {
                this.xMove=xMax-1;
                this.xRoute="-";
                this.straight=false;
                this.back=true;
            }
            if(this.xMove<xMin)
            {
                this.xMove=xMin+1;
                this.xRoute="+";
                this.straight=true;
                this.back=false;
            }
            if(this.xRoute=="+")
            {
                this.xMove++;
            }
            if(this.xRoute=="-")
            {
                this.xMove--;
            }
        }

        //movement on y-axis
        if(this.yRoute=="0")
        {

        }
        else
        {
            if(this.yMove==yMin)
            {
                this.yRoute="+";
            }
            if(this.yMove==yMax)
            {
                this.yRoute="-";
            }
            if(this.yMove>yMax)
            {
                this.yMove=yMax-1;
                this.yRoute="-";
            }
            if(this.yMove<yMin)
            {
                this.yMove=yMin+1;
                this.yRoute="+";
            }
            if(this.yRoute=="+")
            {
                this.yMove++;
            }
            if(this.yRoute=="-")
            {
                this.yMove--;
            }
            
        } 
    }

    xVariance()
    {
        return (this.botBounds.x-this.prevPosX);
    }

    yVariance()
    {
        return (this.botBounds.y-this.prevPosY)
    }
}