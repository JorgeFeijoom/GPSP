const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },

  subtitle: {
    type: String,
    trim: true,
  },

  category: {
    type: ObjectId,
    ref: 'Category'
  },

  external_author: {
    type: ObjectId,
    ref: 'ExternalAuthor'
  },

  // interview, article, news, opinion
  template: {
    type: String,
    trim: true
  },

  header_mode: {
    type: String,
    default: 'image'
  },

  // Only for interviews, the person who is being interviewed
  interview_interviewee: {
    type: String,
    trim: true
  },

  // Only for interviews, the occupation of the interviewee
  interview_occupation: {
    type: String,
    trim: true
  },

  //
  // Headers
  // Image || Video
  //

  image: {
    s: {
      url: String
    },
    m: {
      url: String
    },
    l: {
      url: String
    }
  },

  video: {
    url: String,
    embed: String,
    frame: String
  },

  slug: {
    type: String,
    trim: true,
    required: true
  },

  author: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  },

  content: {
    type: String,
    required: true
  },

  gallery: [{
    s: {
      url: String,
      filename: String,
      size: Number,
      width: Number,
      height: Number
    },
    m: {
      url: String,
      filename: String,
      size: Number,
      width: Number,
      height: Number
    },
    l: {
      url: String,
      filename: String,
      size: Number,
      width: Number,
      height: Number
    }
  }],

  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);