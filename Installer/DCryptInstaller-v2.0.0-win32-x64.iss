[Setup]
AppName=DCrypt
AppVersion=2.0.0
DefaultDirName={pf}\DCrypt
DefaultGroupName=DCrypt
OutputDir=.

[Files]
Source: "D:\User\Desktop\DCryptInstaller\DCrypt-v2.0.0-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\DCrypt"; Filename: "{app}\DCrypt.exe"

