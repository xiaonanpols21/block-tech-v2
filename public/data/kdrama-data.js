
// Data
// TODO: Bron to seperate files: https://stackoverflow.com/questions/5697061/how-to-manage-multiple-js-files-server-side-with-node-js
// All data comes fron: https://mydramalist.com/
const genre = [
    "romance",
    "historical",
    "music",
    "action",
    "adventure",
    "melodrama",
    "idoldrama",
    "comedy",
    "friendship",
    "business",
    "fantasy",
    "drama"
  ];
  
  const kdramas = [
    {
      id: 1,
      slug: "the-hymn-of-death",
      name: "The Hymn of Death",
      year: "2018",
      genre: ["musical", "historical", "romance", "melodrama"],
      storyline:
        "Kim Woo Jin is a stage drama writer while Korea is under Japanese occupation. He is married, but he falls in love with Yun Shim Deok. Shim Deok is the first Korean soprano. She records the song “Praise of Death” which becomes the first Korean pop song in 1926. Woo Jin and Shim Deok's fate ends tragically.",
    },
  
    {
      id: 2,
      slug: "what's-wrong-with-secretary-kim",
      name: "What's Wrong with Secretary Kim",
      year: "2018",
      genre: ["friendship", "business", "romance", "comedy"],
      storyline:
        "The series revolves around the narcissistic Lee Young Joon, the vice president of a company run by his family. He is very self-absorbed and thinks highly of himself, so much that he barely acknowledges the people around him. Lee Young Joon has a capable and patient secretary Kim Mi So who has remained by his side and worked diligently for 9 years without any romantic involvement. However, Mi So now wants to set her life & focus on herself so when she decides to resign from her job, hilarious misunderstandings ensue. After 9 years of their strictly-workplace relationship, can it now develop in something more?",
    },
  
    {
      id: 3,
      slug: "doom-at-your-service",
      name: "Doom at your service",
      year: "2021",
      genre: ["comedy", "romance", "drama", "fantasy"],
      storyline:
        "Tak Dong Kyung has been working hard ever since her parents passed away. Her life seemed more stable after working as a web novel editor for 6 years, but then she gets diagnosed with glioblastoma (brain cancer). She blames her unlucky life and wishes to curse everything to disappear, which unintentionally calls Myeol Mang, Doom himself - neither human nor god - to appear. ",
    },
  ];