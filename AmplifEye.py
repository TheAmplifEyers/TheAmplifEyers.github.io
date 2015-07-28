
from Graphics import *

myfile = pickAFile()
pic = makePicture(myfile)
show(pic)
#centerPoint = Point(200,300)
#text = Text(centerPoint,"Hello")


#Obama_DarkBlue = makeColor(0,51,76)
#Obama_Red = makeColor(217,26,33)
#Obama_Blue = makeColor(112,150,158)
#Obama_Yellow = makeCOlor(252,227,166)


for i in getPixels(pic):
    greyValue = (getRed(i) + getGreen(i) + getBlue(i))/3
    if greyValue > 180: 
        setColor(i,makeColor(252,227,166))
    elif greyValue > 120:
        setColor(i,makeColor(112,150,158))
    elif greyValue > 60:
        setColor(i,makeColor(176,48,96))
    else:
        setColor(i,makeColor(0,51,76))
    #text.draw(pic)
    
    
    
    
    
    
    
    
    
    
    
imgData.data[i+1] + imgData.data[i+2])/3
    		var redValue = (imgData.data[i]*2 + imgData.data[i+1]*1)/2
    		var greenValue = (imgData.data[i+1] + imgData.data[i+2])/2
    		
    	
    	//tint image
    		//r = r + (1.5 * (255-r));
    		//g = g + (1.5 * (255-g));
    		//b = b + (1.5 * (255-b));
    		
    		if (imgData.data[i]<255){
        		imgData.data[i] = redValue;
        	}
        	if (imgData.data[i+1]<255){
        		imgData.data[i+1] = greyValue;
        	}
        	if (imgData.data[i+2]<255){
        		imgData.data[i+2] = greenValue;
        	}
        	imgData.data[i+3] = 255;
    };
    		
    	   	
    	//grey scale
    		/*if (50<imgData.data[i]<255 && 20<imgData.data[i+1]<255 && 20<imgData.data[i+2]<225){
    			imgData.data[i] = redValue;
    			imgData.data[i+1] = greyValue;
    			imgData.data[i+2] = greenValue;
    		}*/
   		
    		/*else if (imgData.data[i]=255 && imgData.data[i+1]=255 && imgData.data[i+2]=225){
    			imgData.data[i] = imgData.data[i];
    			imgData.data[i+1] = imgData.data[i+1];
    			imgData.data[i+2] = imgData.data[i+2];
    		}*/




    	// invert colors	
/*        	imgData.data[i] = 255 - imgData.data[i];
        	imgData.data[i+1] = 220 - imgData.data[i+1];
        	imgData.data[i+2] = 75 - imgData.data[i+2];
        	imgData.data[i+3] = 200;*/
    	//}
    	ctx.putImageData(imgData, 0, 0);
	};
	//USE DICTIONARY AND ASSIGN NORMAL VISION COLOR KEYS TO DEUTERANALOMY VISION SPECTRUM KEYS
	</script>
		
		
	</body>
</html>