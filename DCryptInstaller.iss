#define AppVersion GetEnv('APP_VERSION')

[Setup]
AppName=DCrypt
AppVersion={#AppVersion}
DefaultDirName={autopf}\DCrypt
DefaultGroupName=DCrypt
OutputDir=.
OutputBaseFilename=DCryptInstaller

[Files]
Source: "build\DCrypt-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\DCrypt"; Filename: "{app}\DCrypt.exe"

