$(function() {
	var canvas, context, originalImage, imagedata, imagedata2;
	window.canvasURL
	init();
	loadImage();
	uploadImg();

	function init() {
		canvas = $('#imgcanvas')[0];
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		context = canvas.getContext('2d');

	}

	function loadImage() {
		originalImage = new Image()
		originalImage.onload = function(e) {
			canvas.width = e.target.width;
			canvas.height = e.target.height;
			var rect = new Proton.Rectangle((canvas.width - e.target.width) / 2, (canvas.height - e.target.height) / 2, e.target.width, e.target.height);
			context.drawImage(e.target, rect.x, rect.y);
			imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
		}
		originalImage.src = 'data/spineboy.png';
	}

	function uploadImg() {
		$('#upload').bind('change', function(e) {
			var reader = new FileReader();
			var f = $(this).attr('files')[0];
			reader.onload = (function(theFile) {
				return function(e) {
					var image = new Image;
					image.onload = function() {
						shear(image)
					}
					image.src = e.target.result;
				};
			})(f);
			reader.readAsDataURL(f);
		});
	}

	function shear(image) {
		var scale1 = image.width / image.height;
		var scale2 = imagedata.width / imagedata.height;
		var scale3 = canvas.width / canvas.height;
		var oldw = image.width;
		var oldh = image.height;
		var cw = canvas.width;
		var cy = canvas.height;
		if (scale1 < scale2) {
			cw = image.width;
			cy = cw / scale3;
			image.width = imagedata.width;
			image.height = image.width / scale1;
		} else {
			cy = image.height;
			cw = cy * scale3;
			image.height = imagedata.height;
			image.width = image.height * scale1;
		}

		//////////////
		image.style.position = 'absolute';
		image.style.zIndex = 1110;
		image.style.left = '800px';
		document.body.appendChild(image);
		//////////////
		context.clearRect(0, 0, canvas.width, canvas.height);
		var sx = (oldw - cw) / 2;
		var sy = (oldh - cy) / 2;
		context.drawImage(image, sx, sy, oldw, oldh, 0, 0, image.width, image.height);
		imagedata2 = context.getImageData(0, 0, canvas.width, canvas.height);

		for (var y = 0; y < originalImage.height; y++) {
			for (var x = 0; x < originalImage.width; x++) {
				setPixel(x, y, getPixel(x, y));
			}
		}

		context.putImageData(imagedata2, 0, 0);
		window.canvasURL = canvas.toDataURL();
		window.createBoy();
	}

	function setPixel(x, y, alpha) {
		var pos = (x + y * originalImage.width) * 4;
		imagedata2.data[pos + 3] = alpha;
	};

	function getPixel(x, y) {
		var pos = (x + y * originalImage.width) * 4;
		return imagedata.data[pos + 3];
	};

});
