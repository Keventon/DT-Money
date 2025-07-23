@echo off
echo 🔄 Limpando caches do React Native...

REM Apagar node_modules
rd /s /q node_modules

REM Apagar cache de compilação nativa
rd /s /q android\app\.cxx
rd /s /q android\.gradle
rd /s /q android\app\build
rd /s /q .gradle

REM Apagar locks do Gradle
del /q android\app\build.gradle.lockfile 2>nul
del /q android\app\build.gradle.kts.lock 2>nul

echo ✅ Limpeza concluída.
pause