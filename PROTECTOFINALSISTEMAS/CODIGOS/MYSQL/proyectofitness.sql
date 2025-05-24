CREATE DATABASE IF NOT EXISTS proyectofitness;
USE proyectofitness;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100),
    cedula VARCHAR(20) UNIQUE,
    peso DECIMAL(5,2),
    altura DECIMAL(5,2),
    edad INT,
    telefono VARCHAR(20),
    genero ENUM('Masculino', 'Femenino', 'Otro')
);

CREATE TABLE entrenamientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ejercicio VARCHAR(100),
    series INT,
    repeticiones INT,
    peso DECIMAL(5,2),
    workout_id VARCHAR(50),
    usuario_id INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE nutricion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_alimento VARCHAR(100),
    calorias INT,
    fecha DATE,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE progreso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha DATE,
    peso DECIMAL(5,2),
    comentario TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE cumplimiento_semanal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    semana_inicio DATE,
    lunes BOOLEAN,
    martes BOOLEAN,
    miercoles BOOLEAN,
    jueves BOOLEAN,
    viernes BOOLEAN,
    sabado BOOLEAN,
    domingo BOOLEAN,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
 

CREATE TABLE habilidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('Mental', 'Emocional', 'Social'),
    descripcion TEXT,
    fecha DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);