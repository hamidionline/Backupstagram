var fs = require("fs");
var path = require("path");

var request = require("request");
var moment = require('moment');

var config = require('./config');

var InstagramPosts = require('instagram-screen-scrape').InstagramPosts;

var allMetaData = [];

var streamOfPosts = new InstagramPosts({
  username: config.username
});

streamOfPosts.on('data', function(post) {
  var time = new Date(post.time * 1000);
  var postData = {
    "id" : post.id,
    "username": post.username,
    "date": moment(time).format('YYYY-MM-DD'),
    "type": post.type,
    "likes": post.likes,
    "comment-count": post.comments,
    "comments": [],
    "description": post.text,
    "links" : post.media,
    "media" : []
  };

  var userFolder = path.join(config.backupFolder, postData.username);
  if (!fs.existsSync(userFolder)){
    fs.mkdirSync(userFolder);
  }
  var mediaFolder = path.join(userFolder, "media");
  if (!fs.existsSync(mediaFolder)){
    fs.mkdirSync(mediaFolder);
  }

  //write photos/videos
  if (typeof postData.links === "string"){
    // Single media file
    var newFileName = "instagram " + postData.date + " " + postData.id;
    downloadMediaFile(postData.links, newFileName, mediaFolder);
    postData.media.push(path.join("media", newFileName + "." + getExtension(postData.links)));
  } else {
    for (var i = 0; i < postData.links.length; i++) {
      // Multiple media files
      var thisLink = postData.links[i];
      var newFileNameMultiple = "instagram " + postData.date + " " + postData.id + "-" + (i + 1);
      downloadMediaFile(thisLink, newFileNameMultiple, mediaFolder);
      postData.media.push(path.join("media", newFileNameMultiple + "." + getExtension(thisLink)));
    };
  }

  allMetaData.push(postData);
  // Write the metadata file after every post so if the connection breaks it will still contain all data up to the point it disconnected.
  writeMetaDataFile(allMetaData, userFolder);
});

function writeMetaDataFile(postData, destination){
    fs.writeFile(path.join(destination, "metadata.json"), JSON.stringify(postData, null, 2), 'utf8', function(err) {
      if(err){
        console.log(err);
        console.log(postData);
      }
    });
}

function downloadMediaFile(mediaFile, fileName, destination) {
  //console.log(url);
  request.get({url: mediaFile, encoding: 'binary'}, function (err, response, body) {
    var fileExists = fs.existsSync(path.join(destination, fileName + "." + getExtension(mediaFile)));
    if (!fileExists) {
      fs.writeFile(path.join(destination, fileName + "." + getExtension(mediaFile)), body, 'binary', function(err) {
        if(err)
          console.log(err);
        else
          console.log("Media file saved!");
      });
    } else { console.log("Skipping duplicate...")}
  });
}

function getExtension(path){
  var urlSegments = path.split("/");
  var fileWithExtension = urlSegments[urlSegments.length -1];
  var fileWithoutExtension = fileWithExtension.split(".")[0];
  return fileWithExtension.split(".")[1];
}
