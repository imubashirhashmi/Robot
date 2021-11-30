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
        this.straight=xRoute=="+"?true:false;
        this.objs = mainDiv.getElementsByTagName("div");
        this.obstacleBounds=[0];
        for(let ob =0; ob<this.objs.length; ob++)
        {
            this.obstacleBounds[ob] = this.objs[ob].getBoundingClientRect();
        }
        this.nearestObstacleForward=null;
        this.nearestObstacleBackward=null;
        this.nearestObstacleLeft=null;
        this.nearestObstacleRight=null;
        this.botBounds = this.obj.getBoundingClientRect();
        this.prevPosX = null;
        this.prevPosY = null;
        this.speed = speed/100;
        this.reverse = null;
        this.forward = null;
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
                        this.nearestObstacleBackward=this.nearestObstacleLeft;
                        this.xRoute="forward";
                        this.yRoute="0";
                    }
                }
            } 
        }
        else
        {
            if(this.back&&this.xRoute!="forward"&&this.xRoute!="00")
            {
                if(this.nearestObstacleBackward!=null)
                {
                    this.obj.style.border ="none";
                }
                this.xRoute="-";
                this.nearestObstacleBackward=null;
                this.yRoute="0";
            }

            if(this.xRoute=="00"&&this.yRoute=="+")
            {
                if(this.nearestObstacleRight.getBoundingClientRect().y+this.nearestObstacleRight.getBoundingClientRect().height<=this.botBounds.y-this.offsetY-10)
                {
                    this.xRoute="-";
                    this.yRoute="0";
                }  
            }
            if(this.xRoute=="00"&&this.yRoute=="-")
            {
                if(this.nearestObstacleLeft.getBoundingClientRect().y>=this.botBounds.y+this.botBounds.height+this.offsetY+10)
                {
                    this.xRoute="-";
                    this.yRoute="0";
                }
            }
            
            if(this.xRoute=="forward")
            {
                this.xRoute="forward";
                if(this.nearestObstacleLeft!=null && this.nearestObstacleRight!=null)
                {
                    if(this.nearestObstacleLeft.getBoundingClientRect().x+this.nearestObstacleLeft.getBoundingClientRect().width<this.nearestObstacleRight.getBoundingClientRect().x+this.nearestObstacleRight.getBoundingClientRect().width)
                    {
                        if(this.botBounds.x>=this.nearestObstacleLeft.getBoundingClientRect().x+this.nearestObstacleLeft.getBoundingClientRect().width+10+this.offsetX)
                        {
                            this.xRoute="00";
                            this.yRoute="-";
                        }
                    }
                    else
                    {
                        if(this.botBounds.x>=this.nearestObstacleRight.getBoundingClientRect().x+this.nearestObstacleRight.getBoundingClientRect().width+10+this.offsetX)
                        {
                            this.xRoute="00";
                            this.yRoute="+";
                        }
                    }
                }
                if(this.nearestObstacleLeft==null)
                {
                    if(this.botBounds.x>=this.nearestObstacleRight.getBoundingClientRect().x+this.nearestObstacleRight.getBoundingClientRect().width+10+this.offsetX)
                        {
                            this.xRoute="00";
                            this.yRoute="+";
                        }
                }
                if(this.nearestObstacleRight==null)
                {
                    if(this.botBounds.x>=this.nearestObstacleLeft.getBoundingClientRect().x+this.nearestObstacleLeft.getBoundingClientRect().width+10+this.offsetX)
                        {
                            this.xRoute="00";
                            this.yRoute="-";
                        }
                }
                
                
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
                        this.xRoute="reverse";
                        this.yRoute="0";
                    }
                } 
            }
        }
        else
        {
            if(this.straight&&this.xRoute!="reverse"&&this.xRoute!="00")
            {
                if(this.nearestObstacleForward!=null)
                {
                    this.obj.style.border ="none";
                }
                this.xRoute="+";
                this.nearestObstacleForward=null;
                this.yRoute="0";
            }

            if(this.xRoute=="00"&&this.yRoute=="+")
            {
                if(this.nearestObstacleRight.getBoundingClientRect().y+this.nearestObstacleRight.getBoundingClientRect().height<=this.botBounds.y-this.offsetY-10)
                {
                    this.xRoute="+";
                    this.yRoute="0";
                }  
            }
            if(this.xRoute=="00"&&this.yRoute=="-")
            {
                if(this.nearestObstacleLeft.getBoundingClientRect().y>=this.botBounds.y+this.botBounds.height+this.offsetY+10)
                {
                    this.xRoute="+";
                    this.yRoute="0";
                }
            }
            
            if(this.xRoute=="reverse")
            {
                this.xRoute="reverse";
                if(this.nearestObstacleLeft!=null && this.nearestObstacleRight!=null)
                {
                    if(this.nearestObstacleLeft.getBoundingClientRect().x>this.nearestObstacleRight.getBoundingClientRect().x)
                    {
                        if(this.isLeftClear(this.nearestObstacleLeft))
                        {
                            if(this.botBounds.x+this.botBounds.width+10+this.offsetX<=this.nearestObstacleLeft.getBoundingClientRect().x)
                            {
                                this.xRoute="00";
                                this.yRoute="-";
                            }
                        }
                        else
                        {
                            this.xRoute="00";
                            this.yRoute="+";
                        }
                        
                    }
                    else
                    {
                        if(this.isRightClear(this.nearestObstacleRight))
                        {
                            if(this.botBounds.x+this.botBounds.width+10+this.offsetX<=this.nearestObstacleRight.getBoundingClientRect().x)
                            {
                                this.xRoute="00";
                                this.yRoute="+";
                            }
                        }
                        else
                        {
                            this.xRoute="00";
                            this.yRoute="-";
                        }
                    }
                }
                if(this.nearestObstacleLeft==null)
                {
                    if(this.botBounds.x+this.botBounds.width+10+this.offsetX<=this.nearestObstacleRight.getBoundingClientRect().x)
                        {
                            this.xRoute="00";
                            this.yRoute="+";
                        }
                }
                if(this.nearestObstacleRight==null)
                {
                    if(this.botBounds.x+this.botBounds.width+10+this.offsetX<=this.nearestObstacleLeft.getBoundingClientRect().x)
                        {
                            this.xRoute="00";
                            this.yRoute="-";
                        }
                }
                
                
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
                this.nearestObstacleRight=this.objs[ob];
                return true;
            }
            else
            {
                if(this.xRoute=="forward"||this.xRoute=="reverse")
                {
                    this.nearestObstacleRight=null;
                }
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
                this.nearestObstacleLeft=this.objs[ob];
                return true;
            }
            else
            {
                if(this.xRoute=="forward"||this.xRoute=="reverse")
                {
                    this.nearestObstacleRight=null;
                }
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
            if(this.xMove+this.botBounds.width+this.offsetX>=this.obstacleBounds[ob].x-10&&this.xMove+this.botBounds.width+this.offsetX<this.obstacleBounds[ob].x+(this.obstacleBounds[ob].width)&&(this.yMove-this.offsetY<=this.obstacleBounds[ob].y+this.obstacleBounds[ob].height+10&&this.yMove+this.botBounds.height+10+this.offsetY>=this.obstacleBounds[ob].y))
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
            if((this.xMove<=this.obstacleBounds[ob].x+this.obstacleBounds[ob].width+10+this.offsetX&&this.xMove>this.obstacleBounds[ob].x+(this.obstacleBounds[ob].width))&&(this.yMove<=this.obstacleBounds[ob].y+this.obstacleBounds[ob].height+10+this.offsetY&&this.yMove+this.botBounds.height+10+this.offsetY>=this.obstacleBounds[ob].y))
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
        else if(this.xRoute=="reverse")
        {
            this.xMove-=this.speed;
        }
        else if(this.xRoute=="forward")
        {
            this.xMove+=this.speed;
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
                this.xMove+=this.speed;
            }
            if(this.xRoute=="-")
            {
                this.xMove-=this.speed;
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
                this.yMove+=this.speed;
            }
            if(this.yRoute=="-")
            {
                this.yMove-=this.speed;
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