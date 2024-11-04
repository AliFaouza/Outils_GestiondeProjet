CREATE TABLE categories (
  category_id SERIAL NOT NULL PRIMARY KEY,
  category_name VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE projects (
  project_id SERIAL NOT NULL PRIMARY KEY,
  project_name VARCHAR(255),
  date_debut DATE,
  date_fin DATE,
  category_id INT,
  description VARCHAR(255)
);

CREATE TABLE Users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  user_name VARCHAR(255),
  firstname VARCHAR(255),
  email VARCHAR(255),
  mdp VARCHAR(255)
);
