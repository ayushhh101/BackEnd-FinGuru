const mongoose = require('mongoose');
const SavingsJar = require('./models/SavingsJar'); // Adjust path to your Model
require('dotenv').config(); // Load env vars if you keep MONGO_URI there

// --- CONFIGURATION ---
const MONGO_URI = 'mongodb+srv://mumbaihacks:mumbaihacks@cluster0.fonvcex.mongodb.net/'; 
const USER_ID = "usr_rahul_001"; // The specific user you want to add these for

// --- YOUR MOCK DATA (Adapted) ---
// Note: Removed 'suggested_amt' (auto-calculated) and 'id' (auto-generated)
const mockData = [
  { 
    title: "Diwali Fund", 
    target: 5000, 
    saved: 0, 
    deadline_days: 23, // We will convert this below
    icon: "fire", 
    color: "#F97316", 
    bg: "bg-[#431407]" 
  },
  { 
    title: "Bike Repair", 
    target: 2000, 
    saved: 0, 
    deadline_days: 8, 
    icon: "motorbike", 
    color: "#38BDF8", 
    bg: "bg-[#0c4a6e]" 
  },
  { 
    title: "Wife Birthday", 
    target: 2000, 
    saved: 0, 
    deadline_days: 30, // Assuming 30 days default if not in your specific mock
    icon: "cake", 
    color: "#D946EF", 
    bg: "bg-[#4a044e]" 
  }
];

const seedsavingjars = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(MONGO_URI);
    console.log("🔥 Connected to MongoDB...");

    // 2. Transform Data for Mongoose
    const jarsToInsert = mockData.map(jar => {
      // Calculate the specific Date object for the deadline
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + jar.deadline_days);

      return {
        userId: USER_ID,
        title: jar.title,
        target: jar.target,
        saved: jar.saved,
        deadline: futureDate, // Storing real Date
        icon: jar.icon,
        color: jar.color,
        bg: jar.bg,
        status: 'active'
      };
    });

    // 3. Clear existing jars for this user (Optional - prevents duplicates)
    await SavingsJar.deleteMany({ userId: USER_ID });
    console.log("🧹 Cleared old mock data for user.");

    // 4. Insert New Data
    await SavingsJar.insertMany(jarsToInsert);
    console.log("✅ Successfully added mock jars to Database!");

    // 5. Exit
    process.exit();
    
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedsavingjars();