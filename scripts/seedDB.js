const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below
mongoose.connect(process.env.MONGODB_URI);

const bookSeed = [
	{
		title: "1984",
		authors: "George Orwell",
		description: "A PBS Great American Read Top 100 Pick With extraordinary relevance and renewed popularity, George Orwell’s 1984 takes on new life in this edition. “Orwell saw, to his credit, that the act of falsifying reality is only secondarily a way ...",
		image: "http://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		link: "https://play.google.com/store/books/details?id=kotPYEqx7kMC&source=gbs_api"
	},
	{
		title: "The Way of Kings",
		authors: "Brandon Sanderson",
		description: "Introduces the world of Roshar through the experiences of a war-weary royal compelled by visions, a highborn youth condemned to military slavery, and a woman who is desperate to save her impoverished house.",
		image: "http://books.google.com/books/content?id=QVn-CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		link: "https://books.google.com/books?id=QVn-CgAAQBAJ&dq=the+way+of+kings&hl=&source=gbs_api"
	},
	{
		title: "Rich Dad Poor Dad",
		authors: "Robert Kiyosaki",
		description: "Although we have been successful in our careers, they have not turned out quite as we expected.",
		image: "http://books.google.com/books/content?id=hXAiDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		link: "http://books.google.com/books?id=hXAiDAAAQBAJ&dq=ric+dad+poor+dad&hl=&source=gbs_api"
	},
	{
		title: "Starship Troopers",
		authors: "Robert Heinlein",
		description: "In a futuristic military adventure a recruit goes through the roughest boot camp in the universe and into battle with the Terran Mobile Infantry in what historians would come to call the First Interstellar War",
		image: "http://books.google.com/books/content?id=rmEIDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		link: "https://books.google.com/books?id=rmEIDAAAQBAJ&dq=starship+troopers&hl=&source=gbs_api"
	},
];

db.Book.remove({})
	.then(() => db.Book.collection.insertMany(bookSeed))
	.then(data => {
		console.log(data.result.n + " records inserted!");
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});