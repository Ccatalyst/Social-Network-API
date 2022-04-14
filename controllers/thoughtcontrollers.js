const { Thought, Reaction, User } = require("../models");

const thoughtController = {
	getAllThoughts(req, res) {
		Thought.find()
			.select("-__v")
			.then((databaseThoughtData) => {
				res.json(databaseThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	getThoughtById(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.populate("reactions")
			.then((databaseThoughtData) => {
				if (!databaseThoughtData) {
					return res.status(404).json({ message: "No thought with that Id!" });
				}
				res.json(databaseThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{
				runValidators: true,
				new: true,
			}
		)
			.then((databaseThoughtData) => {
				if (!databaseThoughtData) {
					return res.status(404).json({ message: "No thought with this Id" });
				}
				res.json(databaseThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	createThought(req, res) {
		Thought.create(req.body)
			.then((thoughtArrayData) => {
				return User.findOneAndUpdate(
					{
						_id: req.body.thoughtId,
					},
					{
						$push: { thoughts: thoughtArrayData._id },
					},
					{
						new: true,
					}
				);
			})

			.then((databaseThoughtData) => {
				res.json(databaseThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	deleteThought(req, res) {
		Thought.findOneAndRemove({ _id: req.params.thoughtId })
			.then((thoughtArrayData) => {
				if (!thoughtArrayData) {
					return res.status(404).json({ message: "Could not find that thought!" });
				}
				return User.findOneAndUpdate(
					{
						_id: req.body.userId,
					},
					{
						$pull: { thoughts: req.params.thoughtId },
					},
					{
						new: true,
					}
				);
			})
			.then((databaseThoughtData) => {
				if (!databaseThoughtData) {
					return res.status(404).json({ message: "No thought with that Id" });
				}
				return Thought.deleteMany({ _id: { $in: databaseThoughtData.reactions } });
			})
			.then(() => {
				res.json({ message: "Thought and associated reactions deleted" });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{
				_id: req.params.thoughtId,
			},
			{
				$addToSet: {
					reactions: req.params.reactionId,
				},
			},
			{
				new: true,
			}
		)
			.then((databaseReactionData) => {
				if (!databaseReactionData) {
					return res.status(404).json({ message: "No reaction with that Id" });
				}
				res.json(databaseReactionData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{
				_id: req.params.thoughtId,
			},
			{
				$pull: {
					reactions: req.params.reactionId,
				},
			},
			{
				new: true,
			}
		)
			.then((databaseReactionData) => {
				if (!databaseReactionData) {
					return res.status(404).json({ message: "No reaction with that Id" });
				}
				res.json(databaseReactionData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
module.exports = thoughtController;
