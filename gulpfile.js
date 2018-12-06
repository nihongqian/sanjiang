

let gulp = require("gulp");
let babel = require("gulp-babel");	//ES6转ES5模块
let uglify = require("gulp-uglify");	//JS压缩模块	
let cleancss = require("gulp-clean-css");	//CSS压缩模块
let htmlmin = require("gulp-htmlmin");	//HTML压缩模块
let sass = require("gulp-sass");	//SCSS转CSS模块
let webserver = require("gulp-webserver");


gulp.task("buildJS", ()=>{
	//只复制
	gulp.src("./src/scripts/libs/*.js")
	
	//编译压缩再复制
	gulp.src("./src/scripts/*.js")
		.pipe(babel({
			presets: ["env"]
		}))
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/scripts") )
})

gulp.task("buildCSS", ()=>{
	gulp.src("./src/**/*.scss")
		.pipe( sass() )
		.pipe( cleancss() )
		.pipe( gulp.dest("./dist") )
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/pages/*.html")
		.pipe( htmlmin({ collapseWhitespace: true }) )
		.pipe( gulp.dest("./dist/pages") );
})

gulp.task("buildStaticResource", ()=>{
	gulp.src("./src/static/**/*.*").pipe( gulp.dest("./dist") );
})

gulp.task("watching", ()=>{
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.html", ["buildHTML"]);
});

gulp.task('webserver', ["watching"], function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true, //是否支持热部署
			https: true,
			port: 8848,
			open: true,
			proxies : [
				{	
					source: '/abcdefg', 
					target: 'https://m.lagou.com/listmore.json?pageNo=2&pageSize=15',
				},
				{
					source: '/userinfo',
					target: 'https://nbrecsys.4paradigm.com/api/v0/recom/recall?requestID=pmKC7kYD&userID=u3FFkObPEe&sceneID=34'
					
				}
			]
		}));
});

gulp.task("build", ["buildJS","buildHTML", "buildCSS", "buildStaticResource"])