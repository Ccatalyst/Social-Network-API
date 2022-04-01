const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		maxlength: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		// TODO: set getter that formats Date.now into human readable date
	},
	username: {
		type: String,
		required: true,
	},
	reactions: {
		// TODO: set up via the reactionSchema
	},
});
