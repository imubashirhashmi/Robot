class Obstacle
{
    constructor(parent, elementName="", shapeType="", width, height, leftPos="", topPos="", backgroundColor="")
    {
        this.OffsetX=0;
        this.OffsetY=0;
        this.delibrateMove=false;
        this.parent=parent;
        this.obj = this.CreateDiv(parent, elementName, shapeType, width, height, leftPos, topPos, backgroundColor);
    }

    CreateDiv(parentElement, elementName="", shapeType="", width, height, leftPos="", topPos="", backgroundColor="")
    {
        let c = document.createElement(elementName);
        c.style.position = "absolute";
        c._parentElement = parentElement;
        c.style.cursor ="move";
        c.style.left = leftPos;
        c.style.top = topPos;
        c.style.background = backgroundColor;
        if(shapeType.toLocaleLowerCase()=="circle"){
            c.style.borderRadius = "50%";
            c.style.width = `${width}px`;
            c.style.height = `${height}px`;
        }
        else if(shapeType.toLocaleLowerCase()=="hrectangle"){
            c.style.height = `${height+(height/2)}px`;
            c.style.width = `${width}px`;
        }
        else if(shapeType.toLocaleLowerCase()=="vrectangle"){
            c.style.width = `${width+(width/2)}px`;
            c.style.height = `${height}px`;
        }
        else
        {
            c.style.width = `${width}px`;
            c.style.height = `${height}px`;
        }
        return parentElement.appendChild(c);
    }

    delibrateMoves()
    {
        this.obj.onmousedown = function() {this.delibrateMove=true;this.OffsetX=0;this.OffsetY=0;};
        this.obj.onmouseup = function() {this.delibrateMove=false;this.OffsetX=0;this.OffsetY=0;};
        this.obj.onmousemove = function(event) {
            if(this.delibrateMove)
            {
                if(this.OffsetX==0)
                {
                    this.OffsetX=event.screenX-this.getBoundingClientRect().x;
                }
                if(this.OffsetY==0)
                {
                    this.OffsetY=event.screenY-70-this.getBoundingClientRect().y;
                }
                this.style.left=`${event.screenX-(this.OffsetX)}px`;
                this.style.top=`${(event.screenY-70)-(this.OffsetY)}px`;
            };
        
        }
        this.obj.oncontextmenu = function() {mainDiv.removeChild(this);};
    }
}



   