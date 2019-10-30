<?php
    // $filetime = time();
    // $filename = "php".date("YmdHis",$filetime).rand(100,999).'.png';
    $filename = "ty.png";

    $str = $_POST['name'];

	$im = imagecreate(600,600);
	$white = imagecolorallocate($im,0xFF,0xFF,0xFF);
	imagecolortransparent($im,$white);  //imagecolortransparent() 设置具体某种颜色为透明色，若注释
	$black = imagecolorallocate($im,0x66,0x66,0x66);
	 
	imagettftext($im,16,0,0,20,$black,"Hanzipen.ttc",$str); //字体设置部分linux和windows的路径可能不同
	header("Content-type:image/png");
	imagepng($im);//文字生成的图片



    $image_1 = imagecreatefrompng("bg.png");
    $image_2 = $im;
    $image_3 = imageCreatetruecolor(imagesx($image_1),imagesy($image_1));

    imagecopyresampled($image_3,$image_1,0,0,0,0,imagesx($image_1),imagesy($image_1),imagesx($image_1),imagesy($image_1));

   //再将装备图片copy到已经具有人物图像的真彩色画布中，同样也不会失真
    imagecopymerge($image_3,$image_2, 270,270,0,0,imagesx($image_2),imagesy($image_2), 100);
    imagepng($image_3, $filename);

?>