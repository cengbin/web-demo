<?php
    $filetime = time();
    $filename = date("YmdHis",$filetime).rand(100,999).'.png';

    $skinData = $_POST['skinData'];
    $sourceData = $_POST['sourceData'];
    $name = $_POST['name'];
    $content = $_POST['content'];

    $skinbase64Data=base64_decode($skinData);
    $sourcebase64Data=base64_decode($sourceData);

    $file1 = fopen("image/skin".$filename,"w");
    fwrite($file1,$skinbase64Data);
    fclose($file1);

    $file2 = fopen("image/source".$filename,"w");
    fwrite($file2,$skinbase64Data);
    fclose($file2);


    echo "image/skin".$filename;
?>