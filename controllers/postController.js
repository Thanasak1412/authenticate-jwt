const getPosts = (req, res) => {
  res.json({
    posts: { title: "Happy New Year", description: "Happy new Year 2022." },
    posts: { title: "Happy Birth Day", description: "Happy birth day to you." },
    posts: { title: "Valentine day", description: "Happy Valentine Day" },
  });
};

module.exports = { getPosts };
