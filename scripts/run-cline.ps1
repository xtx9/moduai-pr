# 파일명: scripts/run-cline.ps1
# 생성일시: 2026-11-06
# 작성자: localManager 개발팀
# 목적: cline CLI(clite)를 프로젝트 로컬(.cline) 전용 데이터·캐시·상태·설정으로 격리 실행한다.
#       @cline/cli 패키지의 실행 파일명은 clite 이므로 .cline/node_modules/.bin/clite.cmd 를 사용한다.
#       Cline은 XDG_* 환경변수와 CLINE_* 환경변수를 모두 인식하며,
#       프로젝트 루트 .env 의 CLINE_API_KEY 를 Process 범위로 주입한다. (R-00109, T-008 참조)

[CmdletBinding()]
param(
    [switch]$Check,
    [switch]$AuthLogin,
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Arguments
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$clineRoot = Join-Path $projectRoot '.cline'

# Cline은 XDG_* 환경변수와 CLINE_* 환경변수를 모두 지원한다
# XDG 기준 디렉터리 설정 (OpenCode와 동일 패턴)
$env:CLINE_CONFIG_DIR = $clineRoot
$env:XDG_CONFIG_HOME = $clineRoot
$env:XDG_DATA_HOME = Join-Path $clineRoot 'data'
$env:XDG_CACHE_HOME = Join-Path $clineRoot 'cache'
$env:XDG_STATE_HOME = Join-Path $clineRoot 'state'

# Cline 전용 환경변수 (우고 수돌)
$env:CLINE_DATA_DIR = Join-Path $clineRoot 'data'
$env:CLINE_CACHE_DIR = Join-Path $clineRoot 'cache'
$env:CLINE_STATE_DIR = Join-Path $clineRoot 'state'

# 필요 디렉터리 생성
foreach ($directory in @($env:XDG_DATA_HOME, $env:XDG_CACHE_HOME, $env:XDG_STATE_HOME, $env:CLINE_CONFIG_DIR)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
}

# ── .env 로딩 (T-008 방식 A) ────────────────────────────────────────────────
# 프로젝트 루트 .env 를 읽어 KEY=VALUE 형태를 Process 범위 환경변수로 주입한다.
# 키는 파일에만 보관하고 소스 하드코딩을 금지한다. 값은 로그에 출력하지 않는다.
$envFile = Join-Path $projectRoot '.env'
if (Test-Path -LiteralPath $envFile) {
    Get-Content -LiteralPath $envFile | ForEach-Object {
        if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$') {
            [Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], 'Process')
        }
    }
}

$localCommand = Join-Path $clineRoot 'node_modules\.bin\clite.cmd'

if ($Check) {
    [pscustomobject]@{
        ProjectRoot = $projectRoot
        ConfigDirectory = $env:CLINE_CONFIG_DIR
        XDGConfigHome = $env:XDG_CONFIG_HOME
        DataDirectory = $env:XDG_DATA_HOME
        CacheDirectory = $env:XDG_CACHE_HOME
        StateDirectory = $env:XDG_STATE_HOME
        CLINEDataDirectory = $env:CLINE_DATA_DIR
        CLINECacheDirectory = $env:CLINE_CACHE_DIR
        CLINEStateDirectory = $env:CLINE_STATE_DIR
        LocalCommand = $localCommand
        LocalCommandExists = Test-Path $localCommand
        EnvFileExists = Test-Path -LiteralPath $envFile
        ClineKeyLoaded = [bool]$env:CLINE_API_KEY
    } | Format-List
    exit 0
}

if (-not (Test-Path $localCommand)) {
    Write-Error "프로젝트 로컬 Cline이 없습니다: $localCommand`n'.cline'에서 npm install을 먼저 실행하세요. 전역 실행 파일은 사용하지 않습니다."
    exit 1
}

$commandArguments = @()
if ($AuthLogin) {
    $commandArguments += 'auth'
    $commandArguments += 'login'
}
$commandArguments += $Arguments

Push-Location $projectRoot
try {
    & $localCommand @commandArguments
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}