<?php
session_start();

$PASSWORD = "admin123";

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: manage_homepage.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === $PASSWORD) {
        $_SESSION['logged_in'] = true;
    } else {
        $error = "Incorrect password.";
    }
}

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Login - Homepage Manager</title>
        <style>
            body { font-family: Arial, sans-serif; background: #fafaf7; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .login-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; }
            input[type="password"] { padding: 10px; width: 80%; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px; }
            button { padding: 10px 20px; background: #2c3e50; color: white; border: none; border-radius: 5px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="login-box">
            <h2>Homepage Manager Login</h2>
            <?php if(isset($error)) echo "<p style='color:red'>$error</p>"; ?>
            <form method="POST">
                <input type="password" name="password" placeholder="Enter Password" required autofocus>
                <br>
                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

$message = "";
$categories = [
    1 => "Kalyani Cotton",
    2 => "Khadi Embroidery",
    3 => "Mul Cotton",
    4 => "Gini Tissue",
    5 => "Soft Silk",
    6 => "Borderless Silk",
    7 => "Plain Silk",
    8 => "Champion Silk",
    9 => "Ds Kottanchi"
];

$targetDir = __DIR__ . "/uploads/categories/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $catId = (int)$_POST['category_id'];
    $file = $_FILES['image'];
    
    if ($file['error'] === UPLOAD_ERR_OK && $catId >= 1 && $catId <= 9) {
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
            $targetPath = $targetDir . $catId . ".jpg";
            
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                $message = "<div class='success'>Successfully updated image for " . $categories[$catId] . "</div>";
            } else {
                $message = "<div class='error'>Failed to save the uploaded image.</div>";
            }
        } else {
            $message = "<div class='error'>Invalid file type. Only JPG, PNG, and WEBP allowed.</div>";
        }
    } else {
        $message = "<div class='error'>Error uploading file.</div>";
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Homepage Image Manager</title>
    <style>
        body { font-family: Arial, sans-serif; background: #fafaf7; padding: 40px; color: #333; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        h1 { margin-top: 0; color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        .success { background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
        .card { border: 1px solid #eee; padding: 15px; border-radius: 8px; text-align: center; background: #fdfdfd; }
        .card img { width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-bottom: 10px; background: #eee; }
        .card h3 { font-size: 16px; margin: 10px 0; }
        input[type="file"] { margin: 10px 0; max-width: 100%; font-size: 12px; }
        button { background: #2c3e50; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; width: 100%; }
        button:hover { background: #34495e; }
        .logout { float: right; color: #e74c3c; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <a href="?logout=1" class="logout">Logout</a>
        <h1>Homepage Image Manager</h1>
        <p>Upload new images here to instantly change the pictures in the "What are you looking for?" section on the home page.</p>
        
        <?php echo $message; ?>

        <div class="grid">
            <?php foreach ($categories as $id => $name): ?>
                <div class="card">
                    <!-- Added a timestamp query param to force browser to load new image if changed -->
                    <img src="/uploads/categories/<?php echo $id; ?>.jpg?v=<?php echo time(); ?>" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'" alt="<?php echo $name; ?>">
                    <h3><?php echo $name; ?></h3>
                    <form method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="category_id" value="<?php echo $id; ?>">
                        <input type="file" name="image" accept="image/*" required>
                        <button type="submit">Upload & Replace</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
