# gulp

## 초기 작업
> 1. node.js 설치
> 2. npm install (package.json 을 참고하여 install 해줌)
> 3. src 폴더 생성
> 4. result 폴더 생성

>>   - 처음부터 직접 의존성 추가 해줄 경우
>>     npm init
>>     npm i gulp
>>     npm i -D gulp-uglify gulp-rimraf gulp-replace gulp-strip-debug gulp-babel babel-core babel-cli babel-loader babel-plugin-transform-async-to-generator babel-plugin-transform-object-assign babel-plugin-transform-decorators-legacy babel-preset-decorators-legacy babel-polyfill babel-preset-stage-3 babel-register

>>   - babel upgrade
>>     npm i -g babel-upgrade
>>     babel-upgrade -w    (package.json 에 write 까지)

## 실행
> - npm run gulp

## task list
> - clear (result 폴더 모든 내용 제거)
> - copyAllFilesExcludeJS (.js 파일을 제외한 파일들 move)
> - copyNotUglifyJS (uglify 할 필요 없는 js 들 move)
> - uglifyJS (.js 파일들 uglify) 
