<?php
    $filetime = time();
    $filename = date("YmdHis",$filetime).rand(100,999).'.png';

    $sourceData = $_POST['sourceData'];
    $sourcebase64Data=base64_decode($sourceData);

    $file1 = fopen("image/ty".$filename,"w");
    fwrite($file1,$sourcebase64Data);
    fclose($file1);


    echo "image/ty".$filename;
?>