import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number,
        required: true
    },

});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;
