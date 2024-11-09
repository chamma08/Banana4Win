import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;
