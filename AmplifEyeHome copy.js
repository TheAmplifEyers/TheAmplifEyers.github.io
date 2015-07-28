


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

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

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

   	photo = document.getElementById('photo');
   	video = document.getElementById('video');
   	console.log("getelementbyid")
   	

  var image;
  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      data = canvas.toDataURL('image/png');

      photo.setAttribute('src', data);
      filter(context);  
    } else {
      clearphoto();
    }
  }


  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();


///filter code

$(document).ready(function(){
document.getElementById("photo").onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("photo");
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);

  var CVDMatrix = { // Color Vision Deficiency
    "Protanope": [ // reds are greatly reduced 
        0.0, 2.02344, -2.52581,
        0.0, 1.0,      0.0,
        0.0, 0.0,      1.0
    ],
    "Deuteranope": [ // greens are greatly reduced 
        1.0,      0.0, 0.0,
        0.494207, 0.0, 1.24827,
        0.0,      0.0, 1.0
    ],
    "Tritanope": [ // blues are greatly reduced 
        1.0,       0.0,      0.0,
        0.0,       1.0,      0.0,
        -0.395913, 0.801109, 0.0
    ]
};

    var cvd = CVDMatrix["Deuteranope"],
        cvd_a = cvd[0],
        cvd_b = cvd[1],
        cvd_c = cvd[2],
        cvd_d = cvd[3],
        cvd_e = cvd[4],
        cvd_f = cvd[5],
        cvd_g = cvd[6],
        cvd_h = cvd[7],
        cvd_i = cvd[8];
    var L, M, S, l, m, s, R, G, B, RR, GG, BB;
    for(var i = 0, length = imgData.data.length; i < length; i += 4) {
        var r = imgData.data[i],
            g = imgData.data[i + 1],
            b = imgData.data[i + 2];
        // RGB to LMS matrix conversion
        L = (17.8824 * r) + (43.5161 * g) + (4.11935 * b);
        M = (3.45565 * r) + (27.1554 * g) + (3.86714 * b);
        S = (0.0299566 * r) + (0.184309 * g) + (1.46709 * b);
        // Simulate color blindness
        l = (cvd_a * L) + (cvd_b * M) + (cvd_c * S);
        m = (cvd_d * L) + (cvd_e * M) + (cvd_f * S);
        s = (cvd_g * L) + (cvd_h * M) + (cvd_i * S);
        // LMS to RGB matrix conversion
        R = (0.0809444479 * l) + (-0.130504409 * m) + (0.116721066 * s);
        G = (-0.0102485335 * l) + (0.0540193266 * m) + (-0.113614708 * s);
        B = (-0.000365296938 * l) + (-0.00412161469 * m) + (0.693511405 * s);
        // Isolate invisible colors to color vision deficiency (calculate error matrix)
        R = r - R;
        G = g - G;
        B = b - B;
        // Shift colors towards visible spectrum (apply error modifications)
        RR = (0.0 * R) + (0.0 * G) + (0.0 * B);
        GG = (0.7 * R) + (1.0 * G) + (0.0 * B);
        BB = (0.7 * R) + (0.0 * G) + (1.0 * B);
        // Record color
        imgData.data[i] = r+RR;
        imgData.data[i + 1] = g+GG;
        imgData.data[i + 2] = b+BB;
    }
    ctx.putImageData(imgData, 0, 0);
};
});






