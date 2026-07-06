<?php
echo "Loaded extensions:\n";
print_r(get_loaded_extensions());
echo "PDO drivers:\n";
print_r(PDO::getAvailableDrivers());
