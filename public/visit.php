<?php
/**
 * Records one server-side page-load hit (one line with timestamp per request).
 * Data directory is NEXT TO the site root (e.g. public_html) so deploy scripts
 * that wipe the web root do not delete statistics.
 *
 * One-time on server: create the directory and make it writable by PHP, e.g.
 *   mkdir ~/domains/yourdomain.tld/felingo_visitor_stats
 *   chmod 750 ~/domains/yourdomain.tld/felingo_visitor_stats
 */
declare(strict_types=1);

header('Cache-Control: no-store, no-cache, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit;
}

$dataDir = dirname(__DIR__) . '/felingo_visitor_stats';
if (!is_dir($dataDir)) {
    if (!@mkdir($dataDir, 0750, true) && !is_dir($dataDir)) {
        http_response_code(500);
        exit;
    }
}

$day = date('Y-m-d');
$file = $dataDir . '/' . $day . '.log';
$line = date('c') . "\n";

$fp = fopen($file, 'ab');
if ($fp === false) {
    http_response_code(500);
    exit;
}

if (!flock($fp, LOCK_EX)) {
    fclose($fp);
    http_response_code(500);
    exit;
}

if (fwrite($fp, $line) === false) {
    flock($fp, LOCK_UN);
    fclose($fp);
    http_response_code(500);
    exit;
}

fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

http_response_code(204);
