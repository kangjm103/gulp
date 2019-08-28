/**
 * Created by Kang on 2018-04-23.
 */

const { series, parallel, src, dest, lastRun } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const clean = require('gulp-rimraf');
const replace = require("gulp-replace");
const stripDebug = require('gulp-strip-debug');   // 모든 console.log 들과 alert 들을 제거해주는 gulp 모듈 패키지

// 기존 dist 폴더 clear
function clear() {
    return src('result/*', {
            read: false
        })
        .pipe(clean());
}

// copy all files
function copyAllFilesExcludeJS() {
    return src(
            [
                'src/**/**/*.*',
                '!src/**/**/*.js',
                '!src/**/**/.idea/**/**/*.*',
                '!src/**/**/.git/**/**/*.*',
                '!src/**/**/.gitignore'
            ],
            {
                since: lastRun(copyAllFilesExcludeJS)
            }
        )
        .pipe(dest('result'))
}

function copyNotUglifyJS() {
    return src(
            [
                'src/**/**/extjs/**/**/*.js',
                'src/**/**/lib/**/**/*.js',
                'src/**/**/liteplus/**/**/*.js'
            ],
            {
                since: lastRun(copyNotUglifyJS)
            }
        )
        .pipe(dest('result'))
}

// combine:js 테스크를 정의
function uglifyJS() {
    // src 하위 디렉터리 내의 모든 자바스크립트 파일을 가져온다.
    // !는 바로 앞의 와일드카드 형태에서 이 파일을 포함하고 있을 경우에만 이것을 사용 가능
    return src(
            [
                'src/**/app.js',
                'src/**/**/common/**/**/*.js',
                'src/**/**/config/**/**/*.js',
                'src/**/**/Exem/**/**/*.js',
                'src/**/**/PA/**/**/*.js',
                'src/**/**/popup/**/**/*.js',
                'src/**/**/RTM/**/**/*.js',
                'src/**/**/lib/IMXWS.js'
            ],
            {
                sourcemaps: true
            },
            {
                since: lastRun(uglifyJS)
            }
        )
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
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

exports.default = series(
    clear,
    parallel(
        copyAllFilesExcludeJS,
        copyNotUglifyJS,
        uglifyJS
    ),
);
