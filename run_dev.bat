/*
 *start with weex:http://weex.help/topic/577a5b44eb60516a48db5499
 *window can't operate two dev,
 *so this bat doc is to fixed this problem.
 **/
@echo off 
h:
cd traing\weex\demo03
start cmd /c npm run dev
start cmd /c npm run dev_serve
pause
