<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Page Index</title>
    <style>
        body { font-family: Arial; padding: 40px; background-color: #f0f0f0; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 10px; }
        a { text-decoration: none; color: #0077cc; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>📄 Chefs!</h1>
    <ul>
        <?php
        $dir = __DIR__ . '/';
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file) {
                if ($file === '.' || $file === '..') continue;
                if (is_file($dir . $file)) {
                    $filename_safe = htmlspecialchars($file);
                    echo "<li><a href=\"$filename_safe\">$filename_safe</a></li>";
                }
            }
        } else {
            echo "<li>No files found.</li>";
        }
        ?>
    </ul>
</body>
</html>

