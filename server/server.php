<?php
header('Content-Type: application/json');
require_once "config.php";

$actions = array("save", "get");

if(isset($_POST["action"]) && in_array($_POST["action"], $actions)){


	switch($_POST["action"])
	{
		case "save":
			$playerName = mysql_real_escape_string($_POST["playerName"]);
			$playerScore =  mysql_real_escape_string($_POST["playerScore"]);
			$playerAvatar =  mysql_real_escape_string($_POST["playerAvatar"]);
			$playerLevel =  mysql_real_escape_string($_POST["playerLevel"]);
			if(
				$playerName &&
				$playerScore &&
				$playerAvatar &&
				$playerLevel
			) {
				
				$q = mysql_query("select * from players where playerName = '{$playerName}'");
				$count = mysql_num_rows($q);
				if($count == 1){
					mysql_query("update players set 
						playerAvatar = '{$playerAvatar}',
						playerScore = '{$playerScore}',
						playerLevel = '{$playerLevel}' 
						where playerName = '{$playerName}'
					")or die(mysql_error());
					echo json_encode(array(
						"success"=>true
					));
				} else {
					mysql_query("INSERT INTO players (playerName, playerScore, playerAvatar, playerLevel, date) values ('{$playerName}','{$playerScore}','{$playerAvatar}','{$playerLevel}', NOW())") or die(mysql_error);
					echo json_encode(array(
						"success"=>true
					));
				}				
			}	
				
		break;
		case "get":
			$players = array();			
			$q = mysql_query("select * from players order by playerScore desc, playerLevel desc limit 0,10") or die(mysql_error());			
			while($row = mysql_fetch_assoc($q)){
				$players[] = $row;
			}			
			echo json_encode(array(
				"players"=>$players
			));
		break;
	}
	
	
	

	
}

?>