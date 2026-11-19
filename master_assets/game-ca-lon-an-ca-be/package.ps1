$filesToZip = @(
    'index.html',
    'game_single_file.html',
    'CHOI_NGAY.bat',
    'style.css',
    'audio.js',
    'effects.js',
    'fish.js',
    'game.js',
    'HUONG_DAN_THAY_GIAO.txt',
    'README.md'
)

$zipName = 'BaiTap_CaLonAnCaBe_OceanFrenzy.zip'

if (Test-Path $zipName) {
    Remove-Item $zipName -Force
}

Compress-Archive -Path $filesToZip -DestinationPath $zipName -Force

$item = Get-Item $zipName
Write-Host "PACKAGE_SUCCESS: $($item.Name) ($([math]::Round($item.Length / 1KB, 1)) KB)"
