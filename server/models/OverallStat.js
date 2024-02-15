import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema({
  end_year: String,
  intersity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const OveralStat = mongoose.model("OveralStat", OverallStatSchema);

export default OveralStat;
