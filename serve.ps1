$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:4173/")
$listener.Start()
Write-Host "Nexora server listening at http://localhost:4173/"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $reqPath = $context.Request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($reqPath)) { $reqPath = "index.html" }
    $filePath = Join-Path $root $reqPath
    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime = switch ($ext) {
        ".html" { "text/html; charset=utf-8" }
        ".js"   { "application/javascript; charset=utf-8" }
        ".css"  { "text/css; charset=utf-8" }
        default { "application/octet-stream" }
      }
      $context.Response.ContentType = $mime
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
    }
    $context.Response.Close()
  }
} finally {
  $listener.Stop()
}
