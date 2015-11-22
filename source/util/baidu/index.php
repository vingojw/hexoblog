<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>百度是个好图床</title>
	<style>
		#imgUrl{
		  width: 560px;
		  padding: 5px;
		  margin: 20px 0;
		}
		input[type='file']{
			width: 200px;
			height: 200px;
			opacity: 0;
		}
		.tips{
			width:200px;
			line-height: 200px;
			text-align: center;
			border:1px solid red;
			position: absolute;
		}
		form{
			positon:relative;
		}
	</style>
</head>
<body>
<div class="wrap">
	<form action="index.php" method="post" onsubmit="return chk()"
	enctype="multipart/form-data">
		 <div class="tips">点击上传图片</div>
		 <input type="file" name="file" id="file" onchange="this.form.submit.click()"/>
		 <input type="hidden" name="hid" id="hid">
		 <input type="submit" name="submit" value="Submit" style="display:none"/>
	</form>
</div>
<script>

var file = document.getElementById("file");
var hid = document.getElementById("hid");

function chk(){
	var fileo =file.files[0];
	var reader = new FileReader();
	reader.onload = function(e){
		hid.value = e.target.result;
	}
	reader.readAsDataURL(fileo);
}

</script>

<?php


if (!function_exists('curl_file_create')) {
    function curl_file_create($filename, $mimetype = '', $postname = '') {
        return "@$filename;filename="
            . basename($filename)
            . ";type=$mimetype";
    }
}

function UploadToBaiDu($filedata,$filetype,$filename){

	//把保存的文件放到upload目录,因为上传还是要认文件名的
	$serverPath = "upload/" . $_FILES["file"]["name"];
	move_uploaded_file($filedata,$serverPath);

	//定义一下上传的路径
	define('BASE_PATH',str_replace('\\','/',realpath(dirname(__FILE__).'/'))."/");
	//文件的全路径
	$serverFullPath = BASE_PATH.$serverPath;

	$data = array(
		'compresstime'=>'',
		'filetype'=>'',
		'newfilesize'=>'',
		'Filename'=>$filename,
		'filewidth'=>'',
		'filesize'=>'',
		'fileheight'=>'',
		'Upload'=>'Submit Query',
		'filedata'=>curl_file_create($serverFullPath,$filetype,$filename)
	);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'http://image.baidu.com/pictureup/uploadshitu?fr=flash&fm=index&pos=upload');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
		'Referer: http://img.baidu.com/img/image/stu/STUpload2.swf?v=0108',
		'X-Forwarded-For: 8.8.8.8',
		'Forwarded-For: 8.8.8.8',
		'Origin: http://img.baidu.com',
		'X-Requested-With: ShockwaveFlash/15.0.0.239'
	));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$html = curl_exec($ch);
	curl_close($ch);

	preg_match('/queryImageUrl=(.+?)&/', $html, $ret);

	//var_dump($ret);

	if(count($ret) === 2){
		unlink($serverFullPath);
		return urldecode($ret[1]);
	}

	return FALSE;
}

if(!empty($_FILES['file'])){
	//var_dump($_FILES['file']);
	$filename = $_FILES['file']['name'];
	$filetype = $_FILES['file']['type'];
    $filedata =$_FILES['file']['tmp_name'];

    $baiduUrl = UploadToBaiDu($filedata,$filetype,$filename);

	echo "<input id='imgUrl' onmouseover='this.select();' onclick='this.select();' value='$baiduUrl'/><script>document.getElementById('imgUrl').select();</script>";
}

?>


</body>
</html>
