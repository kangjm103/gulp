# gulp

## 초기 작업
> 1. node.js 설치
> 2. npm init
> 3. 
>>   - npm install (package.json 을 참고하여 install 해줌)
>>   - 직접 의존성 추가 해줄 경우 (
>>     npm i D gulp gulp-uglify gulp-strip-debug gulp-babel babel-cli babel-loader babel-plugin-transform-async-to-generator babel-plugin-transform-object-assign babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-polyfill babel-preset-decorators-legacy babel-preset-es2015 babel-preset-es2017 babel-preset-es2017-node7 babel-preset-react babel-preset-stage-3 babel-register babel-core gulp-rimraf )

## 실행
> 1. gulp

## 특정 task 실행
> 1. gulp [task]
>>   1-1. task list
>>     - clear (dist 폴더 내용 제거)
>>     - copy (.js 파일을 제외한 파일들 move)
>>     - js-ugly (.js 파일들 ugly 작업) 
