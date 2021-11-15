<?php
	include 'database.php';
	$ID=$_POST['id'];
	$sql="SELECT * FROM games WHERE title LIKE '%".$ID."%' AND isVisibleInCatalog = 'true'";
    $result = $conn->query($sql);
    $sth = mysqli_query($conn, $sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
	mysqli_close($conn);
?>