<?php
header('Content-Type: text/plain');

$node = shell_exec('node -v 2>&1');
$npm = shell_exec('npm -v 2>&1');
$which_node = shell_exec('which node 2>&1');
$pwd = shell_exec('pwd 2>&1');
$whoami = shell_exec('whoami 2>&1');

echo "Node Version: " . ($node ? trim($node) : "Not found") . "\n";
echo "NPM Version: " . ($npm ? trim($npm) : "Not found") . "\n";
echo "Which Node: " . ($which_node ? trim($which_node) : "Not found") . "\n";
echo "PWD: " . trim($pwd) . "\n";
echo "User: " . trim($whoami) . "\n";
?>
