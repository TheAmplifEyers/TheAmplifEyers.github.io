


(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

//  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
//    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
    //filterbutton = document.getElementById('filterbutton');///

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    ///---
/*    filterbutton.addEventListener('click', function(ev){
      filterpicture();
      ev.preventDefault();
    }, false);*/
    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.
   var data;

  function clearphoto() {
    var context = canvas.getContext('2d');
//    context.fillStyle = "#AAA";
    context.fillStyle = "img/images.jpg";
    context.fillRect(0, 0, canvas.width, canvas.height);

    data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

////Filter function
   function filter(context){
   		console.log("this in function filter");
   		
   		
   		
   		
   		
   		Caman.Filter.register("posterize", function (adjust) {
   			console.log("posterize");
 			 // Pre-calculate some values that will be used
  			var numOfAreas = 256 / adjust;
  			var numOfValues = 255 / (adjust - 1);

  // Our process function that will be called for each pixel.
  // Note that we pass the name of the filter as the first argument.
  			this.process("posterize", function (rgba) {
    		rgba.r = Math.floor(Math.floor(rgba.r / numOfAreas) * numOfValues);
    		rgba.g = Math.floor(Math.floor(rgba.g / numOfAreas) * numOfValues);
    		rgba.b = Math.floor(Math.floor(rgba.b / numOfAreas) * numOfValues);

    // Return the modified RGB values
    		return rgba;
  });
});


   		
   		
   		/*Caman.Filter.register("#photo", function (adjust) {
   		console.log("this is in caman filter register ");
  		this.process("#photo", function () {
  			console.log("this is in filter");
  		});
  		})*/
  	}
  			
/*  			for (var i = 0; i < ; i++){
  			
  			
    	this.locationXY(); // e.g. {x: 0, y: 0}



    // Gets the RGBA object for the pixel at the given absolute
    // coordinates. This is relative to the top left corner.
    this.getPixel(20, 50);

    // Sets the color for the pixel at the given absolute coordinates.
    // Also relative to the top left corner.
    this.putPixel(20, 50, {
      r: 100,
      g: 120,
      b: 140,
      a: 255
    });
  });
});*/





  var image;

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      
      data = canvas.toDataURL('image/png');
      
      /*      Caman("#my-image", function () {
  		this.opacity(50);
  		
  		this.render(function () {
    	image = this.toBase64();
    	//saveToServer(image); // your ajax function
  		});
	  });*/

	  
      photo.setAttribute('src', data);
      filter(context);
    
    } else {
      clearphoto();
    }
  }

 /*    Caman("#photo", function() {
    	this.channels({
    		red: 10;
    		green: -5;
    		blue: 200;
    	}).render();
      });
      */




  
  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();


//Caman("#DogImg", function () {

/*Caman.Filter.register("#DogImg", function (adjust) {
	console.log("filter register")
  this.process("#DogImg", function () {
  	console.log("Register location")
    this.locationXY(); // e.g. {x: 0, y: 0}

    // Gets the RGBA object for the pixel that is 2 rows down
    // and 3 columns to the right.
    console.log("Get pixel")
    this.getPixelRelative(-2, 3);

    // Sets the color for the pixel that is 2 rows down and
    // 3 columns to the right.
    console.log("Put Pixel")
    this.putPixelRelative(-2, 3, {
      r: 255,
      g: 0,
      b: 0,
      a: 255
    });

    // Gets the RGBA object for the pixel at the given absolute
    // coordinates. This is relative to the top left corner.
    this.getPixel(20, 50);
    console.log("Second put pixel")
     this.putPixel(20, 50, {
      r: 0,
      g: 0,
      b: 255,
      a: 255
    });
  });
});*/
	
/*Caman.Filter.register();
	
	console.log("in the function")
	this.locationXY();
	this.getPixel(500,500);
	console.log("got the pixel!")
	this.channels({
		red: 10,
		green: -5,
		blue: 200
		}).render();*/

Caman("#DogImg", function () {
	console.log("in the function")
	this.channels({
		red: 10,
		green: -5,
		blue: 200
		}).render();

	/*this.process("#DogImg",function() {
		//for(var i=0, i < 1000, i++){
			this.locationXY();
			this.getPixel(500,500);
			console.log("got the pixel!")
			this.putPixel(500,550,{
				r: 255,
				g: 0,
				b: 0,
				a: 255
		
			});
		
		//};

	
	});*/
	
/*	this.resize({
    	width: 200,
    	height: 120
  	});
  	this.render();*/
})
