"use strict";

const gulp = require("gulp"); // підключаємо gulp
const webpack = require("webpack-stream"); // підключаємо webpack-stream
const browsersync = require("browser-sync"); // підключаємо browser-sync

const dist = "./dist/"; // куди компілюються зібрані файли 

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html") // беремо з папки src файл index.html 
                .pipe(gulp.dest(dist)) // копіюємо його в папку ./dist/
                .pipe(browsersync.stream()); // перезавантажуємо браузер
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js") // беремо з папки src/js файл main.js 
                .pipe(webpack({ // проганяємо його через webpack
                    mode: 'development',
                    output: {
                        filename: 'script.js' // ім'я нового файлу після webpack - script.js
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));