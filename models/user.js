const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/, "Not a valid email address"],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("friend_count").get(() => {
	return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;