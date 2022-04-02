const { Schema, model } = require("mongoose");
const formatDate = require("../utils/date");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (dateNow) => formatDate(dateNow),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
