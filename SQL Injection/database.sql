CREATE TABLE users (
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES
('john_doe', '12121212'),
('jane_doe', '12345678'),
('bob_smith', 'password'),
('alice_smith', 'abcdefgh'),
('admin', 'admin');