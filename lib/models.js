import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "General" }, // e.g., Workshop, Consultation
  createdAt: { type: Date, default: Date.now },
});

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  category: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now },
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "Client" },
  quote: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const SliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const WorkshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: "General" },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribed: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent overwriting models during hot reload
export const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
export const Video =
  mongoose.models.Video || mongoose.model("Video", VideoSchema);
export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
export const Slider =
  mongoose.models.Slider || mongoose.model("Slider", SliderSchema);
export const Workshop =
  mongoose.models.Workshop || mongoose.model("Workshop", WorkshopSchema);
export const Newsletter =
  mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema);
