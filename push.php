<?php
	include 'database.php';
	$title=$_POST['title'];
	$id=$_POST['id'];
	$isVisibleInCatalog=$_POST['isVisibleInCatalog'];
	$sql = "INSERT INTO `games`( `title`, `id`, `isVisibleInCatalog`) 
	VALUES ('$title', '$id', '$isVisibleInCatalog')";
	if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>