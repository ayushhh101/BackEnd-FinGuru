const mongoose = require("mongoose");
const DailyChallenge = require("./models/Dailychallenge");

// ----------------------------
// 1. MONGO CONNECTION
// ----------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mumbaihacks:mumbaihacks@cluster0.fonvcex.mongodb.net/";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🌱 MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ----------------------------
// 2. SAMPLE DAILY CHALLENGES
// ----------------------------

// Allowed colors and paired backgrounds
const colorPairs = {
  "#D946EF": "bg-[#4A044E]",
  "#3B82F6": "bg-[#1E3A8A]",
  "#10B981": "bg-[#064E3B]",
  "#F59E0B": "bg-[#78350F]",
  "#F43F5E": "bg-[#4C0519]",
  "#6366F1": "bg-[#1E1B4B]",
  "#F97316": "bg-[#431407]",
  "#14B8A6": "bg-[#042F2E]",
  "#EF4444": "bg-[#450A0A]",
  "#84CC16": "bg-[#1A2E05]"
};

// Pick random color / bg pair
const pickColor = () => {
  const keys = Object.keys(colorPairs);
  const random = keys[Math.floor(Math.random() * keys.length)];
  return { color: random, bg: colorPairs[random] };
};

// Demo user ID
const USER_ID = "user_demo_123";

const sampleChallenges = [
  {
    challengeId: "CH01",
    userId: USER_ID,
    title: "Skip ordering food",
    description: "Cook at home or pack lunch today.",
    category: "food",
    amountPaise: 5000,
    rewardPaise: 1000,
    btnText: "Mark Done",
    difficulty: "medium",
    streakContribution: 1,
  },
  {
    challengeId: "CH02",
    userId: USER_ID,
    title: "Walk instead of cab",
    description: "Walk for nearby routes instead of taking transport.",
    category: "transport",
    amountPaise: 2000,
    rewardPaise: 500,
    btnText: "Done",
    difficulty: "easy",
    streakContribution: 1,
  },
  {
    challengeId: "CH03",
    userId: USER_ID,
    title: "Save ₹25 today",
    description: "Put aside a small amount today.",
    category: "saving",
    amountPaise: 2500,
    rewardPaise: 250,
    btnText: "Done",
    difficulty: "easy",
    streakContribution: 1,
  }
].map((c) => ({ ...c, ...pickColor(), dateAssigned: new Date() }));

// ----------------------------
// 3. SEED FUNCTION
// ----------------------------
async function seed() {
  try {
    await DailyChallenge.deleteMany({});
    console.log("🗑️ Cleared existing DailyChallenges");

    await DailyChallenge.insertMany(sampleChallenges);
    console.log("🌱 Seeded DailyChallenges successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
}

seed();
