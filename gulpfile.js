const gulp = require("gulp");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");


// Optimize images
function optimizeImages() {
  return gulp.src("_imagesToOptimize/*")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 6}),
        imagemin.mozjpeg({quality: 82, progressive: true})
      ])
    )
    .pipe(gulp.dest("public/images/"))
    .pipe(webp())
    .pipe(gulp.dest("public/images/"));
}

function moveImagesToOriginals() {
  return gulp.src("_imagesToOptimize/*")
    .pipe(gulp.dest("_originalRawImages/"));
}

function cleanImagesToOptimizeFolder() {
  return gulp.src("_imagesToOptimize/*", {read: false})
    .pipe(clean({force: true}));
}

exports.optimizeImages = gulp.series(
  optimizeImages,
  moveImagesToOriginals,
  cleanImagesToOptimizeFolder
);


// Optimize icons
function optimizeIcons() {
  return gulp.src("_iconsToOptimize/*")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 7}),
        imagemin.mozjpeg({quality: 82, progressive: true})
      ])
    )
    .pipe(gulp.dest("public/icons/"));
}

function moveIconsToOriginals() {
  return gulp.src("_iconsToOptimize/*")
    .pipe(gulp.dest("_originalRawImages/"));
}

function cleanIconsToOptimizeFolder() {
  return gulp.src("_iconsToOptimize/*", {read: false})
    .pipe(clean({force: true}));
}

exports.optimizeIcons = gulp.series(
  optimizeIcons,
  moveIconsToOriginals,
  cleanIconsToOptimizeFolder
);

