CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    fecha_registro DATE
);

CREATE TABLE Entrenamiento (
    id_entrenamiento INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha DATE,
    tipo VARCHAR(50),
    duracion INT,
    notas TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Ejercicio (
    id_ejercicio INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100),
    grupo_muscular VARCHAR(100),
    descripcion TEXT
);

CREATE TABLE Detalle_Entrenamiento (
    id_detalle INT PRIMARY KEY IDENTITY(1,1),
    id_entrenamiento INT,
    id_ejercicio INT,
    series INT,
    repeticiones INT,
    peso FLOAT,
    FOREIGN KEY (id_entrenamiento) REFERENCES Entrenamiento(id_entrenamiento),
    FOREIGN KEY (id_ejercicio) REFERENCES Ejercicio(id_ejercicio)
);

CREATE TABLE Comida (
    id_comida INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha DATE,
    momento VARCHAR(50), -- Ej: desayuno, almuerzo, cena
    descripcion TEXT,
    calorias INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Progreso (
    id_progreso INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha DATE,
    peso FLOAT,
    porcentaje_grasa FLOAT,
    medida_cintura FLOAT,
    medida_pecho FLOAT,
    medida_brazo FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
