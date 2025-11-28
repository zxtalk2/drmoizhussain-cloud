// Seed script to add workshop data to MongoDB
// Run this file once: node add-workshops-to-db.js

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const WorkshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: "General" },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Workshop =
  mongoose.models.Workshop || mongoose.model("Workshop", WorkshopSchema);

const workshops = [
  {
    title: "4th Dimension Workshop Held at Moven Pick Hotel - Karachi",
    description:
      "Explore the concepts of the 4th dimension and unlock new perspectives on reality, time, and consciousness. This transformative workshop helps participants understand higher dimensions of existence.",
    category: "Mind Development",
    link: "",
  },
  {
    title: "Advanced Meditation Techniques",
    description:
      "Learn advanced meditation practices to deepen your spiritual journey and enhance mental clarity. Techniques include transcendental meditation, mindfulness, and guided visualization.",
    category: "Meditation",
    link: "",
  },
  {
    title: "Classical Yoga for Modern Life",
    description:
      "Discover the ancient wisdom of classical yoga adapted for contemporary living. This workshop covers asanas, pranayama, and meditation practices suitable for all levels.",
    category: "Yoga",
    link: "",
  },
  {
    title: "Mind Power and Manifestation",
    description:
      "Harness the power of your mind to manifest your goals and dreams. Learn proven techniques for positive thinking, visualization, and creating the life you desire.",
    category: "Mind Development",
    link: "",
  },
  {
    title: "Stress Management Through Mind Sciences",
    description:
      "Practical techniques to manage stress and anxiety using mind science principles. Includes breathing exercises, mental conditioning, and relaxation methods.",
    category: "Wellness",
    link: "",
  },
  {
    title: "Self-Awareness and Personal Growth",
    description:
      "Journey into self-discovery and personal development. This workshop helps you understand your true potential and remove mental barriers holding you back.",
    category: "Personal Development",
    link: "",
  },
  {
    title: "Energy Healing Fundamentals",
    description:
      "Introduction to energy healing principles and practices. Learn to work with your body's energy system for improved health and well-being.",
    category: "Healing",
    link: "",
  },
  {
    title: "Corporate Mind Training",
    description:
      "Specialized workshop for corporate professionals focusing on leadership, decision-making, and mental resilience in business environments.",
    category: "Corporate",
    link: "",
  },
];

async function addWorkshops() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing workshops (optional - remove this if you want to keep existing data)
    // await Workshop.deleteMany({});
    // console.log("Cleared existing workshops");

    // Add new workshops
    const result = await Workshop.insertMany(workshops);
    console.log(`Successfully added ${result.length} workshops!`);

    console.log("\nWorkshops added:");
    result.forEach((workshop, index) => {
      console.log(`${index + 1}. ${workshop.title} (${workshop.category})`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding workshops:", error);
    mongoose.connection.close();
  }
}

addWorkshops();
