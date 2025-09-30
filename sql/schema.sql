-- users
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT now()
);

-- services
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  price NUMERIC(10,2),
  thumbnail TEXT,
  availability BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- reservations
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total NUMERIC(10,2),
  status VARCHAR(50),
  details JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- payments
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  reservation_id INT REFERENCES reservations(id),
  amount NUMERIC(10,2),
  method VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);

-- points / rutas
CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  category VARCHAR(100)
);
