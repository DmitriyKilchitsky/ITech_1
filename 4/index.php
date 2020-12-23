<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Laba4</title>
	<link rel="stylesheet" type="text/css" href="./assets/style.css">
</head>
<body>
	<?php
	$filename = "./data/list.txt";
	$file = fopen($filename, "r");
	$data = fread($file, filesize($filename));

	$products = explode(";", $data);
	?>
	<table>
		<tbody>
			<tr>
				<th>Product</th>
				<th>Price</th>
				<th>Quantity</th>
			</tr>
			<?php
			foreach ($products as $key) {
			$product = explode(" - ", $key);
			echo "<tr><td>".$product["0"]."</td><td>".$product["1"]."</td><td>".$product["2"]."</td></tr>";
			} ?>
		</tbody>
	</table>
</body>
</html>