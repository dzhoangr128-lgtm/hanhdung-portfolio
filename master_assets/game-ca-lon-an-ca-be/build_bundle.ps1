$style = Get-Content 'style.css' -Raw -Encoding UTF8
$audio = Get-Content 'audio.js' -Raw -Encoding UTF8
$effects = Get-Content 'effects.js' -Raw -Encoding UTF8
$fish = Get-Content 'fish.js' -Raw -Encoding UTF8
$game = Get-Content 'game.js' -Raw -Encoding UTF8
$index = Get-Content 'index.html' -Raw -Encoding UTF8

if ($index -match '(?s)<body>(.*?)<!-- Audio Engine') {
    $bodyContent = $matches[1]
} else {
    Write-Host 'Body match failed'
    exit 1
}

$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine('<!DOCTYPE html>')
[void]$sb.AppendLine('<html lang="vi">')
[void]$sb.AppendLine('<head>')
[void]$sb.AppendLine('  <meta charset="UTF-8">')
[void]$sb.AppendLine('  <meta name="viewport" content="width=device-width, initial-scale=1.0">')
[void]$sb.AppendLine('  <title>Đại Dương Săn Mồi - Feeding Frenzy Tropical Reef</title>')
[void]$sb.AppendLine('  <link rel="preconnect" href="https://fonts.googleapis.com">')
[void]$sb.AppendLine('  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
[void]$sb.AppendLine('  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@700;800;900&display=swap" rel="stylesheet">')
[void]$sb.AppendLine('  <style>')
[void]$sb.AppendLine($style)
[void]$sb.AppendLine('  </style>')
[void]$sb.AppendLine('</head>')
[void]$sb.AppendLine('<body>')
[void]$sb.AppendLine($bodyContent)
[void]$sb.AppendLine('  <script>')
[void]$sb.AppendLine($audio)
[void]$sb.AppendLine('  </script>')
[void]$sb.AppendLine('  <script>')
[void]$sb.AppendLine($effects)
[void]$sb.AppendLine('  </script>')
[void]$sb.AppendLine('  <script>')
[void]$sb.AppendLine($fish)
[void]$sb.AppendLine('  </script>')
[void]$sb.AppendLine('  <script>')
[void]$sb.AppendLine($game)
[void]$sb.AppendLine('  </script>')
[void]$sb.AppendLine('</body>')
[void]$sb.AppendLine('</html>')

$bundle = $sb.ToString()

Set-Content -Path 'game_single_file.html' -Value $bundle -Encoding UTF8
Set-Content -Path 'C:\Users\AD\.gemini\antigravity\brain\83a9185c-1878-448d-9aea-1309ea3fe989\ocean_frenzy.html' -Value $bundle -Encoding UTF8

Write-Host "Bundled successfully! Size: $((Get-Item 'game_single_file.html').Length) bytes"
