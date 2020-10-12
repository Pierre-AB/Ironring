// const mongoose = require('mongoose');
// const User = require('../models/User.model.js');
// const Project = require('../models/Project.model.js');
// const DB_NAME = 'IRONRING';
// const saltRounds = 10;
// const bcryptjs = require("bcryptjs");


// mongoose.connect(process.env.MONGODB_URI, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('base connected');
//   })
//   .catch((err) => {
//     console.log('boom', err);
//     // next(err); // EST CE QUE CELA FONCTIONNE SUR UNE DATABASE?
//   })

// const users = [
//   {
//     "firstName": "Sarah",
//     "lastName": "Ledu",
//     "gitHub": "https//github.com/sarahledu",
//     "ironhacker": "true",
//     "email": "Sarah.Ledu@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Apple Pie"
//   },
//   {
//     "firstName": "Louise",
//     "lastName": "Marissal",
//     "gitHub": "https//github.com/louisemarissal",
//     "ironhacker": "true",
//     "email": "Louise.Marissal@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "JS"
//   },
//   {
//     "firstName": "Amine",
//     "lastName": "Lahrichi",
//     "gitHub": "https//github.com/aminelahrichi",
//     "ironhacker": "true",
//     "email": "Amine.Lahrichi@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Javascript"
//   },
//   {
//     "firstName": "Hanna",
//     "lastName": "bercheron",
//     "gitHub": "https//github.com/hanna974",
//     "ironhacker": "true",
//     "email": "Hannabercheron@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Express, MongoDB"
//   },
//   {
//     "firstName": "Aida",
//     "lastName": "Bej",
//     "gitHub": "https//github.com/aidabej",
//     "ironhacker": "true",
//     "email": "Aida.Bej@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Karaté"
//   },
//   {
//     "firstName": "Aimee",
//     "lastName": "Stone",
//     "gitHub": "https//github.com/aimeestone",
//     "ironhacker": "true",
//     "email": "Aimee.Stone@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Bubble-Gum"
//   },
//   {
//     "firstName": "Anais",
//     "lastName": "Lor",
//     "gitHub": "https//github.com/anaislor",
//     "ironhacker": "true",
//     "email": "Anais.Lor@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Chocolate cake"
//   },
//   {
//     "firstName": "Frank",
//     "lastName": "Marmier",
//     "gitHub": "https//github.com/frankmarmier",
//     "ironhacker": "true",
//     "email": "Frank.Marmier@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Team work"
//   },
//   {
//     "firstName": "Mimi",
//     "lastName": "Amsa",
//     "gitHub": "https//github.com/mimiamsa",
//     "ironhacker": "true",
//     "email": "Mimi.Amsa@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Work under pressure"
//   },
//   {
//     "firstName": "Clara",
//     "lastName": "Besset",
//     "gitHub": "https//github.com/clarabesset",
//     "ironhacker": "true",
//     "email": "Clara.Besset@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Tight deadlines"
//   },
//   {
//     "firstName": "Pascal",
//     "lastName": "Bes",
//     "gitHub": "https//github.com/pascalbes",
//     "ironhacker": "true",
//     "email": "Pascal.Bes@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Creativité"
//   },
//   {
//     "firstName": "M",
//     "lastName": "Munizaga",
//     "gitHub": "https//github.com/mmunizaga",
//     "ironhacker": "true",
//     "email": "M.Munizaga@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Versatility"
//   },
//   {
//     "firstName": "Kath",
//     "lastName": "D",
//     "gitHub": "https//github.com/kathd",
//     "ironhacker": "true",
//     "email": "Kath.D@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Sponge Bob Square Pants"
//   },
//   {
//     "firstName": "A",
//     "lastName": "Brebion",
//     "gitHub": "https//github.com/abrebion",
//     "ironhacker": "true",
//     "email": "A.Brebion@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "React"
//   },
//   {
//     "firstName": "A",
//     "lastName": "Meyer",
//     "gitHub": "https//github.com/ameyerfr",
//     "ironhacker": "true",
//     "email": "A.Meyer@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "CSS expert"
//   },
//   {
//     "firstName": "Yannick",
//     "lastName": "Bourenane",
//     "gitHub": "https//github.com/yannick-bourenane",
//     "ironhacker": "true",
//     "email": "Yannick.Bourenane@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Cats"
//   },
//   {
//     "firstName": "Alix",
//     "lastName": "Der",
//     "gitHub": "https//github.com/alixder",
//     "ironhacker": "true",
//     "email": "Alix.Der@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "C++"
//   },
//   {
//     "firstName": "Pauline",
//     "lastName": "Lalou",
//     "gitHub": "https//github.com/paulinelalou",
//     "ironhacker": "true",
//     "email": "Pauline.Lalou@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "IOT"
//   },
//   {
//     "firstName": "Sam",
//     "lastName": "Lfair",
//     "gitHub": "https//github.com/samlfair",
//     "ironhacker": "true",
//     "email": "Sam.Lfair@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "HTML5"
//   },
//   {
//     "firstName": "Pauline",
//     "lastName": "Dcs",
//     "gitHub": "https//github.com/pauline-dcs",
//     "ironhacker": "true",
//     "email": "Pauline.Dcs@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Raspberry Pie"
//   },
//   {
//     "firstName": "Luxia",
//     "lastName": "Anon",
//     "gitHub": "https//github.com/luxiaanon",
//     "ironhacker": "true",
//     "email": "Luxia.Anon@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Tesla"
//   },
//   {
//     "firstName": "Mathias",
//     "lastName": "Gautier",
//     "gitHub": "https//github.com/mathiasgautier",
//     "ironhacker": "true",
//     "email": "Mathias.Gautier@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Business background"
//   },
//   {
//     "firstName": "Guillaume",
//     "lastName": "G",
//     "gitHub": "https//github.com/guiohm432",
//     "ironhacker": "true",
//     "email": "Guillaume.G@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Strong potential"
//   },
//   {
//     "firstName": "Thes",
//     "lastName": "Hua",
//     "gitHub": "https//github.com/theshua",
//     "ironhacker": "true",
//     "email": "Thes.Hua@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Love to learn"
//   },
//   {
//     "firstName": "Florian",
//     "lastName": "Jomain",
//     "gitHub": "https//github.com/florian-jomain",
//     "ironhacker": "true",
//     "email": "Florian.Jomain@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Humility"
//   },
//   {
//     "firstName": "B",
//     "lastName": "Dean",
//     "gitHub": "https//github.com/bdean05",
//     "ironhacker": "true",
//     "email": "B.Dean@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Easy to work with"
//   },
//   {
//     "firstName": "Aude",
//     "lastName": "Richon",
//     "gitHub": "https//github.com/auderichon",
//     "ironhacker": "true",
//     "email": "Aude.Richon@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Self-running"
//   },
//   {
//     "firstName": "Axel",
//     "lastName": "A",
//     "gitHub": "https//github.com/axel0310",
//     "ironhacker": "true",
//     "email": "Axel.A@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Strong team player"
//   },
//   {
//     "firstName": "Chakib",
//     "lastName": "C",
//     "gitHub": "https//github.com/cchakibb",
//     "ironhacker": "true",
//     "email": "Chakib.C@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Love to share"
//   },
//   {
//     "firstName": "Fanny",
//     "lastName": "Sbn",
//     "gitHub": "https//github.com/fanny-sbn",
//     "ironhacker": "true",
//     "email": "Fanny.Sbn@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Apple Pie"
//   },
//   {
//     "firstName": "Manon",
//     "lastName": "Morgaut",
//     "gitHub": "https//github.com/manonmorgaut",
//     "ironhacker": "true",
//     "email": "Manon.Morgaut@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "JS"
//   },
//   {
//     "firstName": "Marie",
//     "lastName": "Amp",
//     "gitHub": "https//github.com/marieamp",
//     "ironhacker": "true",
//     "email": "Marie.Amp@gmail.com",
//     "password": "Azerty12",
//     "course": "UX/UI",
//     "Campus": "Paris",
//     "expertise": "Javascript"
//   },
//   {
//     "firstName": "Maya",
//     "lastName": "Desp",
//     "gitHub": "https//github.com/mayadesp",
//     "ironhacker": "true",
//     "email": "Maya.Desp@gmail.com",
//     "password": "Azerty12",
//     "course": "Data",
//     "Campus": "Paris",
//     "expertise": "Express, MongoDB"
//   },
//   {
//     "firstName": "Menhaj",
//     "lastName": "M",
//     "gitHub": "https//github.com/menhaj01",
//     "ironhacker": "true",
//     "email": "Menhaj.M@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Paris",
//     "expertise": "Karaté"
//   },
//   {
//     "firstName": "Tomas",
//     "lastName": "Bennasar",
//     "gitHub": "https://github.com/b-tom/IH-First-Project",
//     "ironhacker": "true",
//     "email": "Tomas.Bennasar@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Bubble-Gum"
//   },
//   {
//     "firstName": "Nick",
//     "lastName": "Sayago",
//     "gitHub": "https://github.com/Nick-S7/PTWD-06-2020-Project-1",
//     "ironhacker": "true",
//     "email": "Nick.Sayago@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Chocolate cake"
//   },
//   {
//     "firstName": "Mikayla",
//     "lastName": "Castro",
//     "gitHub": "https://github.com/mikaylac97/Canvas-Flappy-Bird",
//     "ironhacker": "true",
//     "email": "Mikayla.Castro@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Team work"
//   },
//   {
//     "firstName": "Lee",
//     "lastName": "Fung-A-Fat",
//     "gitHub": "https://leefaf.github.io/Module-one-game-/",
//     "ironhacker": "true",
//     "email": "Lee.Fung-A-Fat@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Work under pressure"
//   },
//   {
//     "firstName": "Kevin",
//     "lastName": "Hernandez",
//     "gitHub": "https://github.com/kevin4052/project-game-platformer",
//     "ironhacker": "true",
//     "email": "Kevin.Hernandez@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Tight deadlines"
//   },
//   {
//     "firstName": "Jelena",
//     "lastName": "Nikic",
//     "gitHub": "https://github.com/jelenan12/Project1st",
//     "ironhacker": "true",
//     "email": "Jelena.Nikic@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Creativité"
//   },
//   {
//     "firstName": "Arianna",
//     "lastName": "Valle",
//     "gitHub": "https://github.com/ariannavalle/Infinity-Jump",
//     "ironhacker": "true",
//     "email": "Arianna.Valle@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Versatility"
//   },
//   {
//     "firstName": "Andrew",
//     "lastName": "Chen",
//     "gitHub": "https://github.com/achen002/Project-1",
//     "ironhacker": "true",
//     "email": "Andrew.Chen@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Sponge Bob Square Pants"
//   },
//   {
//     "firstName": "Andrei",
//     "lastName": "Alvarez",
//     "gitHub": "https://github.com/andreiAlvarez/Grandma-s-Car-Race",
//     "ironhacker": "true",
//     "email": "Andrei.Alvarez@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "React"
//   },
//   {
//     "firstName": "Alexey",
//     "lastName": "Ugodnikov",
//     "gitHub": "https://github.com/alex-ugodnikov/project-demogame",
//     "ironhacker": "true",
//     "email": "Alexey.Ugodnikov@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "CSS expert"
//   },
//   {
//     "firstName": "Alejandro",
//     "lastName": "Garcia",
//     "gitHub": "https://github.com/agarcia-carecloud/PTWD-Project1",
//     "ironhacker": "true",
//     "email": "Alejandro.Garcia@gmail.com",
//     "password": "Azerty12",
//     "course": "Web-Dev",
//     "Campus": "Miami",
//     "expertise": "Cats"
//   }
// ]


// User.create(users)
//   .then(userCreated => {
//     console.log("USERS CREATED")
//     mongoose.connection.close()
//   })
//   .catch(err => next(err))
