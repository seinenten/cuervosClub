// Generated by https://quicktype.io

export interface respuesta {
    ok:     boolean;
    cursos: Curso[];
}

export interface Curso {
    _id:         string;
    usuario:     string;
    nombre:      string;
    descripcion: string;
    precio:      number;
    img?:        string;
}