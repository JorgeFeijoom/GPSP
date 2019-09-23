export interface Post {
  _id: string,
  title: string,
  subtitle: string,
  image: {
    s: {
      url: string
    },
    m: {
      url: string
    },
    l: {
      url: string
    }
  },
  vudeo: {
    url: string,
    embed: string,
    frame: string
  },
  slug: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

export interface ExternalAuthor {
  _id: String,
  name: String,
  bio: String,
  thumbnail: any,
  email: String
}

export interface Category {
  _id: string;
  name: string;
  slug: string
};

export interface Template {
  name: String,
  value: String
};