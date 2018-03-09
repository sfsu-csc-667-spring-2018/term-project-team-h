-- Initial table for Users
CREATE TABLE IF NOT EXISTS Users
(
  UserId   SERIAL PRIMARY KEY,
  Email    VARCHAR(255) UNIQUE,
  Password VARCHAR(255)
);

-- INSERT INTO Users (Email, Password)
-- VALUES ('arthemg@gmail.com', 'c123');
