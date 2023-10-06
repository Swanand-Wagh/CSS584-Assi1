# Get the current directory of the script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Change the current directory to the script's directory
Set-Location -Path $scriptPath

# Run npm install and npm run dev
Start-Process npm -ArgumentList "install", "&&", "npm", "run", "dev" -NoNewWindow -Wait