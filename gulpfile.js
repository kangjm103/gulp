/**
 * Created by Kang on 2018-04-23.
 */

const {series, parallel, src, dest, lastRun, task} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const clean = require('gulp-rimraf');
const replace = require('gulp-replace');
const stripDebug = require('gulp-strip-debug');   // 모든 console.log 들과 alert 들을 제거해주는 gulp 모듈 패키지
const folderName = process.title.split(' ')[1];
let taskName;
let root;

if (folderName) {
  taskName = folderName;
  root = `src/${folderName}`;
} else {
  taskName = 'default';
  root = 'src';
}

// 기존 dist 폴더 clear
function clear() {
  return src('result/*', {
    read: false,
  }).pipe(clean());
}

// copy all files
function copyAllFilesExcludeJS() {
  return src(
    [
      `${root}/**/**/*.*`,
      `!${root}/**/**/*.{js,yml}`,
      `!${root}/**/**/.{git,idea}/**/**/*.*`,
      `!${root}/**/**/.gitignore`,
    ],
    {
      since: lastRun(copyAllFilesExcludeJS),
    },
  ).pipe(dest('result'));
}

function copyNotUglifyJS() {
  return src(
    [
      `${root}/**/**/extjs/**/**/*.js`,
      `${root}/**/**/lib/**/**/*.js`,
      `${root}/**/**/liteplus/**/**/*.js`,
    ],
    {
      since: lastRun(copyNotUglifyJS),
    },
  ).pipe(dest('result'));
}

// combine:js 테스크를 정의
function uglifyJS() {
  // src 하위 디렉터리 내의 모든 자바스크립트 파일을 가져온다.
  // !는 바로 앞의 와일드카드 형태에서 이 파일을 포함하고 있을 경우에만 이것을 사용 가능
  return src(
    folderName === 'etc'
      ? `${root}/**/*.js`
      : [
        `${root}/**/{app,appHyundaiCard}.js`,
        `${root}/**/**/{common,config,Exem,RTM,PA,popup}/**/**/*.js`,
        `${root}/**/**/lib/IMXWS.js`,
      ],
    {
      sourcemaps: true,
    },
    {
      since: lastRun(uglifyJS),
    }
  )
    .pipe(babel())
    .pipe(stripDebug())
    // .pipe(uglify({
    //     mangle: {
    //         toplevel: true,
    //         reserved: ['jQuery']
    //     }
    // }))
    .pipe(uglify())
    .pipe(replace(/('|")use strict\1;/g, ''))
    .pipe(dest('result'));
}


/**
 * 1. npm run gulp
 *  - 뒤에 아무것도 없으면 default 로 default (src 폴더 전체)가 세팅됨
 * 2. npm run gulp [특정 폴더명]
 *  - 특정 폴더명을 입력 시, 해당 폴더만 진행 (단, maxgauge 프로젝트 압축 범위 적용해서 진행)
 *  - 특정 폴버명이 etc 일 경우, etc 폴더 안에 있는 모든 파일들을 대상으로 진행
 */
task(
  taskName,
  series(clear,
    (done) => {
      console.log('src 빌드중');
      done();
    },
    parallel(
      copyAllFilesExcludeJS,
      copyNotUglifyJS,
      uglifyJS
    )
  )
);
