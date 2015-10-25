var gulp = require("gulp");
var plugins = {
  "cssnano": require("gulp-cssnano"),
  "del": require("del"),
  "postcss": require("gulp-postcss"),
  "sourcemaps": require("gulp-sourcemaps"),
  "webserver": require("gulp-webserver"),
  "webpack": require("gulp-webpack")
};
var processors = {
  "customProps": require("postcss-custom-properties"),
  "import": require("postcss-import"),
  "mediaVars": require("postcss-media-variables"),
  "mqPacker": require("css-mqpacker")
};
var paths = {
  input: {
    css: {
      main: "src/css/master.css",
      watch: "src/css/**/*.css"
    },
    html: {
      main: "src/css/index.html",
      watch: "src/css/index.html"
    },
    js: {
      main: "src/js/app.js",
      watch: "src/js/**/*.js"
    }
  },
  output: paths.output
};


function js() {
  return gulp.src(paths.input.js.main)
    .pipe(plugins.webpack({
      module: {
      loaders: [
          {
            test: /\.jsx?$/,
            loader: "babel"
          }
        ],
      },
      output: {
        filename: "app.js"
      }
    }))
    .pipe(gulp.dest(paths.output));
}
gulp.task("js", js);
gulp.task("js-clean", ["clean"], js);

function html() {
  return gulp.src(paths.input.html.main)
    .pipe(gulp.dest(paths.output));
}
gulp.task("html", html);
gulp.task("html-clean", ["clean"], html);

function css() {
  return gulp.src(paths.input.css.main)
    .pipe(plugins.postcss(
      [
        processors.import,
        processors.customProps,
        processors.mediaVars,
        processors.mqPacker
      ]
    ))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.output));
}
gulp.task("css", css);
gulp.task("css-clean", ["clean"], css);

gulp.task("build", ["html-clean", "js-clean", "css-clean"]);
gulp.task("clean", function () { return plugins.del(paths.output); });
gulp.task("default", function () {
  return gulp.src("dist")
    .pipe(plugins.webserver({
      livereload: false,
      directoryListing: false,
      open: true
    }));
});