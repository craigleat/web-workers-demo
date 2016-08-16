importScripts('imageManips.js');

this.onmessage = function(e) {
  //console.log(e.data);
  var imageData = e.data.imageData;
  var type = e.data.type;
  var r, g, b, a;
  //console.log('Img data received:', imageData);
  try {
    length = imageData.data.length / 4;
    // choose appropriate function based on type of manipulation required
    // manipulate() creates several functions every time it's called and this is inefficient in a loop
    var myPixelMachine = manipulate(type);
    //for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    for (var i = 0; i < length; i++) {
      r = imageData.data[i * 4 + 0];
      g = imageData.data[i * 4 + 1];
      b = imageData.data[i * 4 + 2];
      a = imageData.data[i * 4 + 3];
      pixel = myPixelMachine(r, g, b, a);
      imageData.data[i * 4 + 0] = pixel[0];
      imageData.data[i * 4 + 1] = pixel[1];
      imageData.data[i * 4 + 2] = pixel[2];
      imageData.data[i * 4 + 3] = pixel[3];
    }
    postMessage(imageData);
  } catch (e) {
    function ManipulationException(message) {
      this.name = "ManipulationException";
      this.message = message;
    };
    throw new ManipulationException('Image manipulation error');
    postMessage(undefined);
  }
}
