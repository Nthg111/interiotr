$files = Get-ChildItem -Path ".\public\dheeraj-images" -File | Where-Object { $_.Extension -match 'jpg|jpeg|png|webp' }
$arr = @()
foreach ($f in $files) {
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $obj = [PSCustomObject]@{
      name = $f.Name
      width = $img.Width
      height = $img.Height
      ratio = [math]::Round($img.Width / $img.Height, 3)
    }
    $arr += $obj
    $img.Dispose()
  } catch {
    $arr += [PSCustomObject]@{ name = $f.Name; width = 0; height = 0; ratio = 0 }
  }
}
$arr | ConvertTo-Json -Depth 5
