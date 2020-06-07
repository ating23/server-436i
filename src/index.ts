import mongoose, { Document, Schema } from "mongoose"

/** @Typescript-Mongoose */
// https://github.com/Automattic/mongoose/issues/8119

// open a connection to the `test` database
mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error: "))
db.on("open", () => {
	console.log("connected mongoose")
})

interface KittenDocument extends Document {
	// properties
	name: string;

	// methods
	speak (): void;
}

/**
 * @Schema each schema maps to a mongodb collection and defines
 * 	the shape of the documents within that collection
 */
const kittySchema: Schema = new mongoose.Schema({
	name: String
})

/**
 * @Functionality of documents
 */
kittySchema.methods.speak = function (): void {
	const greeting = this.name ? "Meow: " + this.name : "I don't have a name"
	console.log(greeting)
}

/**
 * @Model a model is a class with which we construct documents
 */
const Kitten = mongoose.model<KittenDocument>("Kiten", kittySchema)

// constructing a new object
const silence = new Kitten ({ name: "Silence" })
console.log(silence)
silence.speak();

/**
 * @Save save document to db by calling save() method
 */
silence.save((err, silence) => {
	if (err) return console.error(err)

	console.log("Saved on db: ", silence)
	console.log("ID: ", silence._id)
	silence.speak()
})