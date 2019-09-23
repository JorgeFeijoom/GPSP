const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const youtube = require('youtube-node');
const imageUtils = require('./media.utils.controller');

const headerImagesDir = '/img/headers/';
const galleryImagesDir = '/img/images/';
const authorImagesDir = '/img/authors/';

//
// Initializing directories
//

if ( !fs.existsSync(process.cwd() + '/tmp') )
  fs.mkdirSync(process.cwd() + '/tmp');

if ( !fs.existsSync(process.cwd() + '/tmp/img') )
  fs.mkdirSync(process.cwd() + '/tmp/img');

if ( !fs.existsSync(process.cwd() + '/tmp' + headerImagesDir) )
  fs.mkdirSync(process.cwd() + '/tmp' + headerImagesDir);

if ( !fs.existsSync(process.cwd() + '/tmp' + authorImagesDir) )
  fs.mkdirSync(process.cwd() + '/tmp' + authorImagesDir);

if ( !fs.existsSync(process.cwd() + '/tmp' + galleryImagesDir) )
  fs.mkdirSync(process.cwd() + '/tmp' + galleryImagesDir);

//
// Initializing directories for uploading content
//

const storageHeaderImage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.normalize(process.cwd() + '/tmp' + headerImagesDir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

const storageGalleryImage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.normalize(process.cwd() + '/tmp' + galleryImagesDir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

const storageAuthorImage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.normalize(process.cwd() + '/tmp' + authorImagesDir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

let uploadHeaderImage = multer({ storage: storageHeaderImage }).single('header');
let uploadGalleryImage = multer({ storage: storageGalleryImage }).single('image');
let uploadAuthorImage = multer({ storage: storageAuthorImage }).single('author');


module.exports = {
  createHeaderImage,
  createGalleryImage,
  createAuthorImage,
  YouTubeFrame
};


/**
 * create
 * Creates a new header for a given
 * article. It receveis the image,
 * process it and upload it to S3.
 * 
 * @param {*} file - The image 
 */

function createHeaderImage (req, res, next) {

  uploadHeaderImage(req, res, (err) => {

    if ( err instanceof multer.MulterError ) {
      console.error(err);
      return res.sendStatus(500);
    }
    else if ( err ) {
      console.error(err);
      return res.sendStatus(500);
    }

    //
    // Image properly uploaded,
    // let's adjust quality
    //

    const date = new Date();
    const header = req.file;
    const metadata = {
      uniqueFilename: header.filename.split('.')[0],
      extension: header.filename.split('.')[1],
      uploadPath: header.destination + '/',
      todayPublichPath: 'headers/' + date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate() + '/',
      uploadDevPath: headerImagesDir
    };
    
    imageUtils.adjustImageQuality(metadata, header.destination + '/' + header.filename, (sImage, mImage, lImage) => {

      //
      // Images have been resized and adjusted
      // 3 sizes: S, M and L
      //

      imageUtils.selectEnvironmentForImagesUpload(metadata, sImage, mImage, lImage, (image) => {

        // Success
        return res.status(200).json(image);

      });

    });

  });

}


/**
 * createGalleryImage
 * Creates a new image for a given
 * gallery article. It receveis the image,
 * process it and upload it to S3.
 * 
 * @param {*} file - The image 
 */

function createGalleryImage (req, res, next) {

  uploadGalleryImage(req, res, (err) => {

    if ( err instanceof multer.MulterError ) {
      console.error(err);
      return res.sendStatus(500);
    }
    else if ( err ) {
      console.error(err);
      return res.sendStatus(500);
    }

    //
    // Image properly uploaded,
    // let's adjust quality
    //

    const date = new Date();
    const imageFile = req.file;
    const metadata = {
      uniqueFilename: imageFile.filename.split('.')[0],
      extension: imageFile.filename.split('.')[1],
      uploadPath: imageFile.destination + '/',
      todayPublichPath: 'images/' + date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate() + '/',
      uploadDevPath: galleryImagesDir
    };
    
    imageUtils.adjustImageQuality(metadata, imageFile.destination + '/' + imageFile.filename, (sImage, mImage, lImage) => {

      //
      // Images have been resized and adjusted
      // 3 sizes: S, M and L
      //

      imageUtils.selectEnvironmentForImagesUpload(metadata, sImage, mImage, lImage, (modifiedImage) => {

        const image = {
          s: modifiedImage.s,
          m: modifiedImage.m,
          l: modifiedImage.l
        };

        // Success
        return res.status(200).json({
          image: image
        });

      });

    });

  });

}


/**
 * createAuthorImage
 * Creates a new author image for a given
 * article. It receives the image,
 * process it and upload it to S3.
 * 
 * @param {*} file - The image 
 */

function createAuthorImage (req, res, next) {

  uploadAuthorImage(req, res, (err) => {

    if ( err instanceof multer.MulterError ) {
      console.error(err);
      return res.sendStatus(500);
    }
    else if ( err ) {
      console.error(err);
      return res.sendStatus(500);
    }

    //
    // Image properly uploaded,
    // let's adjust quality
    //

    const date = new Date();
    const author = req.file;
    const metadata = {
      uniqueFilename: author.filename.split('.')[0],
      extension: author.filename.split('.')[1],
      uploadPath: author.destination + '/',
      todayPublichPath: 'thumbnails/' + date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate() + '/',
      uploadDevPath: authorImagesDir
    };

    const mFilename = metadata.uniqueFilename + '-m.' + metadata.extension;

    sharp(author.destination + '/' + author.filename)
      .sequentialRead()
      .resize(500, null, { withoutEnlargement: true })
      .toFile(metadata.uploadPath + mFilename, function (err, info) {

        // Error - 500
        if ( err ) {
          console.error(err);
          let error = new Error('The image couldn\'t be resized to 1920px width, so the saving failed');
          error.status = 500;
          next(error);
        }

        // Success
        let mImage = info;
        mImage.filename = mFilename;

        imageUtils.selectEnvironmentForImagesUpload(metadata, null, mImage, null, (image) => {
          return res.status(200).json(image);
        });


      });

  });

}


/**
 * YouTubeFrame
 * Gets a YouTube video URL and it tries to get
 * the image frames from the original video.
 * 
 * It tries to get the maxres frame version. In case it
 * doesn't exist, it gets the hqdefault frame version.
 * 
 * @param {*} YouTubeVideoId {Number}
 * 
 */

function YouTubeFrame (req, res, next) {

  const video_id = req.params.YouTubeVideoId;

  if ( video_id ) {

    const YouTube = new youtube();
    
    YouTube.setKey('AIzaSyDovVYVnD5MuIBg9TjObmqkFxX2YOi3NLM');
    YouTube.getById(video_id, (err, video) => {
      
      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('YouTube API is not working properly. Image cannot be retrieved');
        error.status = 500;
        next(error);
      }

      //
      // Success
      //

      if ( video.items.length > 0 ) {

        //
        // Video exists
        //
        // Trying to return the maxres version.
        // If it doesn't exist, returning the HQ version.
        //

        if ( video.items[0].snippet.thumbnails.maxres )
          return res.status(200).json({
            frame: video.items[0].snippet.thumbnails.maxres.url
          });
        else if ( video.items[0].snippet.thumbnails.high )
          return res.status(200).json({
            frame: video.items[0].snippet.thumbnails.high.url
          });
        else
          return res.status(200).json({
            frame: video.items[0].snippet.thumbnails.standard.url
          });

      }
      else {

        //
        // Video doesn't exist
        //

        let error = new Error('Video does not exist');
        error.status = 400;
        next(error);

      }

    });

  }
}