const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET || "demo-secret-key";

/* Mock DB en memoria */
let services = [
  { id: 1, title: "Hotel Granada", category: "Hospedaje", price: 120, thumbnail: "https://via.placeholder.com/600x400", description: "Hotel céntrico", availability: true },
  { id: 2, title: "Tour Masaya", category: "Experiencia", price: 50, thumbnail: "https://via.placeholder.com/600x400", description: "Tour cultural", availability: true }
];
let reservations = [];
let users = [{ id: "demo-user", email: "demo@demo.com", passwordHash: "demo" }];

/* Rutas */

/* Ping */
app.get("/", (req, res) => {
  res.send("API Nica_Turismo (mock) 🚀");
});

/* Auth: login demo */
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  // demo: aceptar cualquier email, devolver token
  const user = users[0];
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: "8h" });
  res.json({ token, user: { id: user.id, email: user.email } });
});

/* Services */
app.get("/api/services", (req, res) => {
  res.json(services);
});
app.get("/api/services/:id", (req, res) => {
  const s = services.find(x => x.id == req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
});

/* Checkout: crear reserva mock */
app.post("/api/checkout", (req, res) => {
  const { cart, userId } = req.body;
  const reservationId = reservations.length + 1;
  const created = {
    id: reservationId,
    userId: userId || "demo-user",
    items: cart,
    total: cart.reduce((s, i) => s + (i.price || 0), 0),
    status: "Confirmada",
    date: new Date().toISOString()
  };
  reservations.push(created);
  res.json({ success: true, reservationId });
});

/* Get reservations by user */
app.get("/api/reservations", (req, res) => {
  const userId = req.query.userId || "demo-user";
  res.json(reservations.filter(r => r.userId === userId));
});

/* Start server */
app.listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}`));
