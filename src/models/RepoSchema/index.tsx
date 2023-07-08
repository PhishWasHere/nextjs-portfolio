import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema({
    id: String,
    html_url: String,
    name: String,
    description: String,
    image: String,
    alt: String,
    primaryLanguage: {
        name: String,
        color: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});

export default mongoose.models.Repo || mongoose.model('Repo', RepoSchema);