[Setup]
AppName=DCrypt
AppVersion=2.0.1
DefaultDirName={autopf}\DCrypt
DefaultGroupName=DCrypt
OutputDir=.
OutputBaseFilename=DCryptInstaller

[Files]
Source: "DCryptInstaller\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\DCrypt"; Filename: "{app}\DCrypt.exe"

