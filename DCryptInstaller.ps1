& "D:\Program Files\7-Zip\7z.exe" x "D:\User\Downloads\Archvies\electron-v32.0.1-win32-x64.7z" -o"."
Move-Item -Force -Verbose electron-v32.0.1-win32-x64 DCryptInstaller
Move-Item -Force -Verbose DCryptInstaller\electron.exe DCryptInstaller\DCrypt.exe
Remove-Item -Force -Verbose DCryptInstaller\resources\default_app.asar
New-Item -Force -Verbose DCryptInstaller\resources\app -ItemType Directory
Copy-Item -Force -Recurse -Verbose electron,dist,package.json DCryptInstaller\resources\app
& 'D:\Program Files (x86)\Inno Setup 6\ISCC.exe' .\DCryptInstaller.iss
Remove-Item -Recurse -Force -Verbose DCryptInstaller
