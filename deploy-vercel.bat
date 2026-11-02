@echo off
title Deploy JAGRUK to Vercel
echo ======================================================
echo Deploying JAGRUK to Vercel...
echo ======================================================
cd /d "%~dp0"
vercel
pause
