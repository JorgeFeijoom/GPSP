'use strict';

const fs = require('fs'),
   sharp = require('sharp'),
  config = require('../../config/config'),
      s3 = require('s3');


/*
 * Image Utils Controller
 *
 * Useful functions for managing, processing,
 * convert and upload images.
 *
 */

module.exports = {
  adjustImageQuality,
  selectEnvironmentForImagesUpload
};


let client = null;


//
// Public path
// S3 public url.
//

let cloudfrontDomain = config.aws.cloudfront_domain;


/*
 * adjustImageQuality
 *
 * Takes the buffer data and creates three different
 * versions of the same header.
 *
 * Each header has a different quality and size.
 *
 * small -> 400px
 * medium -> 1024px
 * large -> 1920px
 *
 */

function adjustImageQuality (metadata, data, callback) {

  let lImage = null,
      mImage = null,
      sImage = null;


  //
  // Creating large image
  //
  // Resizing if is bigger than 1920px width
  //

  const lFilename = metadata.uniqueFilename + '-l.' + metadata.extension;

  sharp(data)
    .sequentialRead()
    .resize(1920, null, { withoutEnlargement: true })
    .toFile(metadata.uploadPath + lFilename, function (err, info) {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('The image couldn\'t be resized to 1920px width, so the saving failed');
        error.status = 500;
        next(error);
      }

      // Success
      lImage = info;
      lImage.filename = lFilename;


      //
      // Creating medium image
      //
      // Resizing if is bigger than 1024px width
      //

      const mFilename = metadata.uniqueFilename + '-m.' + metadata.extension;

    sharp(data)
      .sequentialRead()
      .resize(1024, null, { withoutEnlargement: true })
      .toFile(metadata.uploadPath + mFilename, function (err, info) {

        // Error - 500
        if ( err ) {
          console.error(err);
          let error = new Error('The image couldn\'t be resized to 1024px width, so the saving failed');
          error.status = 500;
          next(error);
        }

        // Success
        mImage = info;
        mImage.filename = mFilename;


        //
        // Creating small image
        //
        // Resizing if is bigger than 1650px width
        //

        const sFilename = metadata.uniqueFilename + '-s.' + metadata.extension;

      sharp(data)
        .sequentialRead()
        .resize(400, null, { withoutEnlargement: true })
        .toFile(metadata.uploadPath + sFilename, function (err, info) {

          // Error - 500
          if ( err ) {
            console.error(err);
            let error = new Error('The image couldn\'t be resized to 400px width, so the saving failed');
            error.status = 500;
            next(error);
          }

          // Success
          sImage = info;
          sImage.filename = sFilename;


          //
          // Executing callback and passing images' info
          //

          callback(sImage, mImage, lImage);

      });

    });

  });

}


/*
 * uploadImageToS3
 *
 * Uploads a given image to S3
 *
 */

function uploadImageToS3 (file, metadata, callback) {

  if ( !file ) return callback();

  //
  // Client for uploading images directly to AWS S3
  //

  client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
      accessKeyId: config.aws.key,
      secretAccessKey: config.aws.secret,
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    }
  });


  //
  // AWS S3 params for uploading the images
  //

  const params = {
    localFile: metadata.uploadPath + file.filename,
    s3Params: {
      Bucket: config.aws.bucket,
      Key: metadata.todayPublicPath + file.filename,
      ACL: 'public-read',
      //GrantRead: 'Everyone'
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    }
  };

  const uploader = client.uploadFile(params);


  uploader.on('error', function (err) {
    console.error('unable to upload:', err.stack);
  });

  uploader.on('end', function () {

    //
    // Finished properly the uploading
    //

    //
    // Deleting the local file as we already have
    // our copy in s3
    //

    fs.unlinkSync(metadata.uploadPath + file.filename);

    callback();

  });

}


/*
 * selectEnrivonmentForImagesUpload
 *
 * According to the environment, the upload method
 * changes. In TEST/DEVELOPMENT, headers are stored
 * locally.
 *
 * In PRODUCTION, headers will be stored in S3 leaving
 * no trace locally.
 *
 */

function selectEnvironmentForImagesUpload (metadata, sImage, mImage, lImage, callback) {

  let image = {
    s: null,
    m: null,
    l: null
  };

  if ( sImage ) {
    image.s = {
      filename: sImage.filename,
      size: sImage.size,
      width: sImage.width,
      height: sImage.height
    }
  }

  if ( mImage ) {
    image.m = {
      filename: mImage.filename,
      size: mImage.size,
      width: mImage.width,
      height: mImage.height
    }
  }

  if ( lImage ) {
    image.l = {
      filename: lImage.filename,
      size: lImage.size,
      width: lImage.width,
      height: lImage.height
    }
  }


  if ( config.aws.key && config.aws.secret && config.aws.bucket ) {
    
    //
    // Used in PRODUCTION - Using s3
    //

    if ( image.s )
      image.s.url = cloudfrontDomain + metadata.todayPublicPath + sImage.filename;
    
    if ( image.m )
      image.m.url = cloudfrontDomain + metadata.todayPublicPath + mImage.filename;
    
    if ( image.l )
      image.l.url = cloudfrontDomain + metadata.todayPublicPath + lImage.filename;
   
    //
    // Uploading the files
    //

    uploadImageToS3(image.s, metadata, function () {
      uploadImageToS3(image.m, metadata, function () {
        uploadImageToS3(image.l, metadata, function () {
          // Returning the image
          callback(image);
        });
      });
    });
  }
  else {

    //
    // Used in TEST/DEVELOPMENT - Uploaded to localhost
    //

    if ( image.s )
      image.s.url = metadata.uploadDevPath + sImage.filename;
    
    if ( image.m )
      image.m.url = metadata.uploadDevPath + mImage.filename;

    if ( image.l )
      image.l.url = metadata.uploadDevPath + lImage.filename;


    //
    // Sending response and
    // object recently created.
    //

    // Returning the image
    callback(image);

  }

};