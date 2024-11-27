import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;
